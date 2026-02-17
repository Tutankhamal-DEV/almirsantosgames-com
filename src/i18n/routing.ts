import { defineRouting } from 'next-intl/routing';

export const locales = [
    'pt', 'en', 'es', 'fr', 'it', 'de', 'nl',
    'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'tr', 'pl',
] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
    locales,
    defaultLocale: 'pt',
});
