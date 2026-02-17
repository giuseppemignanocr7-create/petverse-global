import '../../../../core/network/api_client.dart';

class HealthRepository {
  final ApiClient _apiClient;

  HealthRepository(this._apiClient);

  // --- Vaccinations ---

  Future<List<dynamic>> getVaccinations(String petId) async {
    final response = await _apiClient.get('/health/pets/$petId/vaccinations');
    return response.data['data'];
  }

  Future<Map<String, dynamic>> addVaccination(String petId, Map<String, dynamic> data) async {
    final response = await _apiClient.post('/health/pets/$petId/vaccinations', data: data);
    return response.data['data'];
  }

  Future<void> deleteVaccination(String id) async {
    await _apiClient.delete('/health/vaccinations/$id');
  }

  // --- Health Records ---

  Future<List<dynamic>> getRecords(String petId) async {
    final response = await _apiClient.get('/health/pets/$petId/records');
    return response.data['data'];
  }

  Future<Map<String, dynamic>> addRecord(String petId, Map<String, dynamic> data) async {
    final response = await _apiClient.post('/health/pets/$petId/records', data: data);
    return response.data['data'];
  }

  Future<void> deleteRecord(String id) async {
    await _apiClient.delete('/health/records/$id');
  }

  // --- Appointments ---

  Future<List<dynamic>> getAppointments(String petId) async {
    final response = await _apiClient.get('/health/pets/$petId/appointments');
    return response.data['data'];
  }

  Future<Map<String, dynamic>> addAppointment(String petId, Map<String, dynamic> data) async {
    final response = await _apiClient.post('/health/pets/$petId/appointments', data: data);
    return response.data['data'];
  }

  Future<void> deleteAppointment(String id) async {
    await _apiClient.delete('/health/appointments/$id');
  }

  // --- Medications ---

  Future<List<dynamic>> getMedications(String petId) async {
    final response = await _apiClient.get('/health/pets/$petId/medications');
    return response.data['data'];
  }

  Future<Map<String, dynamic>> addMedication(String petId, Map<String, dynamic> data) async {
    final response = await _apiClient.post('/health/pets/$petId/medications', data: data);
    return response.data['data'];
  }

  Future<void> logDose(String medicationId, Map<String, dynamic> data) async {
    await _apiClient.post('/health/medications/$medicationId/doses', data: data);
  }

  // --- VetBridge ---

  Future<Map<String, dynamic>> generateVetBridgeQr(String petId) async {
    final response = await _apiClient.post('/health/vetbridge/generate-qr/$petId');
    return response.data['data'];
  }

  Future<List<dynamic>> getSharedRecords(String petId) async {
    final response = await _apiClient.get('/health/vetbridge/shared-records/$petId');
    return response.data['data'];
  }

  Future<void> revokeShare(String shareId) async {
    await _apiClient.delete('/health/vetbridge/revoke/$shareId');
  }
}
