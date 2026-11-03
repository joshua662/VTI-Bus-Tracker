import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/toast_helper.dart';
import '../../models/user_model.dart';
import '../../providers/user_provider.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_input_field.dart';

class EditUserScreen extends ConsumerStatefulWidget {
  final UserModel user;

  const EditUserScreen({super.key, required this.user});

  @override
  ConsumerState<EditUserScreen> createState() => _EditUserScreenState();
}

class _EditUserScreenState extends ConsumerState<EditUserScreen> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _nameController;
  late final TextEditingController _emailController;
  late String _selectedRole;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.user.name);
    _emailController = TextEditingController(text: widget.user.email);
    _selectedRole = widget.user.role ?? 'driver';
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _update() async {
    if (!_formKey.currentState!.validate()) return;
    if (widget.user.id == null) return;

    setState(() => _isLoading = true);
    try {
      await ref.read(userServiceProvider).updateUser(widget.user.id!, {
        'name': _nameController.text.trim(),
        'email': _emailController.text.trim(),
        'role': _selectedRole,
      });

      if (!mounted) return;
      ToastHelper.showSuccess(context, 'User updated successfully');
      ref.invalidate(usersListProvider);
      Navigator.pop(context);
    } catch (e) {
      if (!mounted) return;
      ToastHelper.showError(context, 'Failed to update user: $e');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(AppStrings.editUser),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              AppInputField(
                controller: _nameController,
                label: 'Full Name',
                validator: (val) =>
                    val == null || val.trim().isEmpty ? 'Name is required' : null,
              ),
              const SizedBox(height: 16),
              AppInputField(
                controller: _emailController,
                label: 'Email',
                keyboardType: TextInputType.emailAddress,
                validator: (val) {
                  if (val == null || val.trim().isEmpty) return 'Email is required';
                  if (!val.contains('@')) return 'Enter a valid email';
                  return null;
                },
              ),
              const SizedBox(height: 16),
              const Text(
                'Role',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 6),
              DropdownButtonFormField<String>(
                initialValue: ['driver', 'admin', 'passenger'].contains(_selectedRole)
                    ? _selectedRole
                    : 'driver',
                items: const [
                  DropdownMenuItem(value: 'driver', child: Text('Driver')),
                  DropdownMenuItem(value: 'admin', child: Text('Admin')),
                  DropdownMenuItem(value: 'passenger', child: Text('Passenger')),
                ],
                onChanged: (val) {
                  if (val != null) setState(() => _selectedRole = val);
                },
              ),
              const SizedBox(height: 32),
              AppButton(
                text: AppStrings.save,
                isLoading: _isLoading,
                onPressed: _update,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
