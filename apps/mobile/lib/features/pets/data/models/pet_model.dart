class PetModel {
  final String id;
  final String ownerId;
  final String name;
  final String species;
  final String? breed;
  final String? breedCategory;
  final String? sex;
  final DateTime? birthdate;
  final int? estimatedAgeMonths;
  final String? microchipNumber;
  final String? pedigreeNumber;
  final List<double> weightKg;
  final List<DateTime> weightRecordedAt;
  final double? heightCm;
  final String? coatColor;
  final String? coatType;
  final String? distinctiveMarks;
  final String? avatarUrl;
  final List<String>? galleryUrls;
  final String? insuranceProvider;
  final String? insurancePolicyNumber;
  final DateTime? insuranceExpiry;
  final String status;
  final DateTime createdAt;

  const PetModel({
    required this.id,
    required this.ownerId,
    required this.name,
    required this.species,
    this.breed,
    this.breedCategory,
    this.sex,
    this.birthdate,
    this.estimatedAgeMonths,
    this.microchipNumber,
    this.pedigreeNumber,
    this.weightKg = const [],
    this.weightRecordedAt = const [],
    this.heightCm,
    this.coatColor,
    this.coatType,
    this.distinctiveMarks,
    this.avatarUrl,
    this.galleryUrls,
    this.insuranceProvider,
    this.insurancePolicyNumber,
    this.insuranceExpiry,
    this.status = 'active',
    required this.createdAt,
  });

  factory PetModel.fromJson(Map<String, dynamic> json) {
    return PetModel(
      id: json['id'] as String,
      ownerId: json['ownerId'] as String,
      name: json['name'] as String,
      species: json['species'] as String,
      breed: json['breed'] as String?,
      breedCategory: json['breedCategory'] as String?,
      sex: json['sex'] as String?,
      birthdate: json['birthdate'] != null
          ? DateTime.parse(json['birthdate'] as String)
          : null,
      estimatedAgeMonths: json['estimatedAgeMonths'] as int?,
      microchipNumber: json['microchipNumber'] as String?,
      pedigreeNumber: json['pedigreeNumber'] as String?,
      weightKg: (json['weightKg'] as List<dynamic>?)
              ?.map((e) => (e as num).toDouble())
              .toList() ??
          [],
      weightRecordedAt: (json['weightRecordedAt'] as List<dynamic>?)
              ?.map((e) => DateTime.parse(e as String))
              .toList() ??
          [],
      heightCm: (json['heightCm'] as num?)?.toDouble(),
      coatColor: json['coatColor'] as String?,
      coatType: json['coatType'] as String?,
      distinctiveMarks: json['distinctiveMarks'] as String?,
      avatarUrl: json['avatarUrl'] as String?,
      galleryUrls: (json['galleryUrls'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      insuranceProvider: json['insuranceProvider'] as String?,
      insurancePolicyNumber: json['insurancePolicyNumber'] as String?,
      insuranceExpiry: json['insuranceExpiry'] != null
          ? DateTime.parse(json['insuranceExpiry'] as String)
          : null,
      status: json['status'] as String? ?? 'active',
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'ownerId': ownerId,
      'name': name,
      'species': species,
      'breed': breed,
      'breedCategory': breedCategory,
      'sex': sex,
      'birthdate': birthdate?.toIso8601String(),
      'estimatedAgeMonths': estimatedAgeMonths,
      'microchipNumber': microchipNumber,
      'pedigreeNumber': pedigreeNumber,
      'weightKg': weightKg,
      'weightRecordedAt':
          weightRecordedAt.map((e) => e.toIso8601String()).toList(),
      'heightCm': heightCm,
      'coatColor': coatColor,
      'coatType': coatType,
      'distinctiveMarks': distinctiveMarks,
      'avatarUrl': avatarUrl,
      'galleryUrls': galleryUrls,
      'insuranceProvider': insuranceProvider,
      'insurancePolicyNumber': insurancePolicyNumber,
      'insuranceExpiry': insuranceExpiry?.toIso8601String(),
      'status': status,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  double? get currentWeight =>
      weightKg.isNotEmpty ? weightKg.last : null;

  String get ageDisplay {
    if (birthdate != null) {
      final months = DateTime.now().difference(birthdate!).inDays ~/ 30;
      final years = months ~/ 12;
      final rem = months % 12;
      if (years == 0) return '$months mesi';
      if (rem == 0) return '$years anni';
      return '$years anni e $rem mesi';
    }
    if (estimatedAgeMonths != null) {
      final years = estimatedAgeMonths! ~/ 12;
      final rem = estimatedAgeMonths! % 12;
      if (years == 0) return 'circa $estimatedAgeMonths mesi';
      if (rem == 0) return 'circa $years anni';
      return 'circa $years anni e $rem mesi';
    }
    return 'Età non specificata';
  }
}
