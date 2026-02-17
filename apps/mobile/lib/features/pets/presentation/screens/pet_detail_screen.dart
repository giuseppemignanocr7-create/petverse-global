import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';

class PetDetailScreen extends StatelessWidget {
  final String petId;

  const PetDetailScreen({super.key, required this.petId});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        body: NestedScrollView(
          headerSliverBuilder: (context, innerBoxIsScrolled) => [
            SliverAppBar(
              expandedHeight: 250,
              pinned: true,
              flexibleSpace: FlexibleSpaceBar(
                background: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [PetVerseColors.primaryTeal, PetVerseColors.primaryTealDark],
                    ),
                  ),
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const SizedBox(height: 60),
                        CircleAvatar(
                          radius: 50,
                          backgroundColor: Colors.white.withOpacity(0.2),
                          child: const Icon(Icons.pets, size: 50, color: Colors.white),
                        ),
                        const SizedBox(height: PetVerseSpacing.m),
                        Text('Pet Name', style: PetVerseTextStyles.headlineLarge.copyWith(color: Colors.white)),
                        Text('Razza - 2 anni', style: PetVerseTextStyles.bodyMedium.copyWith(color: Colors.white70)),
                      ],
                    ),
                  ),
                ),
              ),
              actions: [
                IconButton(icon: const Icon(Icons.edit, color: Colors.white), onPressed: () {}),
                IconButton(icon: const Icon(Icons.more_vert, color: Colors.white), onPressed: () {}),
              ],
            ),
            SliverPersistentHeader(
              pinned: true,
              delegate: _TabBarDelegate(
                TabBar(
                  labelColor: PetVerseColors.primaryTeal,
                  unselectedLabelColor: PetVerseColors.neutralGray500,
                  indicatorColor: PetVerseColors.primaryTeal,
                  tabs: const [
                    Tab(text: 'Panoramica'),
                    Tab(text: 'Salute'),
                    Tab(text: 'Diario'),
                    Tab(text: 'Cura'),
                  ],
                ),
              ),
            ),
          ],
          body: TabBarView(
            children: [
              _buildOverviewTab(context),
              _buildHealthTab(context),
              _buildDiaryTab(),
              _buildCareTab(),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () => _showQuickActions(context),
          child: const Icon(Icons.add),
        ),
      ),
    );
  }

  Widget _buildOverviewTab(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(PetVerseSpacing.m),
      children: [
        _infoCard('Informazioni', [
          _infoRow('Razza', 'Labrador Retriever'),
          _infoRow('Peso', '25 kg'),
          _infoRow('Microchip', '380260000123456'),
        ]),
        const SizedBox(height: PetVerseSpacing.m),
        _sectionCard('Prossimi appuntamenti', Icons.calendar_today, 'Nessun appuntamento programmato'),
        const SizedBox(height: PetVerseSpacing.m),
        _sectionCard('Reminder attivi', Icons.alarm, 'Nessun reminder attivo'),
      ],
    );
  }

  Widget _buildHealthTab(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.favorite_border, size: 64, color: PetVerseColors.neutralGray400),
          const SizedBox(height: PetVerseSpacing.m),
          Text('Cartella sanitaria', style: PetVerseTextStyles.headlineMedium),
          const SizedBox(height: PetVerseSpacing.s),
          ElevatedButton(
            onPressed: () => context.push('/pets/$petId/health'),
            child: const Text('Apri dashboard salute'),
          ),
        ],
      ),
    );
  }

  Widget _buildDiaryTab() {
    return const Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.book_outlined, size: 64, color: PetVerseColors.neutralGray400),
          SizedBox(height: PetVerseSpacing.m),
          Text('Nessun momento registrato'),
        ],
      ),
    );
  }

  Widget _buildCareTab() {
    return const Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.spa_outlined, size: 64, color: PetVerseColors.neutralGray400),
          SizedBox(height: PetVerseSpacing.m),
          Text('Nessuna attività di cura'),
        ],
      ),
    );
  }

  Widget _infoCard(String title, List<Widget> children) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(PetVerseSpacing.m),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: PetVerseTextStyles.titleMedium),
            const SizedBox(height: PetVerseSpacing.s),
            ...children,
          ],
        ),
      ),
    );
  }

  Widget _infoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: PetVerseTextStyles.bodyMedium.copyWith(color: PetVerseColors.neutralGray600)),
          Text(value, style: PetVerseTextStyles.bodyMedium.copyWith(fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }

  Widget _sectionCard(String title, IconData icon, String emptyMessage) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(PetVerseSpacing.m),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, size: 20, color: PetVerseColors.primaryTeal),
                const SizedBox(width: PetVerseSpacing.s),
                Text(title, style: PetVerseTextStyles.titleMedium),
              ],
            ),
            const SizedBox(height: PetVerseSpacing.m),
            Center(
              child: Text(emptyMessage, style: PetVerseTextStyles.bodyMedium.copyWith(color: PetVerseColors.neutralGray500)),
            ),
          ],
        ),
      ),
    );
  }

  void _showQuickActions(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(PetVerseRadius.l)),
      ),
      builder: (context) => Padding(
        padding: const EdgeInsets.all(PetVerseSpacing.l),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Azioni rapide', style: PetVerseTextStyles.titleLarge),
            const SizedBox(height: PetVerseSpacing.m),
            ListTile(leading: const Icon(Icons.book), title: const Text('Aggiungi evento diario'), onTap: () => Navigator.pop(context)),
            ListTile(leading: const Icon(Icons.monitor_weight), title: const Text('Registra pesata'), onTap: () => Navigator.pop(context)),
            ListTile(leading: const Icon(Icons.calendar_today), title: const Text('Aggiungi appuntamento'), onTap: () => Navigator.pop(context)),
            ListTile(leading: const Icon(Icons.vaccines), title: const Text('Aggiungi vaccino'), onTap: () => Navigator.pop(context)),
          ],
        ),
      ),
    );
  }
}

class _TabBarDelegate extends SliverPersistentHeaderDelegate {
  final TabBar tabBar;
  _TabBarDelegate(this.tabBar);

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    return Container(color: Theme.of(context).scaffoldBackgroundColor, child: tabBar);
  }

  @override
  double get maxExtent => tabBar.preferredSize.height;
  @override
  double get minExtent => tabBar.preferredSize.height;
  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate oldDelegate) => false;
}
