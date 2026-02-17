class UserModel {
  final String id;
  final String email;
  final String fullName;
  final String? avatarUrl;
  final String? phone;
  final bool emailVerified;
  final String subscriptionTier;
  final String? subscriptionStatus;
  final DateTime createdAt;
  final DateTime? lastLoginAt;
  final Map<String, dynamic>? preferences;

  const UserModel({
    required this.id,
    required this.email,
    required this.fullName,
    this.avatarUrl,
    this.phone,
    this.emailVerified = false,
    this.subscriptionTier = 'free',
    this.subscriptionStatus,
    required this.createdAt,
    this.lastLoginAt,
    this.preferences,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] as String,
      email: json['email'] as String,
      fullName: json['fullName'] as String,
      avatarUrl: json['avatarUrl'] as String?,
      phone: json['phone'] as String?,
      emailVerified: json['emailVerified'] as bool? ?? false,
      subscriptionTier: json['subscriptionTier'] as String? ?? 'free',
      subscriptionStatus: json['subscriptionStatus'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      lastLoginAt: json['lastLoginAt'] != null
          ? DateTime.parse(json['lastLoginAt'] as String)
          : null,
      preferences: json['preferences'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'fullName': fullName,
      'avatarUrl': avatarUrl,
      'phone': phone,
      'emailVerified': emailVerified,
      'subscriptionTier': subscriptionTier,
      'subscriptionStatus': subscriptionStatus,
      'createdAt': createdAt.toIso8601String(),
      'lastLoginAt': lastLoginAt?.toIso8601String(),
      'preferences': preferences,
    };
  }

  UserModel copyWith({
    String? fullName,
    String? avatarUrl,
    String? phone,
    bool? emailVerified,
    String? subscriptionTier,
    String? subscriptionStatus,
    Map<String, dynamic>? preferences,
  }) {
    return UserModel(
      id: id,
      email: email,
      fullName: fullName ?? this.fullName,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      phone: phone ?? this.phone,
      emailVerified: emailVerified ?? this.emailVerified,
      subscriptionTier: subscriptionTier ?? this.subscriptionTier,
      subscriptionStatus: subscriptionStatus ?? this.subscriptionStatus,
      createdAt: createdAt,
      lastLoginAt: lastLoginAt,
      preferences: preferences ?? this.preferences,
    );
  }

  bool get isPremium => subscriptionTier == 'premium';
}
