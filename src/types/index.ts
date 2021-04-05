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
    payload: any;
}

export const ActionTypes = {
    FETCH_DATA: "FETCH_DATA",
    ADD_CARD: "ADD_CARD",
    DELETE_CARD: "DELETE_CARD",
    ADD_TICKET: "ADD_TICKET",
    EDIT_TICKET: "EDIT_TICKET",
    DELETE_TICKET: "DELETE_TICKET",
};

export type Align = "left" | "right" | "center";

export interface FormState {
    title: string;
    description: string;
}

export type Types = "create-card" | "create-ticket" | "edit-ticket";