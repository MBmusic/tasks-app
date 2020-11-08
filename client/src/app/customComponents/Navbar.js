import React from "react";
import { NavLink } from "react-router-dom";
import { Translate } from "react-localize-redux";
import LangService from "../services/LangService";

function Navbar() {
    const allTextLang = LangService.key().allText;

    return (
        <Translate>
            {({translate}) => {
                return (       
                    <nav className="nav-bar">
                        <div className="content-center">
                            <div className="nav-wrapper flex--row_between-center">
                                <ul className="hide-on-med-and-down">
                                    <li>
                                        <NavLink to="/" exact>
                                            {translate(`${allTextLang}_home_title`)}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/about" activeClassName='active'>
                                            {translate(`${allTextLang}_about_title`)}
                                        </NavLink>
                                    </li>
                                </ul>

                                <ul className="hide-on-med-and-down">
                                    <li>
                                        <NavLink to="/settings" activeClassName='active'>
                                            <i className="settings-icon material-icons">settings</i>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                )
            }}
        </Translate>
    )
}

export default Navbar;