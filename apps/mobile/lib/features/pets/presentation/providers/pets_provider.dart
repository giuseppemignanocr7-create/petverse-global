import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/providers/providers.dart';
import '../../data/models/pet_model.dart';
import '../../data/repositories/pet_repository.dart';

final petRepositoryProvider = Provider<PetRepository>((ref) {
  return PetRepository(ref.watch(apiClientProvider));
});

enum PetsStatus { initial, loading, loaded, error }

class PetsState {
  final PetsStatus status;
  final List<PetModel> pets;
  final String? errorMessage;

  const PetsState({
    this.status = PetsStatus.initial,
    this.pets = const [],
    this.errorMessage,
  });

  PetsState copyWith({
    PetsStatus? status,
    List<PetModel>? pets,
    String? errorMessage,
  }) {
    return PetsState(
      status: status ?? this.status,
      pets: pets ?? this.pets,
      errorMessage: errorMessage,
    );
  }
}

class PetsNotifier extends StateNotifier<PetsState> {
  final PetRepository _petRepository;

  PetsNotifier(this._petRepository) : super(const PetsState());

  Future<void> loadPets() async {
    state = state.copyWith(status: PetsStatus.loading);
    try {
      final pets = await _petRepository.getPets();
      state = PetsState(status: PetsStatus.loaded, pets: pets);
    } catch (e) {
      state = PetsState(status: PetsStatus.error, errorMessage: e.toString());
    }
  }

  Future<void> addPet(Map<String, dynamic> data) async {
    try {
      final pet = await _petRepository.createPet(data);
      state = state.copyWith(pets: [...state.pets, pet]);
    } catch (e) {
      state = state.copyWith(errorMessage: e.toString());
    }
  }

  Future<void> updatePet(String id, Map<String, dynamic> data) async {
    try {
      final updatedPet = await _petRepository.updatePet(id, data);
      final updatedPets = state.pets.map((p) => p.id == id ? updatedPet : p).toList();
      state = state.copyWith(pets: updatedPets);
    } catch (e) {
      state = state.copyWith(errorMessage: e.toString());
    }
  }

  Future<void> deletePet(String id) async {
    try {
      await _petRepository.deletePet(id);
      final updatedPets = state.pets.where((p) => p.id != id).toList();
      state = state.copyWith(pets: updatedPets);
    } catch (e) {
      state = state.copyWith(errorMessage: e.toString());
    }
  }
}

final petsProvider = StateNotifierProvider<PetsNotifier, PetsState>((ref) {
  return PetsNotifier(ref.watch(petRepositoryProvider));
});

final selectedPetProvider = StateProvider<String?>((ref) => null);

final currentPetProvider = Provider<PetModel?>((ref) {
  final selectedId = ref.watch(selectedPetProvider);
  final pets = ref.watch(petsProvider).pets;
  if (selectedId == null || pets.isEmpty) return null;
  try {
    return pets.firstWhere((p) => p.id == selectedId);
  } catch (_) {
    return null;
  }
});

final petCountProvider = Provider<int>((ref) {
  return ref.watch(petsProvider).pets.length;
});
