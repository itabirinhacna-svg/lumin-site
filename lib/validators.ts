const VALID_PAYMENT_METHODS = new Set(["pix", "card", "boleto"]);
const DEMO_EMAIL = "demo@benthec.com";
const DEMO_PASSWORD = "123456";

export type CheckoutPayload = {
  planId: string;
  name: string;
  email: string;
  document: string;
  password: string;
  paymentMethod: string;
  coupon?: string;
  acceptTerms: boolean;
};

export function sanitizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function normalizeEmail(email: string) {
  return sanitizeText(email).toLowerCase();
}

export function normalizeDocument(document: string) {
  return document.replace(/\D/g, "");
}

export function isStrongPassword(password: string) {
  if (password.length < 8) {
    return false;
  }

  return /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidCpf(cpf: string) {
  const clean = normalizeDocument(cpf);

  if (clean.length !== 11 || /^(\d)\1+$/.test(clean)) {
    return false;
  }

  const digits = clean.split("").map(Number);

  const checkDigit = (length: number) => {
    const total = digits.slice(0, length).reduce((sum, digit, index) => {
      return sum + digit * (length + 1 - index);
    }, 0);

    const remainder = (total * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return checkDigit(9) === digits[9] && checkDigit(10) === digits[10];
}

export function validateCheckoutPayload(input: CheckoutPayload) {
  const errors: string[] = [];

  if (!input.planId) {
    errors.push("Plano invalido.");
  }

  if (sanitizeText(input.name).length < 5) {
    errors.push("Informe nome completo.");
  }

  if (!isValidEmail(input.email)) {
    errors.push("E-mail invalido.");
  }

  if (!isValidCpf(input.document)) {
    errors.push("CPF invalido.");
  }

  if (!isStrongPassword(input.password)) {
    errors.push("A senha deve ter 8+ caracteres, com letra maiuscula, minuscula e numero.");
  }

  if (!VALID_PAYMENT_METHODS.has(input.paymentMethod)) {
    errors.push("Forma de pagamento invalida.");
  }

  if (!input.acceptTerms) {
    errors.push("Aceite os termos e a politica de privacidade.");
  }

  return errors;
}

export function validateLoginPayload(email: string, password: string) {
  const errors: string[] = [];

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return errors;
  }

  if (!isValidEmail(email)) {
    errors.push("E-mail invalido.");
  }

  if (password.length < 8) {
    errors.push("Senha invalida.");
  }

  return errors;
}
