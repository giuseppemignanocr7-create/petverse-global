import 'package:flutter/material.dart';
import '../../config/theme.dart';

enum PVButtonVariant { primary, secondary, ghost, danger }
enum PVButtonSize { small, medium, large }

class PVButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final PVButtonVariant variant;
  final PVButtonSize size;
  final bool isLoading;
  final IconData? icon;
  final bool fullWidth;

  const PVButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant = PVButtonVariant.primary,
    this.size = PVButtonSize.medium,
    this.isLoading = false,
    this.icon,
    this.fullWidth = false,
  });

  @override
  Widget build(BuildContext context) {
    final buttonStyle = _getButtonStyle();
    final child = _buildChild();

    Widget button;
    switch (variant) {
      case PVButtonVariant.primary:
        button = ElevatedButton(
          onPressed: isLoading ? null : onPressed,
          style: buttonStyle,
          child: child,
        );
        break;
      case PVButtonVariant.secondary:
        button = OutlinedButton(
          onPressed: isLoading ? null : onPressed,
          style: buttonStyle,
          child: child,
        );
        break;
      case PVButtonVariant.ghost:
        button = TextButton(
          onPressed: isLoading ? null : onPressed,
          style: buttonStyle,
          child: child,
        );
        break;
      case PVButtonVariant.danger:
        button = ElevatedButton(
          onPressed: isLoading ? null : onPressed,
          style: buttonStyle,
          child: child,
        );
        break;
    }

    return fullWidth ? SizedBox(width: double.infinity, child: button) : button;
  }

  Widget _buildChild() {
    if (isLoading) {
      return SizedBox(
        height: _getIconSize(),
        width: _getIconSize(),
        child: const CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
      );
    }

    if (icon != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: _getIconSize()),
          SizedBox(width: PetVerseSpacing.s),
          Text(label),
        ],
      );
    }

    return Text(label);
  }

  ButtonStyle _getButtonStyle() {
    final padding = _getPadding();

    switch (variant) {
      case PVButtonVariant.primary:
        return ElevatedButton.styleFrom(
          backgroundColor: PetVerseColors.primaryTeal,
          foregroundColor: Colors.white,
          padding: padding,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(PetVerseRadius.m),
          ),
        );
      case PVButtonVariant.secondary:
        return OutlinedButton.styleFrom(
          foregroundColor: PetVerseColors.primaryTeal,
          side: const BorderSide(color: PetVerseColors.primaryTeal),
          padding: padding,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(PetVerseRadius.m),
          ),
        );
      case PVButtonVariant.ghost:
        return TextButton.styleFrom(
          foregroundColor: PetVerseColors.primaryTeal,
          padding: padding,
        );
      case PVButtonVariant.danger:
        return ElevatedButton.styleFrom(
          backgroundColor: PetVerseColors.error,
          foregroundColor: Colors.white,
          padding: padding,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(PetVerseRadius.m),
          ),
        );
    }
  }

  EdgeInsets _getPadding() {
    switch (size) {
      case PVButtonSize.small:
        return const EdgeInsets.symmetric(horizontal: 12, vertical: 8);
      case PVButtonSize.medium:
        return const EdgeInsets.symmetric(horizontal: 24, vertical: 14);
      case PVButtonSize.large:
        return const EdgeInsets.symmetric(horizontal: 32, vertical: 18);
    }
  }

  double _getIconSize() {
    switch (size) {
      case PVButtonSize.small:
        return 16;
      case PVButtonSize.medium:
        return 20;
      case PVButtonSize.large:
        return 24;
    }
  }
}
