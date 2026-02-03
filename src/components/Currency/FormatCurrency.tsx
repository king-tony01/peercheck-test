import styles from "./styles/FormatCurrency.module.css";

function FormatCurrency({
  value,
  currency = "USD",
  locale = "en-US",
  compact = false,
  showCurrencyCode = false,
  showFraction = true,
  showSign = false,
  fallback = "—",
  className,
  title,
  minimumFractionDigits,
  maximumFractionDigits,
  currencyDisplay,
  signDisplay,
  useGrouping = true,
  notation,
  useCurrencySymbol = false,
  size = "md",
  emphasis = "normal",
}: FormatCurrencyProps) {
  const numericValue =
    typeof value === "string" ? Number(value) : (value ?? undefined);

  if (numericValue === undefined || Number.isNaN(numericValue)) {
    return (
      <span className={`${styles.format_currency} ${styles.fallback}`}>
        {fallback}
      </span>
    );
  }

  const resolvedSignDisplay = showSign ? "always" : signDisplay;
  const resolvedNotation = notation ?? (compact ? "compact" : "standard");
  const isNgn = currency.toUpperCase() === "NGN";
  const currencySymbol = useCurrencySymbol ? "₦" : "N";
  const signPrefix = numericValue < 0 ? "-" : showSign ? "+" : "";
  const absoluteValue = Math.abs(numericValue);

  const classNames = [
    styles.format_currency,
    styles[size],
    styles[emphasis],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (isNgn) {
    const compactUnits = [
      { value: 1_000_000_000, suffix: "B" },
      { value: 1_000_000, suffix: "M" },
      { value: 1_000, suffix: "k" },
    ];

    const unit = compactUnits.find((item) => absoluteValue >= item.value);
    const resolvedMinFractionDigits =
      minimumFractionDigits ?? (showFraction ? 2 : 0);
    const resolvedMaxFractionDigits =
      maximumFractionDigits ?? (showFraction ? 2 : 0);

    if (compact && unit) {
      const compactValue = absoluteValue / unit.value;
      const compactMin = minimumFractionDigits ?? 0;
      const compactMax =
        maximumFractionDigits ?? (showFraction && compactValue < 10 ? 1 : 0);
      const compactFormatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: compactMin,
        maximumFractionDigits: compactMax,
        useGrouping: false,
      });

      const compactText = compactFormatter.format(compactValue);

      return (
        <span
          className={classNames}
          title={
            title ??
            `${signPrefix}${currencySymbol}${compactText}${unit.suffix}`
          }
          aria-label={`${signPrefix}${currencySymbol}${compactText}${unit.suffix}`}
        >
          <span className={styles.integer}>
            {signPrefix}
            {currencySymbol}
            {compactText}
            {unit.suffix}
          </span>
          {showCurrencyCode ? (
            <span className={styles.code_badge}>{currency.toUpperCase()}</span>
          ) : null}
        </span>
      );
    }

    const numberFormatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: resolvedMinFractionDigits,
      maximumFractionDigits: resolvedMaxFractionDigits,
      useGrouping,
    });
    const numberText = numberFormatter.format(absoluteValue);

    return (
      <span
        className={classNames}
        title={title ?? `${signPrefix}${currencySymbol}${numberText}`}
        aria-label={`${signPrefix}${currencySymbol}${numberText}`}
      >
        <span className={styles.integer}>
          {signPrefix}
          {currencySymbol}
          {numberText}
        </span>
        {showCurrencyCode ? (
          <span className={styles.code_badge}>{currency.toUpperCase()}</span>
        ) : null}
      </span>
    );
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: currencyDisplay ?? "symbol",
    signDisplay: resolvedSignDisplay,
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
    notation: resolvedNotation,
  });

  const formatted = formatter.format(numericValue);
  const parts = formatter.formatToParts(numericValue);

  const firstNumberIndex = parts.findIndex((part) => part.type === "integer");
  const lastNumberIndex = (() => {
    for (let index = parts.length - 1; index >= 0; index -= 1) {
      if (parts[index].type === "fraction" || parts[index].type === "integer") {
        return index;
      }
    }
    return firstNumberIndex;
  })();

  const leading =
    firstNumberIndex > 0
      ? parts
          .slice(0, firstNumberIndex)
          .map((part) => part.value)
          .join("")
      : "";

  const trailing =
    lastNumberIndex >= 0 && lastNumberIndex < parts.length - 1
      ? parts
          .slice(lastNumberIndex + 1)
          .map((part) => part.value)
          .join("")
      : "";

  const integer = parts
    .filter((part) => part.type === "integer" || part.type === "group")
    .map((part) => part.value)
    .join("");

  const decimal = parts.find((part) => part.type === "decimal")?.value ?? "";
  const fraction = parts.find((part) => part.type === "fraction")?.value ?? "";
  const fractionText = decimal && fraction ? `${decimal}${fraction}` : "";

  return (
    <span
      className={classNames}
      title={title ?? formatted}
      aria-label={formatted}
    >
      {leading ? <span className={styles.leading}>{leading}</span> : null}
      <span className={styles.integer}>{integer}</span>
      {showFraction && fractionText ? (
        <span className={styles.fraction}>{fractionText}</span>
      ) : null}
      {trailing ? <span className={styles.trailing}>{trailing}</span> : null}
      {showCurrencyCode ? (
        <span className={styles.code_badge}>{currency.toUpperCase()}</span>
      ) : null}
    </span>
  );
}

export default FormatCurrency;
