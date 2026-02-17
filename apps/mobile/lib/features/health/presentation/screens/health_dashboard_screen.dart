import 'package:flutter/material.dart';
import '../../../../config/theme.dart';

class HealthDashboardScreen extends StatelessWidget {
  final String petId;

  const HealthDashboardScreen({super.key, required this.petId});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Salute'),
          bottom: const TabBar(
            labelColor: PetVerseColors.primaryTeal,
            unselectedLabelColor: PetVerseColors.neutralGray500,
            indicatorColor: PetVerseColors.primaryTeal,
            tabs: [
              Tab(text: 'Vaccini'),
              Tab(text: 'Visite'),
              Tab(text: 'Farmaci'),
              Tab(text: 'Analisi'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            _buildVaccinationsTab(),
            _buildVisitsTab(),
            _buildMedicationsTab(),
            _buildAnalysisTab(),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {/* TODO: Add health record */},
          child: const Icon(Icons.add),
        ),
      ),
    );
  }

  Widget _buildVaccinationsTab() {
    return ListView(
      padding: const EdgeInsets.all(PetVerseSpacing.m),
      children: [
        _alertCard(
          'Vaccini in scadenza',
          'Nessun vaccino in scadenza',
          Icons.vaccines,
          PetVerseColors.success,
        ),
        const SizedBox(height: PetVerseSpacing.m),
        Center(
          child: Column(
            children: [
              const Icon(Icons.vaccines, size: 48, color: PetVerseColors.neutralGray400),
              const SizedBox(height: PetVerseSpacing.s),
              Text('Nessun vaccino registrato', style: PetVerseTextStyles.bodyMedium.copyWith(color: PetVerseColors.neutralGray500)),
              const SizedBox(height: PetVerseSpacing.m),
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.add),
                label: const Text('Aggiungi vaccino'),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildVisitsTab() {
    return const Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.local_hospital, size: 48, color: PetVerseColors.neutralGray400),
          SizedBox(height: PetVerseSpacing.s),
          Text('Nessuna visita registrata'),
        ],
      ),
    );
  }

  Widget _buildMedicationsTab() {
    return const Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.medication, size: 48, color: PetVerseColors.neutralGray400),
          SizedBox(height: PetVerseSpacing.s),
          Text('Nessun farmaco attivo'),
        ],
      ),
    );
  }

  Widget _buildAnalysisTab() {
    return const Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.analytics, size: 48, color: PetVerseColors.neutralGray400),
          SizedBox(height: PetVerseSpacing.s),
          Text('Nessuna analisi registrata'),
        ],
      ),
    );
  }

  Widget _alertCard(String title, String message, IconData icon, Color color) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(PetVerseSpacing.m),
        child: Row(
          children: [
            CircleAvatar(
              backgroundColor: color.withOpacity(0.1),
              child: Icon(icon, color: color),
            ),
            const SizedBox(width: PetVerseSpacing.m),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: PetVerseTextStyles.titleMedium),
                  Text(message, style: PetVerseTextStyles.bodyMedium.copyWith(color: PetVerseColors.neutralGray600)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
