import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/app_strings.dart';
import '../../core/router/app_router.dart';
import '../../core/utils/toast_helper.dart';
import '../../providers/user_provider.dart';
import '../../widgets/app_loading.dart';
import '../../widgets/user_card.dart';

class UsersScreen extends ConsumerWidget {
  const UsersScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final usersAsync = ref.watch(usersListProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text(AppStrings.usersTitle),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              ref.invalidate(usersListProvider);
            },
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, AppRouter.createUser);
        },
        child: const Icon(Icons.add),
      ),
      body: usersAsync.when(
        data: (users) {
          if (users.isEmpty) {
            return Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.people_outline, size: 64, color: Colors.grey),
                  const SizedBox(height: 12),
                  const Text(
                    AppStrings.noUsersFound,
                    style: TextStyle(color: Colors.grey, fontSize: 16),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {
                      ref.invalidate(usersListProvider);
                    },
                    child: const Text('Reload'),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () async {
              ref.invalidate(usersListProvider);
              await ref.read(usersListProvider.future);
            },
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(vertical: 8),
              itemCount: users.length,
              itemBuilder: (context, index) {
                final user = users[index];
                return UserCard(
                  user: user,
                  onTap: () {
                    Navigator.pushNamed(
                      context,
                      AppRouter.viewUser,
                      arguments: user,
                    );
                  },
                  onEdit: () {
                    Navigator.pushNamed(
                      context,
                      AppRouter.editUser,
                      arguments: user,
                    );
                  },
                  onDelete: () async {
                    if (user.id == null) return;
                    try {
                      await ref.read(userServiceProvider).deleteUser(user.id!);
                      if (context.mounted) {
                        ToastHelper.showSuccess(context, 'User deleted');
                      }
                      ref.invalidate(usersListProvider);
                    } catch (e) {
                      if (context.mounted) {
                        ToastHelper.showError(context, 'Failed to delete: $e');
                      }
                    }
                  },
                );
              },
            ),
          );
        },
        loading: () => const AppLoading(message: 'Loading users...'),
        error: (err, stack) => Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.error_outline, size: 48, color: Colors.red),
                const SizedBox(height: 12),
                Text(
                  'Failed to load users: $err',
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Colors.grey),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    ref.invalidate(usersListProvider);
                  },
                  child: const Text(AppStrings.retry),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
