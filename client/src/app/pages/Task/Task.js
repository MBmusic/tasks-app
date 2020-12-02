import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Loader from "../../customComponents/Loader";
import API from "../../RequestApi";
import RenderMessage from "./components/RenderMessage";

function Task(props) {
    const [task, setTask] = useState([]); 
    const [loadData, setLoadData] = useState(false); 
    const id = props.match.params.id;

    useEffect(() => {
        getTask(); 
    }, []);

    const getTask = async () => {
        const responce = await API.get(`/tasks/task/${id}`);
        setTask(responce.data);
        setLoadData(true);
    }

    return (
        <Loader load = {loadData}>
            <div className="flex--row_between-center margin--bottom_30">
                <span className="title-text">
                    {task.title}
                </span>

                <span onClick = {() => props.history.push(`/`)} className="btn-floating waves-effect waves-light">
                    <i className="material-icons">arrow_back</i>
                </span>
            </div>

            <div className="margin--bottom_30">
                <RenderMessage />
            </div>

            <form className="form-message">
                <div className="form-create__label label">
                    <div className="input-field col s6">
                        <input 
                            id="author" 
                            type="text" 
                            value = {"test"}
                        />
                        <label htmlFor="author">test</label>
                        <span className="input-field__length">test</span>
                    </div>
                </div>

                <div className="form-create__label label margin--bottom_40">
                    <div className="input-field col s6">
                        <input 
                            id="message" 
                            type="text" 
                            value = {"test"}
                        />
                        <label htmlFor="message">test</label>
                        <span className="input-field__length">test</span>
                    </div>
                </div>

                <div className="text--center">
                    <button className={`form-create__button waves-effect waves-light btn`}>
                        Добавить комментарий
                    </button>
                </div>
            </form>
        </Loader>
    )
}

export default withRouter(Task);