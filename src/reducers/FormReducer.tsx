import { Action, FormActionTypes, FormState } from "../types";

export const formReducer = (state: FormState, action: Action) => {
    switch (action.type) {
        case FormActionTypes.SET_DATA:
            return { ...state, ...action.payload };

        case FormActionTypes.SET_POPUP_TITLE:
            return { ...state, popupTitle: action.payload.popupTitle };

        case FormActionTypes.SET_TYPE:
            return { ...state, type: action.payload.type };

        case FormActionTypes.SET_TITLE:
            return { ...state, title: action.payload.title };

        case FormActionTypes.SET_DESCRIPTION:
            return { ...state, description: action.payload.description };

        case FormActionTypes.SET_CARD:
            return { ...state, card: action.payload.card };

        case FormActionTypes.SET_TICKET_ID:
            return { ...state, ticketId: action.payload.ticketId };

        case FormActionTypes.RESET_FORM:
            return { popupTitle: "", type: "", title: "", description: "", card: "", ticketId: "" };

        default:
            return { ...state };
    }
}