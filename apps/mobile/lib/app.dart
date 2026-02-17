import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'config/theme.dart';
import 'config/routes.dart';

class PetVerseApp extends ConsumerWidget {
  const PetVerseApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp.router(
      title: 'PetVerse',
      debugShowCheckedModeBanner: false,
      theme: PetVerseTheme.lightTheme(),
      darkTheme: PetVerseTheme.darkTheme(),
      themeMode: ThemeMode.system,
      routerConfig: appRouter,
    );
  }
}
