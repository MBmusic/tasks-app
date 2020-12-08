import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Translate } from "react-localize-redux";
import { isEmpty, map } from "lodash";
import LangService from "../../services/LangService";
import Loader from "../../customComponents/Loader";
import API from "../../RequestApi";
import RenderMessage from "./components/RenderMessage";
import { InputValidator } from "../../helpers/InputValidator";

function Task(props) {
    const [task, setTask] = useState([]); 
    const [loadTaskName, setLoadTaskName] = useState(false);
    const [loadPosts, setLoadPosts] = useState(false);  
    const [posts, setPosts] = useState("");
    const [post, setPost] = useState({
        author: "",
        message: ""
    });

    const allTextLang = LangService.key().allText;
    const id = props.match.params.id;
    const maxSizeAutor = 30;
    const maxSizeMessage = 150;

    useEffect(() => {
        getTask(); 
        getAllMessagesByPostId();
    }, []);

    const getTask = async () => {
        const responce = await API.get(`/tasks/task/${id}`);
        setTask(responce.data);
        setLoadTaskName(true);
    }

    const getAllMessagesByPostId = async () => {
        const responce = await API.get(`/messages/${id}`);       
        setPosts(responce.data);
        setLoadPosts(true);
    };

    const handleChangeField = (event, field) => {
        const maxCountField = field === "author" ? maxSizeAutor : maxSizeMessage;
        const value = event.target.value;

        setPost(prevValue => {
            return {
                ...prevValue, 
                [field]: InputValidator(prevValue[field], value, maxCountField)
            }
        });
    }

    const addMessage = (event) => {
        event.preventDefault();

        API.post("/messages", {
            id_post: id,
            author: post.author.trim(),
            message: post.message.trim()
        }).then(response => setPosts(arr => [...arr, response.data]));

        setPost({
            author: "",
            message: ""
        });
    }

    const deleteMessage = (deleteId) => {
        API.delete(`/messages/${deleteId}`).then(() => {
            const messagesList = posts.filter(item => item._id !== deleteId);
            setPosts(messagesList);
        });
    };

    const messagesReverse = () => {
        return [...posts].reverse();
    }

    const renderMessages = (translate) => {
        if (!posts.length) {
            return (
                <div className="text--center">
                    {translate}
                </div>
            )
        } else {
            return (
                map(messagesReverse(), (item, i) => {
                    return (
                        <RenderMessage 
                            key = {i}
                            item = {item}
                            deleteMessage = {deleteMessage}
                        />
                    )
                })
            )
        }
    }

    const toggleActiveBtn = () => {
        return isEmpty(post.author) || isEmpty(post.message);
    }

    return (
        <Translate>
            {({translate}) => {
                return (
                    <Loader load = {loadTaskName}>
                        <div className="flex--row_between-center margin--bottom_30">
                            <span className="title-text">
                                {task.title}
                            </span>

                            <span onClick = {() => props.history.push(`/`)} className="btn-floating waves-effect waves-light">
                                <i className="material-icons">arrow_back</i>
                            </span>
                        </div>

                        <div className="margin--bottom_30">
                            <Loader load = {loadPosts}>
                                {renderMessages(translate(`${allTextLang}_empty_data`))}
                            </Loader>
                        </div>

                        <form onSubmit = { addMessage } className="form-message">
                            <div className="form-create__label label">
                                <div className="input-field col s6">
                                    <input 
                                        id="author" 
                                        type="text" 
                                        value = {post.author}
                                        onChange = {(event) => handleChangeField(event, "author")}
                                    />
                                    <label htmlFor="author" className = {isEmpty(post.author) ? "" : "active"}>{translate(`${allTextLang}_task_message_author`)}</label>
                                    <span className="input-field__length">{post.author.length}/{maxSizeAutor}</span>
                                </div>
                            </div>

                            <div className="form-create__label label margin--bottom_40">
                                <div className="input-field col s6">
                                    <input 
                                        id="message" 
                                        type="text" 
                                        value = {post.message}
                                        onChange = {(event) => handleChangeField(event, "message")}
                                    />
                                    <label htmlFor="message" className = {isEmpty(post.message) ? "" : "active"}>{translate(`${allTextLang}_task_message_message`)}</label>
                                    <span className="input-field__length">{post.message.length}/{maxSizeMessage}</span>
                                </div>
                            </div>

                            <div className="text--center">
                                <button className={`form-create__button waves-effect waves-light btn ${toggleActiveBtn() ? "disabled" : ""}`}>
                                    {translate(`${allTextLang}_task_message_btn`)}
                                </button>
                            </div>
                        </form>
                    </Loader>
                )
            }}
        </Translate>
    )
}

export default withRouter(Task);