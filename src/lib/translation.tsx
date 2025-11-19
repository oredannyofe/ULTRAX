import React from "react";

// Lightweight stand-ins for Lingui's macros so that we always render
// the original English copy and avoid hashed ids like "07iJX7" in
// production builds.

// <Trans> simply renders its children as-is.
export const Trans: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => <>{children}</>;

// `t` behaves like a minimal template tag: it just interpolates values
// into the string without any localization.
export function t(strings: TemplateStringsArray | string, ...values: any[]): string {
  if (typeof strings === "string") {
    return strings;
  }

  let result = "";
  strings.forEach((str, i) => {
    result += str;
    if (i < values.length) {
      result += String(values[i]);
    }
  });
  return result;
}

// Very small plural helper used in a few places. It picks a sensible
// branch based on `value`, defaulting to `other`.
export type PluralProps = {
  value: number;
  one?: React.ReactNode;
  other?: React.ReactNode;
  zero?: React.ReactNode;
  few?: React.ReactNode;
  many?: React.ReactNode;
};

export const Plural: React.FC<PluralProps> = ({ value, one, other, zero, few, many }) => {
  let choice: React.ReactNode | undefined = other;

  if (value === 0 && zero !== undefined) {
    choice = zero;
  } else if (value === 1 && one !== undefined) {
    choice = one;
  } else if (value > 1 && many !== undefined) {
    choice = many;
  } else if (few !== undefined) {
    choice = few;
  }

  return <>{choice}</>;
};
