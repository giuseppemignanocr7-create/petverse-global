import 'package:flutter/material.dart';
import '../../../../config/theme.dart';

class MarketplaceHomeScreen extends StatefulWidget {
  const MarketplaceHomeScreen({super.key});

  @override
  State<MarketplaceHomeScreen> createState() => _MarketplaceHomeScreenState();
}

class _MarketplaceHomeScreenState extends State<MarketplaceHomeScreen> {
  String _selectedCategory = 'all';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Marketplace'),
        actions: [
          IconButton(icon: const Icon(Icons.search), onPressed: () {}),
          IconButton(
            icon: Stack(
              children: [
                const Icon(Icons.shopping_cart_outlined),
                Positioned(
                  right: 0,
                  top: 0,
                  child: Container(
                    padding: const EdgeInsets.all(2),
                    decoration: const BoxDecoration(color: PetVerseColors.accentCoral, shape: BoxShape.circle),
                    child: Text('0', style: PetVerseTextStyles.labelSmall.copyWith(color: Colors.white, fontSize: 10)),
                  ),
                ),
              ],
            ),
            onPressed: () {},
          ),
        ],
      ),
      body: ListView(
        children: [
          // Promo banner
          Container(
            margin: const EdgeInsets.all(PetVerseSpacing.m),
            height: 160,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [PetVerseColors.primaryTeal, PetVerseColors.primaryTealDark],
              ),
              borderRadius: BorderRadius.circular(PetVerseRadius.l),
            ),
            child: Padding(
              padding: const EdgeInsets.all(PetVerseSpacing.l),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Prodotti Premium', style: PetVerseTextStyles.headlineLarge.copyWith(color: Colors.white)),
                  const SizedBox(height: PetVerseSpacing.xs),
                  Text('Sconti esclusivi per abbonati Premium', style: PetVerseTextStyles.bodyMedium.copyWith(color: Colors.white70)),
                  const SizedBox(height: PetVerseSpacing.m),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(PetVerseRadius.full)),
                    child: Text('Scopri', style: PetVerseTextStyles.labelLarge.copyWith(color: PetVerseColors.primaryTeal)),
                  ),
                ],
              ),
            ),
          ),
          // Categories
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: PetVerseSpacing.m),
            child: Text('Categorie', style: PetVerseTextStyles.titleLarge),
          ),
          const SizedBox(height: PetVerseSpacing.s),
          SizedBox(
            height: 100,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: PetVerseSpacing.m),
              children: [
                _categoryItem('Cibo', Icons.restaurant, 'food'),
                _categoryItem('Giochi', Icons.toys, 'toys'),
                _categoryItem('Salute', Icons.medical_services, 'health'),
                _categoryItem('Accessori', Icons.checkroom, 'accessories'),
                _categoryItem('Toelettatura', Icons.shower, 'grooming'),
              ],
            ),
          ),
          const SizedBox(height: PetVerseSpacing.l),
          // Recommended products
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: PetVerseSpacing.m),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Consigliati per te', style: PetVerseTextStyles.titleLarge),
                TextButton(onPressed: () {}, child: const Text('Vedi tutti')),
              ],
            ),
          ),
          SizedBox(
            height: 220,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: PetVerseSpacing.m),
              itemCount: 5,
              itemBuilder: (context, index) => _productCard(index),
            ),
          ),
          const SizedBox(height: PetVerseSpacing.l),
          // Popular products
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: PetVerseSpacing.m),
            child: Text('Più venduti', style: PetVerseTextStyles.titleLarge),
          ),
          const SizedBox(height: PetVerseSpacing.s),
          ...List.generate(3, (i) => _productListTile(i)),
          const SizedBox(height: PetVerseSpacing.xxl),
        ],
      ),
    );
  }

  Widget _categoryItem(String label, IconData icon, String key) {
    final isSelected = _selectedCategory == key;
    return GestureDetector(
      onTap: () => setState(() => _selectedCategory = key),
      child: Container(
        width: 80,
        margin: const EdgeInsets.only(right: PetVerseSpacing.s),
        child: Column(
          children: [
            CircleAvatar(
              radius: 28,
              backgroundColor: isSelected ? PetVerseColors.primaryTeal : PetVerseColors.neutralGray100,
              child: Icon(icon, color: isSelected ? Colors.white : PetVerseColors.neutralGray600),
            ),
            const SizedBox(height: PetVerseSpacing.xs),
            Text(label, style: PetVerseTextStyles.labelMedium, textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }

  Widget _productCard(int index) {
    return Container(
      width: 160,
      margin: const EdgeInsets.only(right: PetVerseSpacing.m),
      child: Card(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 120,
              decoration: BoxDecoration(
                color: PetVerseColors.neutralGray100,
                borderRadius: const BorderRadius.vertical(top: Radius.circular(PetVerseRadius.m)),
              ),
              child: const Center(child: Icon(Icons.shopping_bag, size: 40, color: PetVerseColors.neutralGray400)),
            ),
            Padding(
              padding: const EdgeInsets.all(PetVerseSpacing.s),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Prodotto ${index + 1}', style: PetVerseTextStyles.labelLarge, maxLines: 2, overflow: TextOverflow.ellipsis),
                  const SizedBox(height: 4),
                  Text('\u20AC${(9.99 + index * 5).toStringAsFixed(2)}', style: PetVerseTextStyles.titleMedium.copyWith(color: PetVerseColors.primaryTeal)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _productListTile(int index) {
    return ListTile(
      leading: Container(
        width: 56,
        height: 56,
        decoration: BoxDecoration(
          color: PetVerseColors.neutralGray100,
          borderRadius: BorderRadius.circular(PetVerseRadius.s),
        ),
        child: const Icon(Icons.shopping_bag, color: PetVerseColors.neutralGray400),
      ),
      title: Text('Prodotto popolare ${index + 1}'),
      subtitle: Text('\u20AC${(14.99 + index * 7).toStringAsFixed(2)}'),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {},
    );
  }
}
