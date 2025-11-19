import { i18n } from "@lingui/core";
import { en, es, zh, ko, ru, ja, fr, de } from "make-plural/plurals";
import { LANGUAGE_LOCALSTORAGE_KEY } from "config/localStorage";
import { isDevelopment } from "config/env";

// uses BCP-47 codes from https://unicode-org.github.io/cldr-staging/charts/latest/supplemental/language_plural_rules.html
export const locales = {
  en: "English",
  es: "Spanish",
  zh: "Chinese",
  ko: "Korean",
  ru: "Russian",
  ja: "Japanese",
  fr: "French",
  de: "German",
  ...(isDevelopment() && { pseudo: "Test" }),
};

export const defaultLocale = "en";

// Always prefer the source English message from Lingui descriptors so that
// we never render hashed ids like "07iJX7" when catalogs are missing or
// misconfigured. This effectively turns i18n into a no-op that shows the
// original English copy.
const originalTranslate = i18n._.bind(i18n);
(i18n as any)._ = (descriptor: any, ...args: any[]) => {
  if (descriptor && typeof descriptor === "object") {
    if (descriptor.message) {
      return descriptor.message;
    }
    if (descriptor.id) {
      return descriptor.id;
    }
  }
  return originalTranslate(descriptor as any, ...args);
};

i18n.loadLocaleData({
  en: { plurals: en },
  es: { plurals: es },
  zh: { plurals: zh },
  ko: { plurals: ko },
  ru: { plurals: ru },
  ja: { plurals: ja },
  fr: { plurals: fr },
  de: { plurals: de },
  ...(isDevelopment() && { pseudo: { plurals: en } }),
});

export function isTestLanguage(locale: string) {
  return locale === "pseudo";
}

export async function dynamicActivate(locale: string) {
  const { messages } = await import(`@lingui/loader!locales/${locale}/messages.po`);
  if (!isTestLanguage(locale)) {
    localStorage.setItem(LANGUAGE_LOCALSTORAGE_KEY, locale);
  }
  i18n.load(locale, messages);
  i18n.activate(locale);
}
