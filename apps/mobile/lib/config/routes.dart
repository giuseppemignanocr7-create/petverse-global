import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../features/auth/presentation/screens/splash_screen.dart';
import '../features/auth/presentation/screens/onboarding_screen.dart';
import '../features/auth/presentation/screens/login_screen.dart';
import '../features/auth/presentation/screens/register_screen.dart';
import '../features/auth/presentation/screens/forgot_password_screen.dart';
import '../features/pets/presentation/screens/pet_list_screen.dart';
import '../features/pets/presentation/screens/add_pet_screen.dart';
import '../features/pets/presentation/screens/pet_detail_screen.dart';
import '../features/health/presentation/screens/health_dashboard_screen.dart';
import '../features/diary/presentation/screens/diary_timeline_screen.dart';
import '../features/ai_coach/presentation/screens/ai_coach_chat_screen.dart';
import '../features/social/presentation/screens/community_feed_screen.dart';
import '../features/marketplace/presentation/screens/marketplace_home_screen.dart';
import '../features/news/presentation/screens/news_feed_screen.dart';
import '../features/profile/presentation/screens/user_profile_screen.dart';
import '../features/profile/presentation/screens/settings_screen.dart';
import '../shared/widgets/main_shell.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>();
final GlobalKey<NavigatorState> _shellNavigatorKey = GlobalKey<NavigatorState>();

final GoRouter appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/splash',
  routes: [
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/onboarding',
      builder: (context, state) => const OnboardingScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/register',
      builder: (context, state) => const RegisterScreen(),
    ),
    GoRoute(
      path: '/forgot-password',
      builder: (context, state) => const ForgotPasswordScreen(),
    ),
    ShellRoute(
      navigatorKey: _shellNavigatorKey,
      builder: (context, state, child) => MainShell(child: child),
      routes: [
        GoRoute(
          path: '/home',
          builder: (context, state) => const PetListScreen(),
        ),
        GoRoute(
          path: '/diary',
          builder: (context, state) => const DiaryTimelineScreen(),
        ),
        GoRoute(
          path: '/ai-coach',
          builder: (context, state) => const AiCoachChatScreen(),
        ),
        GoRoute(
          path: '/community',
          builder: (context, state) => const CommunityFeedScreen(),
        ),
        GoRoute(
          path: '/profile',
          builder: (context, state) => const UserProfileScreen(),
        ),
      ],
    ),
    GoRoute(
      path: '/pets/add',
      builder: (context, state) => const AddPetScreen(),
    ),
    GoRoute(
      path: '/pets/:id',
      builder: (context, state) => PetDetailScreen(
        petId: state.pathParameters['id']!,
      ),
    ),
    GoRoute(
      path: '/pets/:id/health',
      builder: (context, state) => HealthDashboardScreen(
        petId: state.pathParameters['id']!,
      ),
    ),
    GoRoute(
      path: '/marketplace',
      builder: (context, state) => const MarketplaceHomeScreen(),
    ),
    GoRoute(
      path: '/news',
      builder: (context, state) => const NewsFeedScreen(),
    ),
    GoRoute(
      path: '/settings',
      builder: (context, state) => const SettingsScreen(),
    ),
  ],
);
