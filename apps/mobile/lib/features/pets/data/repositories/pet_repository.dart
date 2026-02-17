import '../../../../core/network/api_client.dart';
import '../models/pet_model.dart';

class PetRepository {
  final ApiClient _apiClient;

  PetRepository(this._apiClient);

  Future<List<PetModel>> getPets() async {
    final response = await _apiClient.get('/pets');
    final List<dynamic> data = response.data['data'];
    return data.map((e) => PetModel.fromJson(e as Map<String, dynamic>)).toList();
  }

  Future<PetModel> getPet(String id) async {
    final response = await _apiClient.get('/pets/$id');
    return PetModel.fromJson(response.data['data']);
  }

  Future<PetModel> createPet(Map<String, dynamic> data) async {
    final response = await _apiClient.post('/pets', data: data);
    return PetModel.fromJson(response.data['data']);
  }

  Future<PetModel> updatePet(String id, Map<String, dynamic> data) async {
    final response = await _apiClient.put('/pets/$id', data: data);
    return PetModel.fromJson(response.data['data']);
  }

  Future<void> deletePet(String id) async {
    await _apiClient.delete('/pets/$id');
  }

  Future<PetModel> updateAvatar(String id, String avatarUrl) async {
    final response = await _apiClient.put('/pets/$id/avatar', data: {
      'avatarUrl': avatarUrl,
    });
    return PetModel.fromJson(response.data['data']);
  }

  Future<void> addWeightRecord(String id, double weight) async {
    await _apiClient.post('/pets/$id/weight', data: {'weight': weight});
  }

  Future<Map<String, dynamic>> getStatistics(String id) async {
    final response = await _apiClient.get('/pets/$id/statistics');
    return response.data['data'];
  }

  Future<List<dynamic>> getCollaborators(String id) async {
    final response = await _apiClient.get('/pets/$id/collaborators');
    return response.data['data'];
  }

  Future<void> addCollaborator(String petId, String userId, String role) async {
    await _apiClient.post('/pets/$petId/collaborators', data: {
      'userId': userId,
      'role': role,
    });
  }

  Future<void> removeCollaborator(String petId, String userId) async {
    await _apiClient.delete('/pets/$petId/collaborators/$userId');
  }
}
