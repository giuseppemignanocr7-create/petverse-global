import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';
import '../../../../shared/widgets/pv_button.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<_OnboardingPage> _pages = const [
    _OnboardingPage(
      icon: Icons.book,
      title: 'Il diario di vita del tuo pet',
      description:
          'Registra ogni momento speciale, dalle vaccinazioni alle avventure quotidiane. Tutto in un unico posto.',
    ),
    _OnboardingPage(
      icon: Icons.smart_toy,
      title: 'AI Coach sempre con te',
      description:
          'Un assistente intelligente che conosce il tuo pet e ti aiuta con consigli personalizzati 24/7.',
    ),
    _OnboardingPage(
      icon: Icons.people,
      title: 'Veterinari, community e marketplace',
      description:
          'Connettiti con veterinari, unisciti a gruppi di cucciolata e scopri prodotti selezionati per il tuo pet.',
    ),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Align(
              alignment: Alignment.topRight,
              child: TextButton(
                onPressed: () => context.go('/login'),
                child: const Text('Salta'),
              ),
            ),
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (index) => setState(() => _currentPage = index),
                itemCount: _pages.length,
                itemBuilder: (context, index) {
                  final page = _pages[index];
                  return Padding(
                    padding: const EdgeInsets.all(PetVerseSpacing.xl),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 120,
                          height: 120,
                          decoration: BoxDecoration(
                            color: PetVerseColors.primaryTeal.withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            page.icon,
                            size: 60,
                            color: PetVerseColors.primaryTeal,
                          ),
                        ),
                        const SizedBox(height: PetVerseSpacing.xl),
                        Text(
                          page.title,
                          style: PetVerseTextStyles.headlineLarge,
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: PetVerseSpacing.m),
                        Text(
                          page.description,
                          style: PetVerseTextStyles.bodyLarge.copyWith(
                            color: PetVerseColors.neutralGray600,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(PetVerseSpacing.l),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      _pages.length,
                      (index) => Container(
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        width: _currentPage == index ? 24 : 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: _currentPage == index
                              ? PetVerseColors.primaryTeal
                              : PetVerseColors.neutralGray300,
                          borderRadius:
                              BorderRadius.circular(PetVerseRadius.full),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: PetVerseSpacing.l),
                  PVButton(
                    label: _currentPage == _pages.length - 1
                        ? 'Inizia'
                        : 'Avanti',
                    fullWidth: true,
                    onPressed: () {
                      if (_currentPage == _pages.length - 1) {
                        context.go('/login');
                      } else {
                        _pageController.nextPage(
                          duration: const Duration(milliseconds: 300),
                          curve: Curves.easeInOut,
                        );
                      }
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _OnboardingPage {
  final IconData icon;
  final String title;
  final String description;

  const _OnboardingPage({
    required this.icon,
    required this.title,
    required this.description,
  });
}
