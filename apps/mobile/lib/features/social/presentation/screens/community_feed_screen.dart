import 'package:flutter/material.dart';
import '../../../../config/theme.dart';
import '../../../../shared/widgets/pv_empty_state.dart';

class CommunityFeedScreen extends StatefulWidget {
  const CommunityFeedScreen({super.key});

  @override
  State<CommunityFeedScreen> createState() => _CommunityFeedScreenState();
}

class _CommunityFeedScreenState extends State<CommunityFeedScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Community'),
        actions: [
          IconButton(icon: const Icon(Icons.search), onPressed: () {}),
          IconButton(icon: const Icon(Icons.group_add), onPressed: () => _showJoinDialog(context)),
        ],
        bottom: TabBar(
          controller: _tabController,
          labelColor: PetVerseColors.primaryTeal,
          unselectedLabelColor: PetVerseColors.neutralGray500,
          indicatorColor: PetVerseColors.primaryTeal,
          tabs: const [
            Tab(text: 'Feed'),
            Tab(text: 'Litter Groups'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildFeedTab(),
          _buildLitterGroupsTab(),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {/* TODO: Create post or group */},
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildFeedTab() {
    return PVEmptyState(
      title: 'Nessun post nel feed',
      subtitle: 'Unisciti a un gruppo di cucciolata per vedere i post dei fratellini!',
      icon: Icons.feed_outlined,
      ctaLabel: 'Esplora gruppi',
      onCtaTap: () => _tabController.animateTo(1),
    );
  }

  Widget _buildLitterGroupsTab() {
    return PVEmptyState(
      title: 'Nessun gruppo',
      subtitle: 'Crea un gruppo di cucciolata o unisciti con un codice invito.',
      icon: Icons.groups_outlined,
      ctaLabel: 'Crea gruppo',
      onCtaTap: () {/* TODO: Create litter group */},
    );
  }

  void _showJoinDialog(BuildContext context) {
    final codeController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Unisciti a un gruppo'),
        content: TextField(
          controller: codeController,
          decoration: const InputDecoration(
            hintText: 'Inserisci codice invito',
            prefixIcon: Icon(Icons.vpn_key),
          ),
          textCapitalization: TextCapitalization.characters,
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Annulla')),
          ElevatedButton(
            onPressed: () {
              // TODO: Join by code
              Navigator.pop(context);
            },
            child: const Text('Unisciti'),
          ),
        ],
      ),
    );
  }
}
