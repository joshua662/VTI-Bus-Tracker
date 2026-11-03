import 'package:dio/dio.dart';
import '../core/constants/api_constants.dart';
import '../models/user_model.dart';

class UserService {
  final Dio _dio;

  UserService(this._dio);

  Future<List<UserModel>> getUsers() async {
    final response = await _dio.get(ApiConstants.users);
    final data = response.data;

    List<dynamic> list;
    if (data is List) {
      list = data;
    } else if (data is Map<String, dynamic> && data.containsKey('data')) {
      list = data['data'] as List<dynamic>;
    } else {
      list = [];
    }

    return list
        .map((item) => UserModel.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  Future<UserModel> createUser(Map<String, dynamic> payload) async {
    final response = await _dio.post(ApiConstants.users, data: payload);
    final data = response.data;
    if (data is Map<String, dynamic> && data.containsKey('data')) {
      return UserModel.fromJson(data['data'] as Map<String, dynamic>);
    }
    return UserModel.fromJson(data as Map<String, dynamic>);
  }

  Future<UserModel> updateUser(int id, Map<String, dynamic> payload) async {
    final response = await _dio.put('${ApiConstants.users}/$id', data: payload);
    final data = response.data;
    if (data is Map<String, dynamic> && data.containsKey('data')) {
      return UserModel.fromJson(data['data'] as Map<String, dynamic>);
    }
    return UserModel.fromJson(data as Map<String, dynamic>);
  }

  Future<void> deleteUser(int id) async {
    await _dio.delete('${ApiConstants.users}/$id');
  }
}
