import React, { useState } from "react";
import Select from "react-select";
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import { changeTheme } from "../../redux/actions";
import ThemeService from "../../services/ThemeService";
import LangService from "../../services/LangService";
import RadioButton from "./components/RadioButton";

function Settings({changeTheme}) {
    const [theme, setTheme] = useState(ThemeService.getTheme());
    const [lang, setLang] = useState(LangService.getLang());

    const languages = [
        { label: "Русский", value: "ru" },
        { label: "Українська", value: "ua" },
        { label: "English", value: "en" }
    ];

    const saveSettings = (event) => {
        event.preventDefault();
        changeTheme(theme);
        ThemeService.setThemeToStorage(theme);
        LangService.setActiveLanguage(lang);
    }

    const radioColorChange = (event) => {
        setTheme(event.target.value);
    }

    const selectLangChange = (param) => {
        setLang(param.value);
    }

    const getDefaultLang = () => {
        let defaultLang = {};

        languages.map(item => {
            if (item.value == lang) {
                defaultLang = item
            }
        })

        return defaultLang;
    }

    const allTextLang = LangService.key().allText;

    return (
        <Translate>
            {({translate}) => {
                return (
                    <React.Fragment>
                        <div className="title-text">
                            {translate(`${allTextLang}_settings_title`)}
                        </div>

                        <div className="border-block">
                            <form onSubmit = { saveSettings }>
                                <div className="setting-field flex--row_start-center">
                                    <div className="setting-field__title">
                                        {translate(`${allTextLang}_settings_label_1`)}
                                    </div>

                                    <div className="setting-field__check label">
                                        <Select
                                            isSearchable = { false }
                                            className = "select-field"
                                            classNamePrefix = "select-field__in"
                                            defaultValue = { getDefaultLang() }
                                            options = { languages }
                                            onChange = { selectLangChange }
                                        />
                                    </div>
                                </div>

                                <div className="setting-field setting-field--margin flex--row_start-center">
                                    <div className="setting-field__title">
                                        {translate(`${allTextLang}_settings_label_2`)}
                                    </div>

                                    <div className="setting-field__check">
                                        <div className="flex--column_start-start">
                                            <RadioButton 
                                                nameTheme = "purple-theme"
                                                selectedTheme = {theme}
                                                changeClick = {radioColorChange}
                                                translateText = {translate(`${allTextLang}_settings_color_1`)}
                                            />
                                            <RadioButton 
                                                nameTheme = "blue-theme"
                                                selectedTheme = {theme}
                                                changeClick = {radioColorChange}
                                                translateText = {translate(`${allTextLang}_settings_color_2`)}
                                            />
                                            <RadioButton 
                                                nameTheme = "grey-theme"
                                                selectedTheme = {theme}
                                                changeClick = {radioColorChange}
                                                translateText = {translate(`${allTextLang}_settings_color_3`)}
                                            />
                                            <RadioButton 
                                                nameTheme = "aqua-theme"
                                                selectedTheme = {theme}
                                                changeClick = {radioColorChange}
                                                translateText = {translate(`${allTextLang}_settings_color_4`)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="setting-field flex--row_start-center">
                                    <div className="setting-field__title"></div>
                                    <div className="setting-field__check">
                                        <button className="form-create__button waves-effect waves-light btn" type="submit">
                                            {translate(`${allTextLang}_settings_button_save`)}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </React.Fragment>
                )
            }}
        </Translate>
    )
}

const mapDispatchToProps = {
    changeTheme
};

export default connect(
    null,
    mapDispatchToProps
)(Settings);