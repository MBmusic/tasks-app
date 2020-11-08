import React from "react";
import { connect } from "react-redux";
import DataStorage from "../helpers/DataStorage";
import { isEmpty } from "lodash";

function ColorTheme({ children, colorTheme }) {
    const theme = () => {
        const storageData = DataStorage.getData("theme");
        
        if (isEmpty(colorTheme)) {
            return storageData;
        }
        
        return colorTheme;
    };

    return (
        <div className={theme()}>
            { children }
        </div>
    )
};

const mapStateToProps = state => {
    return {
        colorTheme: state.theme.theme
    }
};

export default connect(
    mapStateToProps
)(ColorTheme);