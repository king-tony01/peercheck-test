"use client";
import React, { useState } from "react";
import styles from "./styles/Input.module.css";

function TextInput({
  value,
  placeholder = "Placeholder here",
  onChange,
  type = "text",
  disabled = false,
  readOnly = false,
  maxLength,
  className,
  style,
  prefixIcon,
  suffixIcon,
  error,
  warning,
  label,
  helperText,
  onFocus,
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const hasError = !!error;
  const hasWarning = !!warning && !hasError;

  const wrapperClass = [
    styles.text_input_wrapper,
    isFocused && styles.focused,
    hasError && styles.error,
    hasWarning && styles.warning,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClass} style={style}>
      {label && (
        <label htmlFor={`text-input-${label}`} className={styles.label}>
          {label}
          {error && <span className={styles.error_icon}>*</span>}
        </label>
      )}

      <div className={styles.input_container}>
        {prefixIcon && <span className={styles.prefix_icon}>{prefixIcon}</span>}

        <input
          id={`text-input-${label}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          className={styles.input}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `error-${label}`
              : hasWarning
                ? `warning-${label}`
                : undefined
          }
        />

        {suffixIcon && <span className={styles.suffix_icon}>{suffixIcon}</span>}

        {maxLength && value && (
          <span className={styles.char_count}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      {(error || warning || helperText) && (
        <div className={styles.feedback_container}>
          {error && (
            <span
              id={`error-${label}`}
              className={styles.error_message}
              role="alert"
            >
              {error}
            </span>
          )}
          {warning && !error && (
            <span
              id={`warning-${label}`}
              className={styles.warning_message}
              role="alert"
            >
              {warning}
            </span>
          )}
          {helperText && !error && (
            <span className={styles.helper_text}>{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default TextInput;
