import 'package:flutter/material.dart';
import '../../../../config/theme.dart';
import '../../../../shared/widgets/pv_empty_state.dart';

class DiaryTimelineScreen extends StatefulWidget {
  const DiaryTimelineScreen({super.key});

  @override
  State<DiaryTimelineScreen> createState() => _DiaryTimelineScreenState();
}

class _DiaryTimelineScreenState extends State<DiaryTimelineScreen> {
  String _selectedFilter = 'all';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Diario'),
        actions: [
          IconButton(icon: const Icon(Icons.search), onPressed: () {}),
          IconButton(icon: const Icon(Icons.filter_list), onPressed: () => _showFilters(context)),
        ],
      ),
      body: Column(
        children: [
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: PetVerseSpacing.m, vertical: PetVerseSpacing.s),
            child: Row(
              children: [
                _filterChip('Tutti', 'all'),
                _filterChip('Foto', 'photo'),
                _filterChip('Video', 'video'),
                _filterChip('Milestone', 'milestone'),
                _filterChip('Note', 'note'),
              ],
            ),
          ),
          Expanded(
            child: PVEmptyState(
              title: 'Nessun momento registrato',
              subtitle: 'Inizia a documentare la vita del tuo pet!',
              icon: Icons.photo_album_outlined,
              ctaLabel: 'Aggiungi momento',
              onCtaTap: () {/* TODO: Navigate to add diary entry */},
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {/* TODO: Navigate to add diary entry */},
        icon: const Icon(Icons.add),
        label: const Text('Aggiungi momento'),
      ),
    );
  }

  Widget _filterChip(String label, String value) {
    final isSelected = _selectedFilter == value;
    return Padding(
      padding: const EdgeInsets.only(right: PetVerseSpacing.s),
      child: FilterChip(
        label: Text(label),
        selected: isSelected,
        onSelected: (_) => setState(() => _selectedFilter = value),
        selectedColor: PetVerseColors.primaryTeal,
        labelStyle: TextStyle(color: isSelected ? Colors.white : null),
        checkmarkColor: Colors.white,
      ),
    );
  }

  void _showFilters(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(PetVerseRadius.l)),
      ),
      builder: (context) => Padding(
        padding: const EdgeInsets.all(PetVerseSpacing.l),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Filtri', style: PetVerseTextStyles.titleLarge),
            const SizedBox(height: PetVerseSpacing.m),
            ListTile(title: const Text('Per data'), trailing: const Icon(Icons.chevron_right), onTap: () => Navigator.pop(context)),
            ListTile(title: const Text('Per pet'), trailing: const Icon(Icons.chevron_right), onTap: () => Navigator.pop(context)),
            ListTile(title: const Text('Per mood'), trailing: const Icon(Icons.chevron_right), onTap: () => Navigator.pop(context)),
          ],
        ),
      ),
    );
  }
}
