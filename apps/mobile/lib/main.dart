import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // In production: initialize Firebase, Sentry, Hive, etc.
  // await Firebase.initializeApp();
  // await SentryFlutter.init((options) { ... });
  // await Hive.initFlutter();

  runApp(
    const ProviderScope(
      child: PetVerseApp(),
    ),
  );
}
