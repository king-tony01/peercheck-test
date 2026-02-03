export interface PercentageFormatOptions {
  decimals?: number;
  locale?: string;
  showSymbol?: boolean;
  symbolPosition?: "before" | "after";
  multiplier?: number;
  fallback?: string;
  showSign?: boolean;
}

export class PercentageFormatter {
  static format(
    value: number | null | undefined,
    options: PercentageFormatOptions = {},
  ): string {
    const {
      decimals = 2,
      locale = "en-US",
      showSymbol = true,
      symbolPosition = "after",
      multiplier = 100,
      fallback = "—",
      showSign = false,
    } = options;

    if (value === null || value === undefined || isNaN(value)) {
      return fallback;
    }

    const percentValue = value * multiplier;
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      signDisplay: showSign ? "exceptZero" : "auto",
    }).format(percentValue);

    if (!showSymbol) {
      return formatted;
    }

    return symbolPosition === "before" ? `%${formatted}` : `${formatted}%`;
  }

  static formatWhole(
    value: number | null | undefined,
    options: PercentageFormatOptions = {},
  ): string {
    return PercentageFormatter.format(value, { ...options, decimals: 0 });
  }

  static formatChange(
    value: number | null | undefined,
    options: PercentageFormatOptions = {},
  ): string {
    return PercentageFormatter.format(value, { ...options, showSign: true });
  }

  static formatRange(
    min: number | null | undefined,
    max: number | null | undefined,
    options: PercentageFormatOptions = {},
  ): string {
    const minFormatted = PercentageFormatter.format(min, options);
    const maxFormatted = PercentageFormatter.format(max, options);

    if (minFormatted === (options.fallback || "—")) {
      return maxFormatted;
    }

    if (maxFormatted === (options.fallback || "—")) {
      return minFormatted;
    }

    return `${minFormatted} - ${maxFormatted}`;
  }

  static toDecimal(percentValue: number): number {
    return percentValue / 100;
  }

  static fromDecimal(decimalValue: number): number {
    return decimalValue * 100;
  }
}
