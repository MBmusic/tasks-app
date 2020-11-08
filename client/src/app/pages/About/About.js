import React from "react";
import { Translate } from "react-localize-redux";
import LangService from "../../services/LangService";

function About() {
    const allTextLang = LangService.key().allText;

    return (
        <Translate>
            {({translate}) => {
                return (
                    <React.Fragment>
                        <div className="title-text">
                            {translate(`${allTextLang}_about_title`)}
                        </div>

                        <div className="border-block">
                            {translate(`${allTextLang}_about_text`)} github: <a href="https://github.com/MBmusic" target="__blank">MBmusic</a>
                        </div>
                    </React.Fragment>
                )
            }}
        </Translate>
    )
}

export default About;