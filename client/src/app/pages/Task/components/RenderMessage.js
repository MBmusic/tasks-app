import React from "react";
import avatar from "../../../../images/avatar.png";

function RenderMessage(props) {
    return (
        <div className="message flex--row_between-start">
            <div className="message__main flex--row_start-start">
                <div className="message__avatar">
                    <img src = {avatar} alt=""/>
                </div>

                <div className="message__post">
                    <div className="message__author">
                        { props.item.author }
                    </div>
                    <div className="message__text">
                        { props.item.message }
                    </div>
                </div>
            </div>

            <div className="message__date">
                2020 year
            </div>
        </div>
    )
}

export default RenderMessage;