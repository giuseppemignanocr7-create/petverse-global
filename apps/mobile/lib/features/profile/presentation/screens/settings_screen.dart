import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _pushNotifications = true;
  bool _emailNotifications = true;
  bool _vaccineReminders = true;
  bool _appointmentReminders = true;
  bool _medicationReminders = true;
  bool _communityUpdates = true;
  bool _marketplaceDeals = false;
  String _profileVisibility = 'private';
  bool _showPetsInCommunity = false;
  String _language = 'it';
  String _theme = 'system';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Impostazioni')),
      body: ListView(
        children: [
          _sectionHeader('Notifiche'),
          SwitchListTile(
            title: const Text('Notifiche push'),
            subtitle: const Text('Ricevi notifiche sul dispositivo'),
            value: _pushNotifications,
            onChanged: (v) => setState(() => _pushNotifications = v),
            activeColor: PetVerseColors.primaryTeal,
          ),
          SwitchListTile(
            title: const Text('Notifiche email'),
            subtitle: const Text('Ricevi aggiornamenti via email'),
            value: _emailNotifications,
            onChanged: (v) => setState(() => _emailNotifications = v),
            activeColor: PetVerseColors.primaryTeal,
          ),
          SwitchListTile(
            title: const Text('Promemoria vaccini'),
            value: _vaccineReminders,
            onChanged: (v) => setState(() => _vaccineReminders = v),
            activeColor: PetVerseColors.primaryTeal,
          ),
          SwitchListTile(
            title: const Text('Promemoria appuntamenti'),
            value: _appointmentReminders,
            onChanged: (v) => setState(() => _appointmentReminders = v),
            activeColor: PetVerseColors.primaryTeal,
          ),
          SwitchListTile(
            title: const Text('Promemoria farmaci'),
            value: _medicationReminders,
            onChanged: (v) => setState(() => _medicationReminders = v),
            activeColor: PetVerseColors.primaryTeal,
          ),
          SwitchListTile(
            title: const Text('Aggiornamenti community'),
            value: _communityUpdates,
            onChanged: (v) => setState(() => _communityUpdates = v),
            activeColor: PetVerseColors.primaryTeal,
          ),
          SwitchListTile(
            title: const Text('Offerte marketplace'),
            value: _marketplaceDeals,
            onChanged: (v) => setState(() => _marketplaceDeals = v),
            activeColor: PetVerseColors.primaryTeal,
          ),
          _sectionHeader('Privacy'),
          ListTile(
            title: const Text('Visibilità profilo'),
            subtitle: Text(_profileVisibility == 'private' ? 'Privato' : 'Pubblico'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => _showProfileVisibilityDialog(),
          ),
          SwitchListTile(
            title: const Text('Mostra pet nella community'),
            value: _showPetsInCommunity,
            onChanged: (v) => setState(() => _showPetsInCommunity = v),
            activeColor: PetVerseColors.primaryTeal,
          ),
          _sectionHeader('Aspetto'),
          ListTile(
            title: const Text('Lingua'),
            subtitle: Text(_language == 'it' ? 'Italiano' : 'English'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => _showLanguageDialog(),
          ),
          ListTile(
            title: const Text('Tema'),
            subtitle: Text(_theme == 'system' ? 'Sistema' : _theme == 'light' ? 'Chiaro' : 'Scuro'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => _showThemeDialog(),
          ),
          _sectionHeader('Dati'),
          ListTile(
            title: const Text('Pulisci cache'),
            leading: const Icon(Icons.cleaning_services),
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Cache pulita')),
              );
            },
          ),
          _sectionHeader('Account'),
          ListTile(
            title: Text('Elimina account', style: TextStyle(color: PetVerseColors.error)),
            leading: Icon(Icons.delete_forever, color: PetVerseColors.error),
            onTap: () => _showDeleteAccountDialog(),
          ),
          const SizedBox(height: PetVerseSpacing.xxl),
        ],
      ),
    );
  }

  Widget _sectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(PetVerseSpacing.m, PetVerseSpacing.l, PetVerseSpacing.m, PetVerseSpacing.xs),
      child: Text(title, style: PetVerseTextStyles.labelLarge.copyWith(color: PetVerseColors.primaryTeal)),
    );
  }

  void _showProfileVisibilityDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Visibilità profilo'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            RadioListTile<String>(
              title: const Text('Privato'),
              subtitle: const Text('Solo tu puoi vedere il profilo'),
              value: 'private',
              groupValue: _profileVisibility,
              onChanged: (v) { setState(() => _profileVisibility = v!); Navigator.pop(ctx); },
            ),
            RadioListTile<String>(
              title: const Text('Pubblico'),
              subtitle: const Text('Visibile nella community'),
              value: 'public',
              groupValue: _profileVisibility,
              onChanged: (v) { setState(() => _profileVisibility = v!); Navigator.pop(ctx); },
            ),
          ],
        ),
      ),
    );
  }

  void _showLanguageDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Lingua'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            RadioListTile<String>(title: const Text('Italiano'), value: 'it', groupValue: _language, onChanged: (v) { setState(() => _language = v!); Navigator.pop(ctx); }),
            RadioListTile<String>(title: const Text('English'), value: 'en', groupValue: _language, onChanged: (v) { setState(() => _language = v!); Navigator.pop(ctx); }),
          ],
        ),
      ),
    );
  }

  void _showThemeDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Tema'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            RadioListTile<String>(title: const Text('Sistema'), value: 'system', groupValue: _theme, onChanged: (v) { setState(() => _theme = v!); Navigator.pop(ctx); }),
            RadioListTile<String>(title: const Text('Chiaro'), value: 'light', groupValue: _theme, onChanged: (v) { setState(() => _theme = v!); Navigator.pop(ctx); }),
            RadioListTile<String>(title: const Text('Scuro'), value: 'dark', groupValue: _theme, onChanged: (v) { setState(() => _theme = v!); Navigator.pop(ctx); }),
          ],
        ),
      ),
    );
  }

  void _showDeleteAccountDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Elimina account'),
        content: const Text('Sei sicuro di voler eliminare il tuo account? Questa azione è irreversibile e tutti i tuoi dati verranno cancellati.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Annulla')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: PetVerseColors.error),
            onPressed: () {
              Navigator.pop(ctx);
              context.go('/login');
            },
            child: const Text('Elimina', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }
}
