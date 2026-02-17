import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import '../../config/theme.dart';

enum PVLoadingType { spinner, shimmer, skeleton }

class PVLoadingIndicator extends StatelessWidget {
  final PVLoadingType type;

  const PVLoadingIndicator({super.key, this.type = PVLoadingType.spinner});

  @override
  Widget build(BuildContext context) {
    switch (type) {
      case PVLoadingType.spinner:
        return const Center(
          child: CircularProgressIndicator(
            color: PetVerseColors.primaryTeal,
          ),
        );
      case PVLoadingType.shimmer:
        return Shimmer.fromColors(
          baseColor: PetVerseColors.neutralGray200,
          highlightColor: PetVerseColors.neutralGray100,
          child: Column(
            children: List.generate(3, (_) => _shimmerCard()),
          ),
        );
      case PVLoadingType.skeleton:
        return Column(
          children: List.generate(3, (_) => _skeletonCard()),
        );
    }
  }

  Widget _shimmerCard() {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: PetVerseSpacing.m,
        vertical: PetVerseSpacing.s,
      ),
      child: Container(
        height: 80,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
        ),
      ),
    );
  }

  Widget _skeletonCard() {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: PetVerseSpacing.m,
        vertical: PetVerseSpacing.s,
      ),
      child: Container(
        height: 80,
        decoration: BoxDecoration(
          color: PetVerseColors.neutralGray200,
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
        ),
      ),
    );
  }
}
