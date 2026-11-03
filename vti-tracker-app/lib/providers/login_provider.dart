import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/auth/login_state.dart';
import '../models/user_model.dart';
import 'auth_provider.dart';

class LoginNotifier extends Notifier<LoginState> {
  @override
  LoginState build() {
    return const LoginState();
  }

  Future<bool> login(String email, String password) async {
    state = state.copyWith(isLoading: true, errorMessage: null, isSuccess: false);

    try {
      final authService = ref.read(authServiceProvider);
      final response = await authService.login(email: email, password: password);

      final token = (response['token'] ??
              response['access_token'] ??
              response['data']?['token'])
          ?.toString();

      if (token == null || token.isEmpty) {
        state = state.copyWith(
          isLoading: false,
          errorMessage: 'Token not found in login response',
        );
        return false;
      }

      UserModel? user;
      final rawUser = response['user'] ?? response['data']?['user'];
      if (rawUser is Map<String, dynamic>) {
        user = UserModel.fromJson(rawUser);
      }

      await ref.read(authProvider.notifier).setAuthSession(
            token: token,
            user: user,
          );

      state = state.copyWith(isLoading: false, isSuccess: true);
      return true;
    } on DioException catch (e) {
      String message = 'Failed to sign in. Please verify your credentials.';
      if (e.response?.data is Map && e.response?.data['message'] != null) {
        message = e.response!.data['message'].toString();
      }
      state = state.copyWith(isLoading: false, errorMessage: message);
      return false;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: 'An unexpected error occurred: $e',
      );
      return false;
    }
  }

  void reset() {
    state = const LoginState();
  }
}

final loginProvider = NotifierProvider<LoginNotifier, LoginState>(() {
  return LoginNotifier();
});
