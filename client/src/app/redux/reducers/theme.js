import * as actions from "../actionTypes"; 

const initialState = {
    theme: ""
}

export const theme = (state = initialState, action) => {
    switch (action.type) {
        case actions.CHANGE_THEME:
            return {
                ...state,
                theme: action.theme
            }
        default:
            return state
    }
}
