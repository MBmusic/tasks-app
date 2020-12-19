import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import { LocalizeProvider } from "react-localize-redux";
import { withLocalize } from "react-localize-redux";
import DataStorage from "./helpers/DataStorage";
import LangService from "./services/LangService";
import ThemeService from "./services/ThemeService";
import Navbar from "./customComponents/Navbar";
import ColorTheme from "./customComponents/ColorTheme";

// Store
import { store } from "./redux/store";

// Pages
import Home from "./pages/Home/Home";
import About from './pages/About/About';
import Settings from './pages/Settings/Settings';
import Task from './pages/Task/Task';

function App() {
    DataStorage.init();
    ThemeService.init(store);
    LangService.init(store);

    return (
        <React.Fragment>
            <Provider store = { store }>
                <LocalizeProvider store = { store }>
                    <BrowserRouter> 
                        <ColorTheme>
                            <Navbar />

                            <div className="content">
                                <div className="content-center pd--top_40">
                                    <Switch>
                                        <Route path={'/'} exact component={Home}/>
                                        <Route path={'/about'} component={About}/>
                                        <Route path={'/settings'} component={Settings}/>
                                        <Route path={'/task/:id'} component={Task}/>
                                    </Switch>
                                </div>
                            </div>
                        </ColorTheme>         
                    </BrowserRouter>
                </LocalizeProvider>
            </Provider>
        </React.Fragment>
    );
}

export default withLocalize(App);
