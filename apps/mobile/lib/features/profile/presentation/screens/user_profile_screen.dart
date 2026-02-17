import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';

class UserProfileScreen extends StatelessWidget {
  const UserProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profilo'),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => context.push('/settings'),
          ),
        ],
      ),
      body: ListView(
        children: [
          // Profile header
          Container(
            padding: const EdgeInsets.all(PetVerseSpacing.l),
            child: Column(
              children: [
                const CircleAvatar(
                  radius: 50,
                  backgroundColor: PetVerseColors.primaryTealLight,
                  child: Icon(Icons.person, size: 50, color: Colors.white),
                ),
                const SizedBox(height: PetVerseSpacing.m),
                Text('Utente PetVerse', style: PetVerseTextStyles.headlineLarge),
                Text(
                  'utente@petverse.app',
                  style: PetVerseTextStyles.bodyMedium.copyWith(color: PetVerseColors.neutralGray600),
                ),
                const SizedBox(height: PetVerseSpacing.m),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: PetVerseColors.secondaryBeige,
                    borderRadius: BorderRadius.circular(PetVerseRadius.full),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.star, size: 16, color: PetVerseColors.primaryTealDark),
                      const SizedBox(width: 4),
                      Text('Free Plan', style: PetVerseTextStyles.labelMedium.copyWith(color: PetVerseColors.primaryTealDark)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const Divider(),
          // Stats
          Padding(
            padding: const EdgeInsets.all(PetVerseSpacing.m),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _statColumn('0', 'Pet'),
                _statColumn('0', 'Diari'),
                _statColumn('0', 'Gruppi'),
              ],
            ),
          ),
          const Divider(),
          // Menu items
          _menuSection('Account', [
            _menuItem(Icons.person_outline, 'Modifica profilo', () {}),
            _menuItem(Icons.lock_outline, 'Cambio password', () {}),
            _menuItem(Icons.notifications_outlined, 'Notifiche', () {}),
          ]),
          _menuSection('Abbonamento', [
            _menuItem(Icons.workspace_premium, 'Passa a Premium', () {}, trailing: _premiumBadge()),
            _menuItem(Icons.receipt_long, 'Cronologia ordini', () {}),
          ]),
          _menuSection('Dati & Privacy', [
            _menuItem(Icons.download, 'Esporta dati (GDPR)', () {}),
            _menuItem(Icons.privacy_tip_outlined, 'Privacy Policy', () {}),
            _menuItem(Icons.description_outlined, 'Termini di servizio', () {}),
          ]),
          _menuSection('Supporto', [
            _menuItem(Icons.help_outline, 'Centro assistenza', () {}),
            _menuItem(Icons.bug_report_outlined, 'Segnala un bug', () {}),
            _menuItem(Icons.info_outline, 'Informazioni app', () {}),
          ]),
          const SizedBox(height: PetVerseSpacing.m),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: PetVerseSpacing.l),
            child: OutlinedButton.icon(
              onPressed: () {
                // TODO: Logout
                context.go('/login');
              },
              icon: const Icon(Icons.logout, color: PetVerseColors.error),
              label: Text('Esci', style: TextStyle(color: PetVerseColors.error)),
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: PetVerseColors.error),
                padding: const EdgeInsets.symmetric(vertical: 14),
              ),
            ),
          ),
          const SizedBox(height: PetVerseSpacing.m),
          Center(
            child: Text(
              'PetVerse v4.0.0',
              style: PetVerseTextStyles.labelSmall.copyWith(color: PetVerseColors.neutralGray500),
            ),
          ),
          const SizedBox(height: PetVerseSpacing.xxl),
        ],
      ),
    );
  }

  Widget _statColumn(String value, String label) {
    return Column(
      children: [
        Text(value, style: PetVerseTextStyles.headlineLarge),
        Text(label, style: PetVerseTextStyles.labelMedium.copyWith(color: PetVerseColors.neutralGray600)),
      ],
    );
  }

  Widget _menuSection(String title, List<Widget> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(PetVerseSpacing.l, PetVerseSpacing.m, PetVerseSpacing.l, PetVerseSpacing.xs),
          child: Text(title, style: PetVerseTextStyles.labelLarge.copyWith(color: PetVerseColors.neutralGray500)),
        ),
        ...items,
      ],
    );
  }

  Widget _menuItem(IconData icon, String label, VoidCallback onTap, {Widget? trailing}) {
    return ListTile(
      leading: Icon(icon, color: PetVerseColors.neutralGray700),
      title: Text(label),
      trailing: trailing ?? const Icon(Icons.chevron_right, color: PetVerseColors.neutralGray400),
      onTap: onTap,
    );
  }

  Widget _premiumBadge() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        gradient: const LinearGradient(colors: [PetVerseColors.primaryTeal, PetVerseColors.accentCoral]),
        borderRadius: BorderRadius.circular(PetVerseRadius.full),
      ),
      child: Text('UPGRADE', style: PetVerseTextStyles.labelSmall.copyWith(color: Colors.white, fontSize: 10)),
    );
  }
}
