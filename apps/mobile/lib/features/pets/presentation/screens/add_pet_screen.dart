import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';
import '../../../../config/constants.dart';
import '../../../../shared/widgets/pv_button.dart';
import '../../../../shared/widgets/pv_text_field.dart';

class AddPetScreen extends StatefulWidget {
  const AddPetScreen({super.key});

  @override
  State<AddPetScreen> createState() => _AddPetScreenState();
}

class _AddPetScreenState extends State<AddPetScreen> {
  int _currentStep = 0;
  final _nameController = TextEditingController();
  final _breedController = TextEditingController();
  final _microchipController = TextEditingController();
  final _weightController = TextEditingController();
  String _selectedSpecies = 'dog';
  String _selectedSex = 'male';
  DateTime? _birthdate;
  bool _isSubmitting = false;

  @override
  void dispose() {
    _nameController.dispose();
    _breedController.dispose();
    _microchipController.dispose();
    _weightController.dispose();
    super.dispose();
  }

  Future<void> _savePet() async {
    if (_nameController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Il nome è obbligatorio')),
      );
      return;
    }
    setState(() => _isSubmitting = true);
    await Future.delayed(const Duration(seconds: 1));
    if (!mounted) return;
    setState(() => _isSubmitting = false);
    context.pop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Aggiungi pet'),
        leading: const BackButton(),
      ),
      body: Column(
        children: [
          LinearProgressIndicator(
            value: (_currentStep + 1) / 4,
            backgroundColor: PetVerseColors.neutralGray200,
            color: PetVerseColors.primaryTeal,
          ),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(PetVerseSpacing.l),
              child: _buildStep(),
            ),
          ),
          _buildNavigation(),
        ],
      ),
    );
  }

  Widget _buildStep() {
    switch (_currentStep) {
      case 0:
        return _buildStep1Photo();
      case 1:
        return _buildStep2BasicInfo();
      case 2:
        return _buildStep3AdditionalInfo();
      case 3:
        return _buildStep4HealthInfo();
      default:
        return const SizedBox();
    }
  }

  Widget _buildStep1Photo() {
    return Column(
      children: [
        Text('Foto del tuo pet', style: PetVerseTextStyles.headlineLarge),
        const SizedBox(height: PetVerseSpacing.s),
        Text('Aggiungi una foto del tuo amico', style: PetVerseTextStyles.bodyMedium.copyWith(color: PetVerseColors.neutralGray600)),
        const SizedBox(height: PetVerseSpacing.xl),
        GestureDetector(
          onTap: () {/* TODO: Image picker */},
          child: Container(
            width: 160,
            height: 160,
            decoration: BoxDecoration(
              color: PetVerseColors.neutralGray100,
              shape: BoxShape.circle,
              border: Border.all(color: PetVerseColors.neutralGray300, width: 2, style: BorderStyle.solid),
            ),
            child: const Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.camera_alt, size: 40, color: PetVerseColors.neutralGray500),
                SizedBox(height: 8),
                Text('Aggiungi foto', style: TextStyle(color: PetVerseColors.neutralGray500)),
              ],
            ),
          ),
        ),
        const SizedBox(height: PetVerseSpacing.m),
        Text('Puoi aggiungere la foto anche dopo', style: PetVerseTextStyles.labelMedium.copyWith(color: PetVerseColors.neutralGray500)),
      ],
    );
  }

  Widget _buildStep2BasicInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Dati base', style: PetVerseTextStyles.headlineLarge),
        const SizedBox(height: PetVerseSpacing.l),
        PVTextField(label: 'Nome', hint: 'Come si chiama?', controller: _nameController, prefixIcon: const Icon(Icons.pets)),
        const SizedBox(height: PetVerseSpacing.m),
        Text('Specie', style: PetVerseTextStyles.labelLarge),
        const SizedBox(height: PetVerseSpacing.s),
        Wrap(
          spacing: PetVerseSpacing.s,
          runSpacing: PetVerseSpacing.s,
          children: AppConstants.supportedSpecies.map((species) {
            final isSelected = _selectedSpecies == species;
            return ChoiceChip(
              label: Text('${AppConstants.speciesEmoji[species]} ${AppConstants.speciesItalian[species]}'),
              selected: isSelected,
              onSelected: (_) => setState(() => _selectedSpecies = species),
              selectedColor: PetVerseColors.primaryTeal,
              labelStyle: TextStyle(color: isSelected ? Colors.white : null),
            );
          }).toList(),
        ),
        const SizedBox(height: PetVerseSpacing.m),
        PVTextField(label: 'Razza', hint: 'Es. Labrador Retriever', controller: _breedController),
        const SizedBox(height: PetVerseSpacing.m),
        Text('Sesso', style: PetVerseTextStyles.labelLarge),
        const SizedBox(height: PetVerseSpacing.s),
        Row(
          children: [
            Expanded(
              child: ChoiceChip(label: const Text('Maschio'), selected: _selectedSex == 'male', onSelected: (_) => setState(() => _selectedSex = 'male')),
            ),
            const SizedBox(width: PetVerseSpacing.s),
            Expanded(
              child: ChoiceChip(label: const Text('Femmina'), selected: _selectedSex == 'female', onSelected: (_) => setState(() => _selectedSex = 'female')),
            ),
          ],
        ),
        const SizedBox(height: PetVerseSpacing.m),
        Text('Data di nascita', style: PetVerseTextStyles.labelLarge),
        const SizedBox(height: PetVerseSpacing.s),
        GestureDetector(
          onTap: () async {
            final date = await showDatePicker(
              context: context,
              initialDate: DateTime.now().subtract(const Duration(days: 365)),
              firstDate: DateTime(2000),
              lastDate: DateTime.now(),
            );
            if (date != null) setState(() => _birthdate = date);
          },
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              color: PetVerseColors.neutralGray100,
              borderRadius: BorderRadius.circular(PetVerseRadius.m),
            ),
            child: Row(
              children: [
                const Icon(Icons.calendar_today, color: PetVerseColors.neutralGray500),
                const SizedBox(width: 12),
                Text(
                  _birthdate != null ? '${_birthdate!.day}/${_birthdate!.month}/${_birthdate!.year}' : 'Seleziona data',
                  style: TextStyle(color: _birthdate != null ? null : PetVerseColors.neutralGray500),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildStep3AdditionalInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Dati aggiuntivi', style: PetVerseTextStyles.headlineLarge),
        const SizedBox(height: PetVerseSpacing.l),
        PVTextField(label: 'Microchip', hint: 'Numero microchip', controller: _microchipController, prefixIcon: const Icon(Icons.qr_code)),
        const SizedBox(height: PetVerseSpacing.m),
        PVTextField(label: 'Peso (kg)', hint: 'Es. 12.5', controller: _weightController, keyboardType: TextInputType.number, prefixIcon: const Icon(Icons.monitor_weight)),
      ],
    );
  }

  Widget _buildStep4HealthInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Dati sanitari', style: PetVerseTextStyles.headlineLarge),
        const SizedBox(height: PetVerseSpacing.s),
        Text('Puoi aggiungere questi dati anche in seguito', style: PetVerseTextStyles.bodyMedium.copyWith(color: PetVerseColors.neutralGray600)),
        const SizedBox(height: PetVerseSpacing.xl),
        const Center(child: Icon(Icons.check_circle_outline, size: 80, color: PetVerseColors.success)),
        const SizedBox(height: PetVerseSpacing.m),
        Center(child: Text('Tutto pronto!', style: PetVerseTextStyles.headlineMedium)),
        const SizedBox(height: PetVerseSpacing.s),
        Center(child: Text('Puoi completare il profilo sanitario in qualsiasi momento.', style: PetVerseTextStyles.bodyMedium.copyWith(color: PetVerseColors.neutralGray600), textAlign: TextAlign.center)),
      ],
    );
  }

  Widget _buildNavigation() {
    return Container(
      padding: const EdgeInsets.all(PetVerseSpacing.m),
      decoration: BoxDecoration(
        color: Theme.of(context).scaffoldBackgroundColor,
        boxShadow: PetVerseElevation.level2,
      ),
      child: Row(
        children: [
          if (_currentStep > 0)
            Expanded(
              child: PVButton(
                label: 'Indietro',
                variant: PVButtonVariant.secondary,
                onPressed: () => setState(() => _currentStep--),
              ),
            ),
          if (_currentStep > 0) const SizedBox(width: PetVerseSpacing.m),
          Expanded(
            child: PVButton(
              label: _currentStep == 3 ? 'Salva' : 'Avanti',
              isLoading: _isSubmitting,
              onPressed: () {
                if (_currentStep < 3) {
                  setState(() => _currentStep++);
                } else {
                  _savePet();
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}
