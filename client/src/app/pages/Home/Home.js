import React, { useState, useEffect } from "react";
import { Translate } from "react-localize-redux";
import LangService from "../../services/LangService";
import { InputValidator } from "../../helpers/InputValidator";
import { isEmpty, map } from "lodash";
import API from "../../RequestApi";
import RenderTask from "./components/RenderTask";
import Loader from "../../customComponents/Loader";
import Popup from "../../customComponents/Popup";
import PopupDeleteTask from "./components/PopupDeleteTask";
import PopupUpdateTask from "./components/PopupUpdateTask";

function Home() {
    const [title, setTitle] = useState(""); 
    const [tasks, setTasks] = useState("");
    const [messages, setMessages] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [errorField, setErrorField] = useState(false);

    // Update Task
    const [popupUpdateToggle, setPopupUpdateToggle] = useState(false);
    const [updateTaks, setUpdateTask] = useState(null);

    // Delete Task
    const [popupDeleteToggle, setPopupDeleteToggle] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const allTextLang = LangService.key().allText;
    const maxSize = 50;

    const handleChangeField = (event) => {
        const value = event.target.value;
        setTitle(prevValue => InputValidator(prevValue, value, maxSize));
    };

    useEffect(() => {
        getAllTasks(); 
        getAllMessages();
    }, []);

    const getAllTasks = async () => {
        const responce = await API.get("/tasks");       
        setTasks(responce.data);
        setLoadData(true);
    };

    const getAllMessages = async () => {
        const responce = await API.get("/messages");       
        setMessages(responce.data);
    };

    const addTask = (event) => {
        event.preventDefault();
        const delSpacesTitle = title.trim();
        let titleExists = false;

        if (!isEmpty(tasks)) {
            tasks.forEach(element => {
                if (element.title === delSpacesTitle) {
                    titleExists = true;
                    setErrorField(true);
                }
            });
        }

        if (!titleExists) {
            API.post("/tasks", {
                title: delSpacesTitle
            }).then(response => setTasks(arr => [...arr, response.data]));

            setErrorField(false);
            setTitle("");
        } 
    };

    const deleteTask = () => {
        API.delete(`/tasks/${deleteId}`).then(() => {
            const tasksList = tasks.filter(item => item._id !== deleteId);
            API.delete(`/messages/post/${deleteId}`);
            
            setTasks(tasksList);
        });
        
        setPopupDeleteToggle(false);
    };

    const toggleDelete = (id, boolVal) => {
        setPopupDeleteToggle(boolVal);
        setDeleteId(id);
    }

    const toggleUpdate = (taskData, boolVal) => {
        setPopupUpdateToggle(boolVal);
        setUpdateTask(taskData);
    }

    const tasksReverse = () => {
        return [...tasks].reverse();
    }

    const renderTasks = (translate) => {
        const allTextLang = LangService.key().allText; 
        let resultForEverPost = null;

        if (!tasks.length) {
            return (
                <li className="text--center">
                    {translate(`${allTextLang}_empty_data`)}
                </li>
            )
        } else {
            return (
                map(tasksReverse(), (item, i) => {
                    resultForEverPost = messages.filter(mess => mess.id_post === item._id);

                    return (
                        <RenderTask 
                            key = {i}
                            item = {item}
                            toggleUpdate = {toggleUpdate}
                            toggleDelete = {toggleDelete}
                            resultForEverPost = {resultForEverPost}
                            translate = {translate}
                            allTextLang = {allTextLang}
                        />
                    )
                })
            )
        }
    }

    return (
        <Translate>
            {({translate}) => {
                return (
                    <React.Fragment>
                        <Popup
                            show = {popupUpdateToggle}
                            className = "popup__modal--400"
                        >
                            <PopupUpdateTask 
                                selectedTask = {updateTaks}
                                closePopup = {toggleUpdate}
                                maxSize = {maxSize}
                                tasks = {tasks}
                                setTasks = {setTasks}
                            />
                        </Popup>
                        
                        <Popup 
                            show = {popupDeleteToggle}
                            className = "popup__modal--400"
                        >
                            <PopupDeleteTask
                                deleteTask = {deleteTask}
                                closePopup = {toggleDelete}
                            />
                        </Popup> 
                        
                        <div className="title-text">
                            {translate(`${allTextLang}_home_title`)}
                        </div>

                        <div className="border-block">
                            {errorField && 
                                <div className="error">
                                    {translate(`${allTextLang}_home_input_error`)}
                                </div>
                            }
                            
                            <form onSubmit = { addTask } className="form-create flex--row_between-center">
                                <div className="form-create__label label">
                                    <div className="input-field col s6">
                                        <input 
                                            id="title" 
                                            type="text" 
                                            value = {title}
                                            onChange = {(event) => handleChangeField(event)}
                                        />
                                        <label htmlFor="title" className = {isEmpty(title) ? "" : "active"}>{translate(`${allTextLang}_home_input`)}</label>
                                        <span className="input-field__length">{title.length}/{maxSize}</span>
                                    </div>
                                </div>

                                <button className={`form-create__button waves-effect waves-light btn ${isEmpty(title) ? "disabled" : ""}`}>
                                    {translate(`${allTextLang}_home_button_add`)}
                                </button>
                            </form>

                            <Loader
                                load = {loadData}
                            >
                                <ul className="collection">
                                    {renderTasks(translate)}
                                </ul>
                            </Loader>
                        </div>
                    </React.Fragment>
                )
            }}
        </Translate>
    )
}

export default Home;