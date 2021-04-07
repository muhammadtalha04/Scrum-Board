import { Action, ActionTypes, BoardState } from "../types";
import { deleteCard, deleteTicket, moveTicket } from '../utils';

export const boardReducer = (state: BoardState, action: Action) => {
    switch (action.type) {
        case ActionTypes.FETCH_DATA:
            return { cards: action.payload.cards, tickets: action.payload.tickets };

        case ActionTypes.ADD_CARD:
            return { ...state, cards: [...state.cards, action.payload.card] };

        case ActionTypes.DELETE_CARD:
            return { ...state, cards: deleteCard(action.payload.id) };

        case ActionTypes.SET_CARDS:
            return { ...state, cards: action.payload.cards };

        case ActionTypes.ADD_TICKET:
            return { ...state, tickets: [...state.tickets, action.payload.ticket], cards: action.payload.cards };

        case ActionTypes.EDIT_TICKET:
            return { ...state, tickets: action.payload.tickets };

        case ActionTypes.DELETE_TICKET:
            return { ...state, ...deleteTicket(action.payload.id, action.payload.cardId) };

        case ActionTypes.MOVE_TICKET:
            return { ...state, cards: moveTicket(action.payload.ticketId, action.payload.fromCard, action.payload.toCard) };

        default:
            return { ...state };
    }
}