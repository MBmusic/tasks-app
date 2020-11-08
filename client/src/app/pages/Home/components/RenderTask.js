import React from "react";
import { NavLink } from "react-router-dom";

function RenderTask(props) {
    return (
        <React.Fragment>
            <li key = {props.id} className="collection-item flex--row_between-center">
                <NavLink to = {`/task/${props.item._id}`} className="collection-item__text">
                    <div>{props.item.title}</div>
                </NavLink>

                <div className="collection__buttons flex--row_end-center">
                    <span onClick = {() => props.toggleUpdate(props.item, true)} className="btn-floating waves-effect waves-light">
                        <i className="material-icons">edit</i>
                    </span>

                    <span onClick = {() => props.toggleDelete(props.item._id, true)} className="btn-floating waves-effect waves-light">
                        <i className="material-icons">delete</i>
                    </span>
                </div>
            </li>
        </React.Fragment>
    )
}

export default RenderTask;