import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../core/network/dio_client.dart';
import '../core/storage/secure_storage.dart';
import '../models/user_model.dart';
import '../services/auth_service.dart';

final authServiceProvider = Provider<AuthService>((ref) {
  final dio = ref.watch(dioProvider);
  return AuthService(dio);
});

class AuthState {
  final String? token;
  final UserModel? user;
  final bool isLoading;

  const AuthState({
    this.token,
    this.user,
    this.isLoading = false,
  });

  bool get isAuthenticated => token != null && token!.isNotEmpty;

  AuthState copyWith({
    String? token,
    UserModel? user,
    bool? isLoading,
    bool clearToken = false,
    bool clearUser = false,
  }) {
    return AuthState(
      token: clearToken ? null : (token ?? this.token),
      user: clearUser ? null : (user ?? this.user),
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

class AuthNotifier extends Notifier<AuthState> {
  final SecureStorageService _storage = SecureStorageService.instance;

  @override
  AuthState build() {
    return const AuthState();
  }

  Future<void> checkAuthStatus() async {
    state = state.copyWith(isLoading: true);
    try {
      final token = await _storage.getToken();
      if (token == null || token.isEmpty) {
        state = state.copyWith(isLoading: false, clearToken: true, clearUser: true);
        return;
      }

      final cachedUserJson = await _storage.getUserData();
      UserModel? cachedUser;
      if (cachedUserJson != null) {
        try {
          cachedUser = UserModel.fromJson(jsonDecode(cachedUserJson));
        } catch (_) {}
      }

      state = state.copyWith(token: token, user: cachedUser, isLoading: false);

      try {
        final authService = ref.read(authServiceProvider);
        final freshUser = await authService.getUser();
        await _storage.saveUserData(jsonEncode(freshUser.toJson()));
        state = state.copyWith(user: freshUser);
      } catch (_) {}
    } catch (_) {
      state = state.copyWith(isLoading: false);
    }
  }

  Future<void> setAuthSession({required String token, UserModel? user}) async {
    await _storage.saveToken(token);
    if (user != null) {
      await _storage.saveUserData(jsonEncode(user.toJson()));
    }
    state = state.copyWith(token: token, user: user);
  }

  Future<void> logout() async {
    try {
      final authService = ref.read(authServiceProvider);
      await authService.logout();
    } catch (_) {}
    await _storage.clearAll();
    state = const AuthState();
  }
}

final authProvider = NotifierProvider<AuthNotifier, AuthState>(() {
  return AuthNotifier();
});
