export interface CardType {
    id: string,
    title: string;
    ticket_ids: string[]
}

export interface TicketType {
    id: string;
    title: string;
    description: string;
}

export interface BoardState {
    cards: CardType[];
    tickets: TicketType[]
}

export interface Action {
    type: string;
    payload?: any;
}

export const ActionTypes = {
    FETCH_DATA: "FETCH_DATA",
    ADD_CARD: "ADD_CARD",
    DELETE_CARD: "DELETE_CARD",
    ADD_TICKET: "ADD_TICKET",
    EDIT_TICKET: "EDIT_TICKET",
    DELETE_TICKET: "DELETE_TICKET",
    MOVE_TICKET: "MOVE_TICKET",
};

export const FormActionTypes = {
    SET_DATA: 'SET_DATA',
    SET_POPUP_TITLE: 'SET_POPUP_TITLE',
    SET_TYPE: 'SET_TYPE',
    SET_TITLE: 'SET_TITLE',
    SET_DESCRIPTION: 'SET_DESCRIPTION',
    SET_CARD: 'SET_CARD',
    SET_TICKET_ID: 'SET_TICKET_ID',
    RESET_FORM: 'RESET_FORM'
}

export type Align = "left" | "right" | "center";

export interface FormState {
    popupTitle: string;
    type: string;
    title: string;
    description: string;
    card: string;
    ticketId: string;
}

export type Types = "create-card" | "create-ticket" | "edit-ticket";

export const DragItemTypes = {
    Ticket: "Ticket"
};

export interface DragData {
    ticketId: string;
    cardId: string;
}