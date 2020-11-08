import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "./sass/app.scss";

ReactDOM.render(
    <App />, 
    document.getElementById('tasks-app')
);
