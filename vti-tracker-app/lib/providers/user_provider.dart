import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../core/network/dio_client.dart';
import '../models/user_model.dart';
import '../services/user_service.dart';

final userServiceProvider = Provider<UserService>((ref) {
  final dio = ref.watch(dioProvider);
  return UserService(dio);
});

final usersListProvider = FutureProvider.autoDispose<List<UserModel>>((ref) async {
  final service = ref.watch(userServiceProvider);
  return await service.getUsers();
});
