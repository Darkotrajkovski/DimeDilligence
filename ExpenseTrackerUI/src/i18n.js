import i18next from "i18next";
import {initReactI18next} from "react-i18next";

import en from './translations/en.json';
import mk from './translations/mk.json';
import de from './translations/de.json';

i18next.use(initReactI18next).init({
    fallbackLng: 'en',
    resources: {
        en: {
            translation: en
        },
        mk: {
            translation: mk
        },
        de: {
            translation: de
        }
    }
})