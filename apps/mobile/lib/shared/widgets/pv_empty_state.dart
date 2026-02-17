import 'package:flutter/material.dart';
import '../../config/theme.dart';
import 'pv_button.dart';

class PVEmptyState extends StatelessWidget {
  final String title;
  final String? subtitle;
  final IconData? icon;
  final String? ctaLabel;
  final VoidCallback? onCtaTap;

  const PVEmptyState({
    super.key,
    required this.title,
    this.subtitle,
    this.icon,
    this.ctaLabel,
    this.onCtaTap,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(PetVerseSpacing.xl),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (icon != null)
              Icon(icon, size: 64, color: PetVerseColors.neutralGray400),
            const SizedBox(height: PetVerseSpacing.m),
            Text(
              title,
              style: PetVerseTextStyles.headlineMedium,
              textAlign: TextAlign.center,
            ),
            if (subtitle != null) ...[
              const SizedBox(height: PetVerseSpacing.s),
              Text(
                subtitle!,
                style: PetVerseTextStyles.bodyMedium.copyWith(
                  color: PetVerseColors.neutralGray600,
                ),
                textAlign: TextAlign.center,
              ),
            ],
            if (ctaLabel != null && onCtaTap != null) ...[
              const SizedBox(height: PetVerseSpacing.l),
              PVButton(label: ctaLabel!, onPressed: onCtaTap),
            ],
          ],
        ),
      ),
    );
  }
}
