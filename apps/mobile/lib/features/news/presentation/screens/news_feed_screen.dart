import 'package:flutter/material.dart';
import '../../../../config/theme.dart';

class NewsFeedScreen extends StatefulWidget {
  const NewsFeedScreen({super.key});

  @override
  State<NewsFeedScreen> createState() => _NewsFeedScreenState();
}

class _NewsFeedScreenState extends State<NewsFeedScreen> {
  String _selectedCategory = 'all';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('News & Consigli'),
        actions: [
          IconButton(icon: const Icon(Icons.search), onPressed: () {}),
          IconButton(icon: const Icon(Icons.bookmark_border), onPressed: () {}),
        ],
      ),
      body: ListView(
        children: [
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: PetVerseSpacing.m, vertical: PetVerseSpacing.s),
            child: Row(
              children: [
                _filterChip('Tutti', 'all'),
                _filterChip('Nutrizione', 'nutrition'),
                _filterChip('Salute', 'health'),
                _filterChip('Comportamento', 'behavior'),
                _filterChip('Addestramento', 'training'),
                _filterChip('Curiosità', 'curiosity'),
              ],
            ),
          ),
          // Featured article
          Padding(
            padding: const EdgeInsets.all(PetVerseSpacing.m),
            child: _featuredArticle(),
          ),
          // Article list
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: PetVerseSpacing.m),
            child: Text('Articoli recenti', style: PetVerseTextStyles.titleLarge),
          ),
          const SizedBox(height: PetVerseSpacing.s),
          ...List.generate(5, (i) => _articleCard(i)),
          const SizedBox(height: PetVerseSpacing.xxl),
        ],
      ),
    );
  }

  Widget _filterChip(String label, String value) {
    final isSelected = _selectedCategory == value;
    return Padding(
      padding: const EdgeInsets.only(right: PetVerseSpacing.s),
      child: FilterChip(
        label: Text(label),
        selected: isSelected,
        onSelected: (_) => setState(() => _selectedCategory = value),
        selectedColor: PetVerseColors.primaryTeal,
        labelStyle: TextStyle(color: isSelected ? Colors.white : null),
        checkmarkColor: Colors.white,
      ),
    );
  }

  Widget _featuredArticle() {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 180,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [PetVerseColors.primaryTeal, PetVerseColors.primaryTealDark],
              ),
            ),
            child: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.article, size: 48, color: Colors.white70),
                  const SizedBox(height: PetVerseSpacing.s),
                  Text('In evidenza', style: PetVerseTextStyles.labelMedium.copyWith(color: Colors.white70)),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(PetVerseSpacing.m),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: PetVerseColors.primaryTeal.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(PetVerseRadius.xs),
                  ),
                  child: Text('Nutrizione', style: PetVerseTextStyles.labelSmall.copyWith(color: PetVerseColors.primaryTeal)),
                ),
                const SizedBox(height: PetVerseSpacing.s),
                Text('Come scegliere la dieta migliore per il tuo cane', style: PetVerseTextStyles.titleLarge),
                const SizedBox(height: PetVerseSpacing.xs),
                Text(
                  'Scopri i principi fondamentali per una nutrizione equilibrata che mantiene il tuo pet in salute...',
                  style: PetVerseTextStyles.bodyMedium.copyWith(color: PetVerseColors.neutralGray600),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: PetVerseSpacing.s),
                Row(
                  children: [
                    Text('5 min di lettura', style: PetVerseTextStyles.labelSmall.copyWith(color: PetVerseColors.neutralGray500)),
                    const Spacer(),
                    IconButton(icon: const Icon(Icons.bookmark_border, size: 20), onPressed: () {}),
                    IconButton(icon: const Icon(Icons.share, size: 20), onPressed: () {}),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _articleCard(int index) {
    final categories = ['Salute', 'Comportamento', 'Nutrizione', 'Addestramento', 'Curiosità'];
    final titles = [
      'Segnali di stress nel cane: come riconoscerli',
      'Le 5 regole d\'oro per la passeggiata',
      'Integratori naturali per il tuo gatto',
      'Come insegnare al cucciolo a restare da solo',
      'Perché i gatti fanno le fusa?',
    ];

    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: PetVerseSpacing.m, vertical: PetVerseSpacing.xs),
      leading: Container(
        width: 80,
        height: 80,
        decoration: BoxDecoration(
          color: PetVerseColors.neutralGray100,
          borderRadius: BorderRadius.circular(PetVerseRadius.s),
        ),
        child: const Icon(Icons.article, color: PetVerseColors.neutralGray400),
      ),
      title: Text(titles[index], style: PetVerseTextStyles.titleMedium, maxLines: 2, overflow: TextOverflow.ellipsis),
      subtitle: Padding(
        padding: const EdgeInsets.only(top: 4),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: PetVerseColors.primaryTeal.withOpacity(0.1),
                borderRadius: BorderRadius.circular(PetVerseRadius.xs),
              ),
              child: Text(categories[index], style: PetVerseTextStyles.labelSmall.copyWith(color: PetVerseColors.primaryTeal, fontSize: 10)),
            ),
            const SizedBox(width: 8),
            Text('${3 + index} min', style: PetVerseTextStyles.labelSmall.copyWith(color: PetVerseColors.neutralGray500)),
          ],
        ),
      ),
      onTap: () {},
    );
  }
}
