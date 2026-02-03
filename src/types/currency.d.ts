type FormatCurrencySize = "sm" | "md" | "lg";

type FormatCurrencyEmphasis = "normal" | "strong";

interface FormatCurrencyProps {
  value: number | string | null | undefined;
  currency?: string;
  locale?: string;
  compact?: boolean;
  showCurrencyCode?: boolean;
  showFraction?: boolean;
  /** When true for NGN, use the ₦ symbol instead of the plain 'N' */
  useCurrencySymbol?: boolean;
  showSign?: boolean;
  fallback?: string;
  className?: string;
  title?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  currencyDisplay?: Intl.NumberFormatOptions["currencyDisplay"];
  signDisplay?: Intl.NumberFormatOptions["signDisplay"];
  useGrouping?: boolean;
  notation?: Intl.NumberFormatOptions["notation"];
  size?: FormatCurrencySize;
  emphasis?: FormatCurrencyEmphasis;
}
