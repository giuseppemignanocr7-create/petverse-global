import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';
import '../../../../config/constants.dart';
import '../../../../shared/widgets/pv_empty_state.dart';

class PetListScreen extends StatelessWidget {
  const PetListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // TODO: Replace with Riverpod provider
    final List<Map<String, dynamic>> pets = [];

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Icon(Icons.pets, color: PetVerseColors.primaryTeal),
            const SizedBox(width: PetVerseSpacing.s),
            Text('PetVerse', style: PetVerseTextStyles.titleLarge),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
          const SizedBox(width: 4),
          GestureDetector(
            onTap: () => context.go('/profile'),
            child: const Padding(
              padding: EdgeInsets.only(right: PetVerseSpacing.m),
              child: CircleAvatar(
                radius: 18,
                backgroundColor: PetVerseColors.primaryTealLight,
                child: Icon(Icons.person, size: 20, color: Colors.white),
              ),
            ),
          ),
        ],
      ),
      body: pets.isEmpty
          ? PVEmptyState(
              title: 'Nessun pet ancora',
              subtitle: 'Aggiungi il tuo primo amico a quattro zampe!',
              icon: Icons.pets,
              ctaLabel: 'Aggiungi pet',
              onCtaTap: () => context.push('/pets/add'),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(PetVerseSpacing.m),
              itemCount: pets.length,
              itemBuilder: (context, index) {
                final pet = pets[index];
                return _PetCard(
                  name: pet['name'] ?? '',
                  species: pet['species'] ?? '',
                  breed: pet['breed'] ?? '',
                  avatarUrl: pet['avatarUrl'],
                  onTap: () => context.push('/pets/${pet['id']}'),
                );
              },
            ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => context.push('/pets/add'),
        icon: const Icon(Icons.add),
        label: const Text('Aggiungi pet'),
      ),
    );
  }
}

class _PetCard extends StatelessWidget {
  final String name;
  final String species;
  final String breed;
  final String? avatarUrl;
  final VoidCallback onTap;

  const _PetCard({
    required this.name,
    required this.species,
    required this.breed,
    this.avatarUrl,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: PetVerseSpacing.s),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(PetVerseRadius.m),
        child: Padding(
          padding: const EdgeInsets.all(PetVerseSpacing.m),
          child: Row(
            children: [
              CircleAvatar(
                radius: 32,
                backgroundColor: PetVerseColors.primaryTealLight.withOpacity(0.2),
                child: Text(
                  AppConstants.speciesEmoji[species] ?? '\u{1F43E}',
                  style: const TextStyle(fontSize: 28),
                ),
              ),
              const SizedBox(width: PetVerseSpacing.m),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(name, style: PetVerseTextStyles.titleLarge),
                    const SizedBox(height: 4),
                    Text(
                      '${AppConstants.speciesItalian[species] ?? species} ${breed.isNotEmpty ? "- $breed" : ""}',
                      style: PetVerseTextStyles.bodyMedium.copyWith(
                        color: PetVerseColors.neutralGray600,
                      ),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right, color: PetVerseColors.neutralGray400),
            ],
          ),
        ),
      ),
    );
  }
}
