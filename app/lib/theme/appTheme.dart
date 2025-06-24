import 'package:flutter/material.dart';
import 'colors.dart';

class AppTheme {
  static final lightTheme = ThemeData(
    brightness: Brightness.light,
    primaryColor: LightColors.primary,
    scaffoldBackgroundColor: LightColors.primaryBackground,
    colorScheme: ColorScheme.light(
      primary: LightColors.primary,
      background: LightColors.primaryBackground,
      onBackground: LightColors.primaryText,
    ),
    textTheme: const TextTheme(
      bodyMedium: TextStyle(color: LightColors.primaryText),
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: LightColors.primary,
      foregroundColor: LightColors.primaryText,
    ),
  );

  static final darkTheme = ThemeData(
    brightness: Brightness.dark,
    primaryColor: DarkColors.primary,
    scaffoldBackgroundColor: DarkColors.primaryBackground,
    colorScheme: ColorScheme.dark(
      primary: DarkColors.primary,
      background: DarkColors.primaryBackground,
      onBackground: DarkColors.primaryText,
    ),
    textTheme: const TextTheme(
      bodyMedium: TextStyle(color: DarkColors.primaryText),
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: DarkColors.primary,
      foregroundColor: DarkColors.primaryText,
    ),
  );
}
