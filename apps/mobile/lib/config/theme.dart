import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PetVerseColors {
  // Primary
  static const Color primaryTeal = Color(0xFF00B8A9);
  static const Color primaryTealLight = Color(0xFF4DD4C7);
  static const Color primaryTealDark = Color(0xFF00897B);

  // Secondary
  static const Color secondaryBeige = Color(0xFFF8E8C4);
  static const Color secondaryBeigeLight = Color(0xFFFFF4E1);
  static const Color secondaryBeigeDark = Color(0xFFE4D4A8);

  // Accent
  static const Color accentCoral = Color(0xFFFF6F61);
  static const Color accentCoralLight = Color(0xFFFF9E8F);
  static const Color accentCoralDark = Color(0xFFE85444);

  // Neutrals
  static const Color neutralGray50 = Color(0xFFFAFAFA);
  static const Color neutralGray100 = Color(0xFFF5F5F5);
  static const Color neutralGray200 = Color(0xFFEEEEEE);
  static const Color neutralGray300 = Color(0xFFE0E0E0);
  static const Color neutralGray400 = Color(0xFFBDBDBD);
  static const Color neutralGray500 = Color(0xFF9E9E9E);
  static const Color neutralGray600 = Color(0xFF757575);
  static const Color neutralGray700 = Color(0xFF616161);
  static const Color neutralGray800 = Color(0xFF424242);
  static const Color neutralGray900 = Color(0xFF212121);

  // Semantic
  static const Color success = Color(0xFF10B981);
  static const Color error = Color(0xFFDC2626);
  static const Color warning = Color(0xFFF59E0B);
  static const Color info = Color(0xFF3B82F6);

  // Background
  static const Color backgroundLight = Color(0xFFFAFAFA);
  static const Color backgroundDark = Color(0xFF121212);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceDark = Color(0xFF1E1E1E);
}

class PetVerseTextStyles {
  static TextStyle displayLarge = const TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.5,
    height: 1.2,
  );

  static TextStyle displayMedium = const TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.25,
    height: 1.2,
  );

  static TextStyle headlineLarge = const TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    height: 1.3,
  );

  static TextStyle headlineMedium = const TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.3,
  );

  static TextStyle titleLarge = const TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    height: 1.4,
  );

  static TextStyle titleMedium = const TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w500,
    height: 1.4,
  );

  static TextStyle bodyLarge = const TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
  );

  static TextStyle bodyMedium = const TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w400,
    height: 1.5,
  );

  static TextStyle labelLarge = const TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w500,
    height: 1.4,
  );

  static TextStyle labelMedium = const TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    height: 1.4,
  );

  static TextStyle labelSmall = const TextStyle(
    fontSize: 11,
    fontWeight: FontWeight.w500,
    height: 1.3,
  );
}

class PetVerseSpacing {
  static const double xs = 4.0;
  static const double s = 8.0;
  static const double m = 16.0;
  static const double l = 24.0;
  static const double xl = 32.0;
  static const double xxl = 48.0;
  static const double xxxl = 64.0;
}

class PetVerseRadius {
  static const double xs = 4.0;
  static const double s = 8.0;
  static const double m = 12.0;
  static const double l = 16.0;
  static const double xl = 24.0;
  static const double full = 9999.0;
}

class PetVerseElevation {
  static List<BoxShadow> level1 = [
    BoxShadow(
      color: Colors.black.withOpacity(0.05),
      blurRadius: 4,
      offset: const Offset(0, 2),
    ),
  ];

  static List<BoxShadow> level2 = [
    BoxShadow(
      color: Colors.black.withOpacity(0.08),
      blurRadius: 8,
      offset: const Offset(0, 4),
    ),
  ];

  static List<BoxShadow> level3 = [
    BoxShadow(
      color: Colors.black.withOpacity(0.12),
      blurRadius: 16,
      offset: const Offset(0, 8),
    ),
  ];

  static List<BoxShadow> level4 = [
    BoxShadow(
      color: Colors.black.withOpacity(0.16),
      blurRadius: 24,
      offset: const Offset(0, 12),
    ),
  ];
}

