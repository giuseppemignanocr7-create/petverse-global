import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';
import '../../../../shared/widgets/pv_button.dart';
import '../../../../shared/widgets/pv_text_field.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;
  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isLoading = true);
    // TODO: Call auth service
    await Future.delayed(const Duration(seconds: 1));
    if (!mounted) return;
    setState(() => _isLoading = false);
    context.go('/home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(PetVerseSpacing.l),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: PetVerseSpacing.xxl),
                Center(
                  child: Icon(Icons.pets, size: 64, color: PetVerseColors.primaryTeal),
                ),
                const SizedBox(height: PetVerseSpacing.l),
                Center(
                  child: Text('Bentornato!', style: PetVerseTextStyles.displayMedium),
                ),
                Center(
                  child: Text(
                    'Accedi al tuo account PetVerse',
                    style: PetVerseTextStyles.bodyLarge.copyWith(
                      color: PetVerseColors.neutralGray600,
                    ),
                  ),
                ),
                const SizedBox(height: PetVerseSpacing.xl),
                PVTextField(
                  label: 'Email',
                  hint: 'mario@example.com',
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  prefixIcon: const Icon(Icons.email_outlined),
                  validator: (value) {
                    if (value == null || value.isEmpty) return 'Email obbligatoria';
                    if (!value.contains('@')) return 'Email non valida';
                    return null;
                  },
                ),
                const SizedBox(height: PetVerseSpacing.m),
                PVTextField(
                  label: 'Password',
                  hint: 'La tua password',
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  prefixIcon: const Icon(Icons.lock_outlined),
                  suffixIcon: IconButton(
                    icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                    onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) return 'Password obbligatoria';
                    if (value.length < 8) return 'Minimo 8 caratteri';
                    return null;
                  },
                ),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () => context.push('/forgot-password'),
                    child: const Text('Password dimenticata?'),
                  ),
                ),
                const SizedBox(height: PetVerseSpacing.m),
                PVButton(
                  label: 'Accedi',
                  fullWidth: true,
                  isLoading: _isLoading,
                  onPressed: _login,
                ),
                const SizedBox(height: PetVerseSpacing.l),
                Row(
                  children: [
                    const Expanded(child: Divider()),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: PetVerseSpacing.m),
                      child: Text('oppure', style: PetVerseTextStyles.labelMedium.copyWith(color: PetVerseColors.neutralGray500)),
                    ),
                    const Expanded(child: Divider()),
                  ],
                ),
                const SizedBox(height: PetVerseSpacing.l),
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton.icon(
                    onPressed: () {/* TODO: Google Sign-In */},
                    icon: const Icon(Icons.g_mobiledata, size: 24),
                    label: const Text('Continua con Google'),
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(PetVerseRadius.m)),
                    ),
                  ),
                ),
                const SizedBox(height: PetVerseSpacing.s),
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton.icon(
                    onPressed: () {/* TODO: Apple Sign-In */},
                    icon: const Icon(Icons.apple, size: 24),
                    label: const Text('Continua con Apple'),
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(PetVerseRadius.m)),
                    ),
                  ),
                ),
                const SizedBox(height: PetVerseSpacing.xl),
                Center(
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text('Non hai un account? ', style: PetVerseTextStyles.bodyMedium),
                      GestureDetector(
                        onTap: () => context.push('/register'),
                        child: Text(
                          'Registrati',
                          style: PetVerseTextStyles.bodyMedium.copyWith(
                            color: PetVerseColors.primaryTeal,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
