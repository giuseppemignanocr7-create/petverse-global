import 'package:flutter/material.dart';
import '../../config/theme.dart';
import 'pv_button.dart';

class PVErrorView extends StatelessWidget {
  final String message;
  final VoidCallback? onRetry;

  const PVErrorView({
    super.key,
    required this.message,
    this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(PetVerseSpacing.xl),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.error_outline, size: 64, color: PetVerseColors.error),
            const SizedBox(height: PetVerseSpacing.m),
            Text(
              message,
              style: PetVerseTextStyles.bodyLarge,
              textAlign: TextAlign.center,
            ),
            if (onRetry != null) ...[
              const SizedBox(height: PetVerseSpacing.l),
              PVButton(label: 'Riprova', onPressed: onRetry, icon: Icons.refresh),
            ],
          ],
        ),
      ),
    );
  }
}
