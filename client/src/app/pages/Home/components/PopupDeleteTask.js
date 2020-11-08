import React from "react";
import { Translate } from "react-localize-redux";
import LangService from "../../../services/LangService";

function PopupDeleteTask(props) {
    const popupDeleteLang = LangService.key().popupDelete;

    return (
        <Translate>
            {({translate}) => {
                return (
                    <React.Fragment>
                        <div className="popup-title text--center margin--bottom_30">
                            {translate(`${popupDeleteLang}_title`)}
                        </div>

                        <div className="flex--row_center-center">
                            <span onClick = {() => props.closePopup(null, false)} className="waves-effect waves-light btn btn--140">
                                {translate(`${popupDeleteLang}_cancel`)}
                            </span>

                            <span onClick = {() => props.deleteTask()} className="waves-effect waves-light btn btn--140 margin--left_20">
                                {translate(`${popupDeleteLang}_delete`)}
                            </span>
                        </div>
                    </React.Fragment>
                )
            }}
        </Translate>
    )
}

export default PopupDeleteTask;