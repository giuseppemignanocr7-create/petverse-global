import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';
import '../../../../shared/widgets/pv_button.dart';
import '../../../../shared/widgets/pv_text_field.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _obscurePassword = true;
  bool _obscureConfirm = true;
  bool _acceptTerms = false;
  bool _isLoading = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  double _getPasswordStrength(String password) {
    if (password.isEmpty) return 0;
    double strength = 0;
    if (password.length >= 8) strength += 0.25;
    if (password.contains(RegExp(r'[A-Z]'))) strength += 0.25;
    if (password.contains(RegExp(r'[0-9]'))) strength += 0.25;
    if (password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) strength += 0.25;
    return strength;
  }

  Color _getStrengthColor(double strength) {
    if (strength <= 0.25) return PetVerseColors.error;
    if (strength <= 0.5) return PetVerseColors.warning;
    if (strength <= 0.75) return Colors.orange;
    return PetVerseColors.success;
  }

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;
    if (!_acceptTerms) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Devi accettare i termini e condizioni')),
      );
      return;
    }
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(seconds: 1));
    if (!mounted) return;
    setState(() => _isLoading = false);
    context.go('/home');
  }

  @override
  Widget build(BuildContext context) {
    final passwordStrength = _getPasswordStrength(_passwordController.text);

    return Scaffold(
      appBar: AppBar(leading: const BackButton()),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(PetVerseSpacing.l),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Crea il tuo account', style: PetVerseTextStyles.displayMedium),
                const SizedBox(height: PetVerseSpacing.s),
                Text(
                  'Unisciti a PetVerse e inizia a prenderti cura del tuo pet',
                  style: PetVerseTextStyles.bodyLarge.copyWith(color: PetVerseColors.neutralGray600),
                ),
                const SizedBox(height: PetVerseSpacing.xl),
                PVTextField(
                  label: 'Nome completo',
                  hint: 'Mario Rossi',
                  controller: _nameController,
                  prefixIcon: const Icon(Icons.person_outlined),
                  validator: (v) => (v == null || v.length < 2) ? 'Nome obbligatorio (min 2 caratteri)' : null,
                ),
                const SizedBox(height: PetVerseSpacing.m),
                PVTextField(
                  label: 'Email',
                  hint: 'mario@example.com',
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  prefixIcon: const Icon(Icons.email_outlined),
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Email obbligatoria';
                    if (!v.contains('@')) return 'Email non valida';
                    return null;
                  },
                ),
                const SizedBox(height: PetVerseSpacing.m),
                PVTextField(
                  label: 'Password',
                  hint: 'Crea una password sicura',
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  prefixIcon: const Icon(Icons.lock_outlined),
                  suffixIcon: IconButton(
                    icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                    onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                  ),
                  onChanged: (_) => setState(() {}),
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Password obbligatoria';
                    if (v.length < 8) return 'Minimo 8 caratteri';
                    return null;
                  },
                ),
                if (_passwordController.text.isNotEmpty) ...[
                  const SizedBox(height: PetVerseSpacing.s),
                  LinearProgressIndicator(
                    value: passwordStrength,
                    backgroundColor: PetVerseColors.neutralGray200,
                    color: _getStrengthColor(passwordStrength),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    passwordStrength <= 0.25 ? 'Debole' : passwordStrength <= 0.5 ? 'Media' : passwordStrength <= 0.75 ? 'Buona' : 'Forte',
                    style: PetVerseTextStyles.labelSmall.copyWith(color: _getStrengthColor(passwordStrength)),
                  ),
                ],
                const SizedBox(height: PetVerseSpacing.m),
                PVTextField(
                  label: 'Conferma password',
                  hint: 'Ripeti la password',
                  controller: _confirmPasswordController,
                  obscureText: _obscureConfirm,
                  prefixIcon: const Icon(Icons.lock_outlined),
                  suffixIcon: IconButton(
                    icon: Icon(_obscureConfirm ? Icons.visibility_off : Icons.visibility),
                    onPressed: () => setState(() => _obscureConfirm = !_obscureConfirm),
                  ),
                  validator: (v) {
                    if (v != _passwordController.text) return 'Le password non coincidono';
                    return null;
                  },
                ),
                const SizedBox(height: PetVerseSpacing.m),
                Row(
                  children: [
                    Checkbox(
                      value: _acceptTerms,
                      onChanged: (v) => setState(() => _acceptTerms = v ?? false),
                      activeColor: PetVerseColors.primaryTeal,
                    ),
                    Expanded(
                      child: GestureDetector(
                        onTap: () => setState(() => _acceptTerms = !_acceptTerms),
                        child: RichText(
                          text: TextSpan(
                            style: PetVerseTextStyles.bodyMedium.copyWith(color: PetVerseColors.neutralGray700),
                            children: const [
                              TextSpan(text: 'Accetto i '),
                              TextSpan(text: 'Termini di servizio', style: TextStyle(color: PetVerseColors.primaryTeal, fontWeight: FontWeight.w600)),
                              TextSpan(text: ' e la '),
                              TextSpan(text: 'Privacy Policy', style: TextStyle(color: PetVerseColors.primaryTeal, fontWeight: FontWeight.w600)),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: PetVerseSpacing.l),
                PVButton(
                  label: 'Crea account',
                  fullWidth: true,
                  isLoading: _isLoading,
                  onPressed: _register,
                ),
                const SizedBox(height: PetVerseSpacing.l),
                Center(
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text('Hai già un account? ', style: PetVerseTextStyles.bodyMedium),
                      GestureDetector(
                        onTap: () => context.go('/login'),
                        child: Text('Accedi', style: PetVerseTextStyles.bodyMedium.copyWith(color: PetVerseColors.primaryTeal, fontWeight: FontWeight.w600)),
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
