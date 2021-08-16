import * as path from 'path';
import NextI18next from 'next-i18next';
import cookies from 'js-cookie';

export const nextI18next = new NextI18next({
  defaultLanguage: cookies.get('next-i18next') || 'en',
  defaultNS: 'common',
  fallbackLng: cookies.get('next-i18next') || 'en',
  localePath: path.resolve('./locales'),
  otherLanguages: ['fr', 'en', 'vi'].filter(lang => lang !== (cookies.get('next-i18next') || 'en')),
  interpolation: {
    escapeValue: false,
  },
  strictMode: false,
});

export const {
  appWithTranslation,
  Trans,
  useTranslation,
  withTranslation,
  i18n,
} = nextI18next;

