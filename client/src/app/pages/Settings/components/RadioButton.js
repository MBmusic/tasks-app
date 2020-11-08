import React from "react";

const RadioButton = ({ 
    nameTheme = "", 
    selectedTheme = "", 
    changeClick = () => {}, 
    translateText = "" }) => {
        
    return (
        <p>
            <label>
                <input 
                    name="color-theme" 
                    className={`radio--${nameTheme}`} 
                    type="radio"
                    value={nameTheme}
                    checked = { selectedTheme === nameTheme && "checked" } 
                    onChange = {changeClick}
                />
                <span>{translateText}</span>
            </label>
        </p>
    )
}

export default RadioButton;