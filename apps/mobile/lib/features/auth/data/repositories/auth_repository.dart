import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../../../../core/network/api_client.dart';
import '../../../../config/constants.dart';
import '../models/user_model.dart';

class AuthRepository {
  final ApiClient _apiClient;
  final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();

  AuthRepository(this._apiClient);

  Future<UserModel> login(String email, String password) async {
    final response = await _apiClient.post('/auth/login', data: {
      'email': email,
      'password': password,
    });

    final data = response.data['data'];
    await _saveTokens(data['accessToken'], data['refreshToken']);
    return UserModel.fromJson(data['user']);
  }

  Future<UserModel> register(String fullName, String email, String password) async {
    final response = await _apiClient.post('/auth/register', data: {
      'fullName': fullName,
      'email': email,
      'password': password,
    });

    final data = response.data['data'];
    await _saveTokens(data['accessToken'], data['refreshToken']);
    return UserModel.fromJson(data['user']);
  }

  Future<void> loginWithGoogle(String idToken) async {
    final response = await _apiClient.post('/auth/login/google', data: {
      'idToken': idToken,
    });
    final data = response.data['data'];
    await _saveTokens(data['accessToken'], data['refreshToken']);
  }

  Future<void> loginWithApple(String identityToken, String? fullName) async {
    final response = await _apiClient.post('/auth/login/apple', data: {
      'identityToken': identityToken,
      'fullName': fullName,
    });
    final data = response.data['data'];
    await _saveTokens(data['accessToken'], data['refreshToken']);
  }

  Future<void> logout() async {
    try {
      await _apiClient.post('/auth/logout');
    } catch (_) {}
    await _clearTokens();
  }

  Future<void> forgotPassword(String email) async {
    await _apiClient.post('/auth/forgot-password', data: {'email': email});
  }

  Future<void> resetPassword(String token, String newPassword) async {
    await _apiClient.post('/auth/reset-password', data: {
      'token': token,
      'newPassword': newPassword,
    });
  }

  Future<void> changePassword(String currentPassword, String newPassword) async {
    await _apiClient.put('/auth/change-password', data: {
      'currentPassword': currentPassword,
      'newPassword': newPassword,
    });
  }

  Future<UserModel> getCurrentUser() async {
    final response = await _apiClient.get('/auth/me');
    return UserModel.fromJson(response.data['data']);
  }

  Future<bool> isLoggedIn() async {
    final token = await _secureStorage.read(key: AppConstants.tokenKey);
    return token != null;
  }

  Future<void> _saveTokens(String accessToken, String refreshToken) async {
    await _secureStorage.write(key: AppConstants.tokenKey, value: accessToken);
    await _secureStorage.write(key: AppConstants.refreshTokenKey, value: refreshToken);
  }

  Future<void> _clearTokens() async {
    await _secureStorage.delete(key: AppConstants.tokenKey);
    await _secureStorage.delete(key: AppConstants.refreshTokenKey);
  }
}
