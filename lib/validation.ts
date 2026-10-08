export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('A senha deve ter pelo menos 8 caracteres.');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula.');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula.');
  }

  if (!/\d/.test(password)) {
    errors.push('A senha deve conter pelo menos um número.');
  }

  if (!/[\W_]/.test(password)) {
    errors.push('A senha deve conter pelo menos um caractere especial.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}