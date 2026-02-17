import 'package:flutter/material.dart';
import '../../../../config/theme.dart';
import '../../../../shared/widgets/pv_button.dart';
import '../../../../shared/widgets/pv_text_field.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final _emailController = TextEditingController();
  bool _isLoading = false;
  bool _sent = false;

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _sendReset() async {
    if (_emailController.text.isEmpty || !_emailController.text.contains('@')) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Inserisci un\'email valida')),
      );
      return;
    }
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(seconds: 1));
    if (!mounted) return;
    setState(() {
      _isLoading = false;
      _sent = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(leading: const BackButton()),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(PetVerseSpacing.l),
          child: _sent ? _buildSuccess() : _buildForm(),
        ),
      ),
    );
  }

  Widget _buildForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Password dimenticata?', style: PetVerseTextStyles.headlineLarge),
        const SizedBox(height: PetVerseSpacing.s),
        Text(
          'Inserisci la tua email e ti invieremo un link per reimpostare la password.',
          style: PetVerseTextStyles.bodyLarge.copyWith(color: PetVerseColors.neutralGray600),
        ),
        const SizedBox(height: PetVerseSpacing.xl),
        PVTextField(
          label: 'Email',
          hint: 'mario@example.com',
          controller: _emailController,
          keyboardType: TextInputType.emailAddress,
          prefixIcon: const Icon(Icons.email_outlined),
        ),
        const SizedBox(height: PetVerseSpacing.l),
        PVButton(
          label: 'Invia link reset',
          fullWidth: true,
          isLoading: _isLoading,
          onPressed: _sendReset,
        ),
      ],
    );
  }

  Widget _buildSuccess() {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.mark_email_read, size: 80, color: PetVerseColors.success),
          const SizedBox(height: PetVerseSpacing.l),
          Text('Email inviata!', style: PetVerseTextStyles.headlineLarge),
          const SizedBox(height: PetVerseSpacing.s),
          Text(
            'Controlla la tua casella di posta per il link di reset.',
            style: PetVerseTextStyles.bodyLarge.copyWith(color: PetVerseColors.neutralGray600),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: PetVerseSpacing.l),
          PVButton(
            label: 'Torna al login',
            variant: PVButtonVariant.secondary,
            onPressed: () => Navigator.of(context).pop(),
          ),
        ],
      ),
    );
  }
}
