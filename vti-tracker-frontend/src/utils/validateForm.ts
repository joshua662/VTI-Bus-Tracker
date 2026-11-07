export function validateLoginForm(username, password) {
  const errors = {};
  if (!username || !username.trim()) {
    errors.username = ["Username is required."];
  }
  if (!password) {
    errors.password = ["Password is required."];
  } else if (password.length < 4) {
    errors.password = ["Password must be at least 4 characters."];
  }
  return errors;
}
