import '../../../../core/network/api_client.dart';

class AiRepository {
  final ApiClient _apiClient;

  AiRepository(this._apiClient);

  Future<Map<String, dynamic>> chat(String petId, String message) async {
    final response = await _apiClient.post('/ai/chat', data: {
      'petId': petId,
      'message': message,
    });
    return response.data['data'];
  }

  Future<List<dynamic>> getConversation(String petId) async {
    final response = await _apiClient.get('/ai/conversations/$petId');
    return response.data['data'];
  }

  Future<Map<String, dynamic>> triage(String petId, List<String> symptoms) async {
    final response = await _apiClient.post('/ai/triage', data: {
      'petId': petId,
      'symptoms': symptoms,
    });
    return response.data['data'];
  }

  Future<Map<String, dynamic>> getInsights(String petId) async {
    final response = await _apiClient.get('/ai/insights/$petId');
    return response.data['data'];
  }
}