class PetVerseTheme {
  static ThemeData lightTheme() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.light(
        primary: PetVerseColors.primaryTeal,
        onPrimary: Colors.white,
        secondary: PetVerseColors.accentCoral,
        onSecondary: Colors.white,
        surface: PetVerseColors.surface,
        onSurface: PetVerseColors.neutralGray900,
        error: PetVerseColors.error,
        onError: Colors.white,
      ),
      scaffoldBackgroundColor: PetVerseColors.backgroundLight,
      textTheme: GoogleFonts.interTextTheme().copyWith(
        displayLarge: PetVerseTextStyles.displayLarge,
        displayMedium: PetVerseTextStyles.displayMedium,
        headlineLarge: PetVerseTextStyles.headlineLarge,
        headlineMedium: PetVerseTextStyles.headlineMedium,
        titleLarge: PetVerseTextStyles.titleLarge,
        titleMedium: PetVerseTextStyles.titleMedium,
        bodyLarge: PetVerseTextStyles.bodyLarge,
        bodyMedium: PetVerseTextStyles.bodyMedium,
        labelLarge: PetVerseTextStyles.labelLarge,
        labelMedium: PetVerseTextStyles.labelMedium,
        labelSmall: PetVerseTextStyles.labelSmall,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: PetVerseColors.surface,
        foregroundColor: PetVerseColors.neutralGray900,
        elevation: 0,
        centerTitle: false,
      ),
      cardTheme: CardTheme(
        color: PetVerseColors.surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: PetVerseColors.primaryTeal,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(PetVerseRadius.m),
          ),
          textStyle: PetVerseTextStyles.labelLarge,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: PetVerseColors.primaryTeal,
          side: const BorderSide(color: PetVerseColors.primaryTeal),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(PetVerseRadius.m),
          ),
          textStyle: PetVerseTextStyles.labelLarge,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: PetVerseColors.neutralGray100,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
          borderSide: const BorderSide(color: PetVerseColors.primaryTeal, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
          borderSide: const BorderSide(color: PetVerseColors.error),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: PetVerseColors.surface,
        selectedItemColor: PetVerseColors.primaryTeal,
        unselectedItemColor: PetVerseColors.neutralGray500,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
      ),
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: PetVerseColors.primaryTeal,
        foregroundColor: Colors.white,
      ),
      chipTheme: ChipThemeData(
        backgroundColor: PetVerseColors.primaryTealLight.withOpacity(0.1),
        selectedColor: PetVerseColors.primaryTeal,
        labelStyle: PetVerseTextStyles.labelMedium,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(PetVerseRadius.full),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: PetVerseColors.neutralGray200,
        thickness: 1,
      ),
    );
  }

  static ThemeData darkTheme() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.dark(
        primary: PetVerseColors.primaryTealLight,
        onPrimary: Colors.black,
        secondary: PetVerseColors.accentCoralLight,
        onSecondary: Colors.black,
        surface: PetVerseColors.surfaceDark,
        onSurface: Colors.white,
        error: PetVerseColors.error,
        onError: Colors.white,
      ),
      scaffoldBackgroundColor: PetVerseColors.backgroundDark,
      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
        displayLarge: PetVerseTextStyles.displayLarge.copyWith(color: Colors.white),
        displayMedium: PetVerseTextStyles.displayMedium.copyWith(color: Colors.white),
        headlineLarge: PetVerseTextStyles.headlineLarge.copyWith(color: Colors.white),
        headlineMedium: PetVerseTextStyles.headlineMedium.copyWith(color: Colors.white),
        titleLarge: PetVerseTextStyles.titleLarge.copyWith(color: Colors.white),
        titleMedium: PetVerseTextStyles.titleMedium.copyWith(color: Colors.white),
        bodyLarge: PetVerseTextStyles.bodyLarge.copyWith(color: Colors.white70),
        bodyMedium: PetVerseTextStyles.bodyMedium.copyWith(color: Colors.white70),
        labelLarge: PetVerseTextStyles.labelLarge.copyWith(color: Colors.white),
        labelMedium: PetVerseTextStyles.labelMedium.copyWith(color: Colors.white70),
        labelSmall: PetVerseTextStyles.labelSmall.copyWith(color: Colors.white60),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: PetVerseColors.surfaceDark,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
      ),
      cardTheme: CardTheme(
        color: PetVerseColors.surfaceDark,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: PetVerseColors.primaryTealLight,
          foregroundColor: Colors.black,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(PetVerseRadius.m),
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: PetVerseColors.neutralGray800,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(PetVerseRadius.m),
          borderSide: const BorderSide(color: PetVerseColors.primaryTealLight, width: 2),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: PetVerseColors.surfaceDark,
        selectedItemColor: PetVerseColors.primaryTealLight,
        unselectedItemColor: PetVerseColors.neutralGray500,
        type: BottomNavigationBarType.fixed,
      ),
    );
  }
}
