import * as actions from "./actionTypes"

export function changeTheme(theme) {
    return {
        type: actions.CHANGE_THEME,
        theme
    }
}