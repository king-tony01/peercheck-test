export type PasswordValidationResult = {
  isValid: boolean;
  errors: string[];
};

export class PasswordValidator {
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_LENGTH = 128;
  private static readonly UPPERCASE_REGEX = /[A-Z]/;
  private static readonly LOWERCASE_REGEX = /[a-z]/;
  private static readonly DIGIT_REGEX = /\d/;
  private static readonly SPECIAL_REGEX =
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  static validate(input: string): PasswordValidationResult {
    const errors: string[] = [];

    if (!input) {
      return { isValid: false, errors: ["Password is required."] };
    }

    if (input.length < PasswordValidator.MIN_LENGTH) {
      errors.push(
        `Password must be at least ${PasswordValidator.MIN_LENGTH} characters long.`,
      );
    }

    if (input.length > PasswordValidator.MAX_LENGTH) {
      errors.push(
        `Password must not exceed ${PasswordValidator.MAX_LENGTH} characters.`,
      );
    }

    if (!PasswordValidator.UPPERCASE_REGEX.test(input)) {
      errors.push("Password must contain at least one uppercase letter.");
    }

    if (!PasswordValidator.LOWERCASE_REGEX.test(input)) {
      errors.push("Password must contain at least one lowercase letter.");
    }

    if (!PasswordValidator.DIGIT_REGEX.test(input)) {
      errors.push("Password must contain at least one digit.");
    }

    if (!PasswordValidator.SPECIAL_REGEX.test(input)) {
      errors.push("Password must contain at least one special character.");
    }

    return { isValid: errors.length === 0, errors };
  }

  static isValid(input: string): boolean {
    return PasswordValidator.validate(input).isValid;
  }

  static getStrength(input: string): "weak" | "medium" | "strong" {
    if (!input) return "weak";

    let strengthScore = 0;

    if (input.length >= PasswordValidator.MIN_LENGTH) strengthScore++;
    if (input.length >= 12) strengthScore++;
    if (PasswordValidator.UPPERCASE_REGEX.test(input)) strengthScore++;
    if (PasswordValidator.LOWERCASE_REGEX.test(input)) strengthScore++;
    if (PasswordValidator.DIGIT_REGEX.test(input)) strengthScore++;
    if (PasswordValidator.SPECIAL_REGEX.test(input)) strengthScore++;

    if (strengthScore <= 2) return "weak";
    if (strengthScore <= 4) return "medium";
    return "strong";
  }
}
