/**
 * Simple translation hook.
 * All strings live in data.json under "translations.en" (or other locale).
 * Usage:  const t = useTranslation();  t('app.title') => "UK Mental Health System"
 */
import { useMemo } from 'react';
import rawData from '../data/data.json';

type Locale = keyof typeof rawData.translations;

export function useTranslation(locale: Locale = 'en') {
  const dict = rawData.translations[locale] as Record<string, string>;

  return useMemo(
    () =>
      (key: string): string =>
        dict[key] ?? key,
    [dict]
  );
}
