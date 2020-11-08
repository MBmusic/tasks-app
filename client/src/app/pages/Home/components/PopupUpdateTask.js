import React, { useState } from "react";
import { Translate } from "react-localize-redux";
import LangService from "../../../services/LangService";
import { InputValidator } from "../../../helpers/InputValidator";
import API from "../../../RequestApi";
import { isEmpty } from "lodash";

function PopupUpdateTask(props) {
    const [newTitle, setNewTitle] = useState(props.selectedTask.title);
    const [errorField, setErrorField] = useState(false);
    
    const allTextLang = LangService.key().allText;
    const popupUpdateLang = LangService.key().popupUpdate;
    const tasks = props.tasks;

    const updateTask = (event) => {
        event.preventDefault();
        const value = newTitle.trim();
        const selected = props.selectedTask;

        if (value === selected.title) {
            props.closePopup(null, false);
            return;
        } 

        if (checkTask(value)) {
            selected.title = newTitle;

            API.patch(`/tasks/${selected._id}`, {
                title: value
            }).then(() => {
                const res = tasks.map(item => item._id === selected._id ? selected : item);
                props.setTasks(res);
            });
            
            setErrorField(false);
            props.closePopup();
        } else {
            setErrorField(true);
        }
    }

    const checkTask = (value) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].title === value) {
                return false;
            }
        }

        return true;
    }

    const handleChangeField = (event) => {
        const value = event.target.value;
        setNewTitle(prevValue => InputValidator(prevValue, value, props.maxSize));
    };

    return (
        <Translate>
            {({translate}) => {
                return (
                    <React.Fragment>
                        <div className="popup-title text--center margin--bottom_30">
                            {translate(`${popupUpdateLang}_title`)}
                        </div>

                        {errorField && 
                            <div className="error">
                                {translate(`${allTextLang}_home_input_error`)}
                            </div>
                        }

                        <form onSubmit = {updateTask}>
                            <div className="label margin--bottom_30">
                                <div className="input-field col s6">
                                    <input 
                                        id="title-edit" 
                                        type="text" 
                                        value = {newTitle}
                                        onChange = {(event) => handleChangeField(event)}
                                    />
                                    <label htmlFor="title-edit"></label>
                                    <span className="input-field__length">{newTitle.length}/{props.maxSize}</span>
                                </div>
                            </div>

                            <div className="flex--row_center-center">
                                <span onClick = {() => props.closePopup(null, false)} className="waves-effect waves-light btn btn--140">
                                    {translate(`${popupUpdateLang}_cancel`)}
                                </span>

                                <button className={`waves-effect waves-light btn btn--140 margin--left_20 ${isEmpty(newTitle) ? "disabled" : ""}`}>
                                    {translate(`${popupUpdateLang}_save`)}
                                </button>
                            </div>
                        </form>
                    </React.Fragment>
                )
            }}
        </Translate>
    )
}

export default PopupUpdateTask;