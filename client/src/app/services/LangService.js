import * as Loc from 'react-localize-redux';
import { map } from "lodash";
import { allLang, allKeyLang } from "../lang";
import { renderToStaticMarkup } from "react-dom/server";
import DataStorage from "../helpers/DataStorage";

const LangService = (() => {
    const lang_error = "lang_error";
    const LANG_RU = "ru";
    const LANG_UA = "ua";
    const LANG_EN = "en";
    const languages = [LANG_RU, LANG_UA, LANG_EN];
    let _store = null;
    const langKey = {};

    return {
        init(store) {
            _store = store;

            _store.dispatch(Loc.initialize({
                languages: [
                    { name: "Русский", code: "ru" },
                    { name: "Українська", code: "ua" },
                    { name: "English", code: "en" }
                ],
                translation: {},
                options: { renderToStaticMarkup, onMissingTranslation: () => {
                    return lang_error;
                }},
            }));

            allLang.map(item => {
                this.addTranslation(item);
            });

            allKeyLang.map((item) => {
                map(item, (value, key) => {
                    langKey[key] = value;
                });
            });

            if (DataStorage.getData('locale') === null) {
                this.setActiveLanguage(LANG_RU);
            } else {
                _store.dispatch(Loc.setActiveLanguage(DataStorage.getData('locale')));
            }
        },

        get languages() {
            return languages;
        },

        getLang() {
            let key = LANG_RU;

            if (DataStorage.getData('locale') === null) {
                return key;
            }

            return DataStorage.getData('locale');
        },

        key() {
            return langKey;
        },

        setActiveLanguage(code) {
            if (!(languages.indexOf(code) >= 0)) {
                return false;
            }

            DataStorage.setData('locale', code);
            _store.dispatch(Loc.setActiveLanguage(code));
        },

        addTranslation(localeData) {
            _store.dispatch(Loc.addTranslation(localeData)); 
        }
    }
})();

export default Loc.withLocalize(LangService);