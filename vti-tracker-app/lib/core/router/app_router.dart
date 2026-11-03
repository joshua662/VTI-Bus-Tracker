import 'package:flutter/material.dart';
import '../../models/user_model.dart';
import '../../screens/auth/login_screen.dart';
import '../../screens/main/main_screen.dart';
import '../../screens/splash/splash_screen.dart';
import '../../screens/users/create_user_screen.dart';
import '../../screens/users/edit_user_screen.dart';
import '../../screens/users/view_user_screen.dart';

class AppRouter {
  AppRouter._();

  static const String splash = '/';
  static const String login = '/login';
  static const String main = '/main';
  static const String createUser = '/users/create';
  static const String editUser = '/users/edit';
  static const String viewUser = '/users/view';

  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case splash:
        return MaterialPageRoute(builder: (_) => const SplashScreen());
      case login:
        return MaterialPageRoute(builder: (_) => const LoginScreen());
      case main:
        return MaterialPageRoute(builder: (_) => const MainScreen());
      case createUser:
        return MaterialPageRoute(builder: (_) => const CreateUserScreen());
      case editUser:
        final user = settings.arguments as UserModel;
        return MaterialPageRoute(builder: (_) => EditUserScreen(user: user));
      case viewUser:
        final user = settings.arguments as UserModel;
        return MaterialPageRoute(builder: (_) => ViewUserScreen(user: user));
      default:
        return MaterialPageRoute(
          builder: (_) => Scaffold(
            body: Center(
              child: Text('No route defined for ${settings.name}'),
            ),
          ),
        );
    }
  }
}
