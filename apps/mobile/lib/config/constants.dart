class AppConstants {
  static const String appName = 'PetVerse';
  static const String appVersion = '4.0.0';

  static const String apiBaseUrl = 'http://localhost:3000/api/v1';

  static const int apiTimeout = 30000;
  static const int maxPetsFreeTier = 2;
  static const int maxMediaPerEntry = 10;
  static const int maxChatHistoryLength = 50;

  static const String tokenKey = 'access_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userKey = 'cached_user';

  static const List<String> supportedSpecies = [
    'dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'reptile', 'other',
  ];

  static const Map<String, String> speciesItalian = {
    'dog': 'Cane',
    'cat': 'Gatto',
    'bird': 'Uccello',
    'rabbit': 'Coniglio',
    'hamster': 'Criceto',
    'fish': 'Pesce',
    'reptile': 'Rettile',
    'other': 'Altro',
  };

  static const Map<String, String> speciesEmoji = {
    'dog': '\u{1F436}',
    'cat': '\u{1F431}',
    'bird': '\u{1F426}',
    'rabbit': '\u{1F430}',
    'hamster': '\u{1F439}',
    'fish': '\u{1F41F}',
    'reptile': '\u{1F98E}',
    'other': '\u{1F43E}',
  };
}
