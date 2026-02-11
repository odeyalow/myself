import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import enAuth from "../locales/en/auth.json";
import enCommon from "../locales/en/common.json";
import enHome from "../locales/en/home.json";
import enKnowing from "../locales/en/knowing.json";
import enProfile from "../locales/en/profile.json";
import enSearch from "../locales/en/search.json";
import enWelcome from "../locales/en/welcome.json";

import ruAuth from "../locales/ru/auth.json";
import ruCommon from "../locales/ru/common.json";
import ruHome from "../locales/ru/home.json";
import ruKnowing from "../locales/ru/knowing.json";
import ruProfile from "../locales/ru/profile.json";
import ruSearch from "../locales/ru/search.json";
import ruWelcome from "../locales/ru/welcome.json";

import kkAuth from "../locales/kk/auth.json";
import kkCommon from "../locales/kk/common.json";
import kkHome from "../locales/kk/home.json";
import kkKnowing from "../locales/kk/knowing.json";
import kkProfile from "../locales/kk/profile.json";
import kkSearch from "../locales/kk/search.json";
import kkWelcome from "../locales/kk/welcome.json";

const resources = {
  en: {
    auth: enAuth,
    common: enCommon,
    home: enHome,
    knowing: enKnowing,
    profile: enProfile,
    search: enSearch,
    welcome: enWelcome,
  },
  ru: {
    auth: ruAuth,
    common: ruCommon,
    home: ruHome,
    knowing: ruKnowing,
    profile: ruProfile,
    search: ruSearch,
    welcome: ruWelcome,
  },
  kk: {
    auth: kkAuth,
    common: kkCommon,
    home: kkHome,
    knowing: kkKnowing,
    profile: kkProfile,
    search: kkSearch,
    welcome: kkWelcome,
  },
} as const;

const supportedLngs = ["en", "ru", "kk"] as const;

const deviceLanguage = (() => {
  const locales = Localization.getLocales();
  const languageCode = locales?.[0]?.languageCode;
  return languageCode ?? "ru";
})();

const initialLanguage = supportedLngs.includes(deviceLanguage as (typeof supportedLngs)[number])
  ? deviceLanguage
  : "ru";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLanguage,
      fallbackLng: "en",
      supportedLngs: [...supportedLngs],
      ns: ["auth", "common", "home", "knowing", "profile", "search", "welcome"],
      defaultNS: "common",
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
