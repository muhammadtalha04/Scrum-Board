import { createContext, Dispatch, useContext, useReducer } from "react"
import { boardReducer } from "../reducers/BoardReducer";
import { BoardState, Action } from "../types";
import { v4 as uuid } from 'uuid';


interface BoardContextType {
    boardState: BoardState,
    boardDispatch: Dispatch<Action>
}

const initialState = {
    boardState: {
        cards: [
            {
                id: `${uuid()}`,
                title: "To Do",
                ticket_ids: []
            },
            {
                id: `${uuid()}`,
                title: "In Progress",
                ticket_ids: []
            },
            {
                id: `${uuid()}`,
                title: "Testing",
                ticket_ids: []
            },
            {
                id: `${uuid()}`,
                title: "Done",
                ticket_ids: []
            }
        ],
        tickets: [

        ]
    },
    boardDispatch: () => undefined
}

const Board = createContext<BoardContextType>(initialState);

interface BoardProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
    const [boardState, boardDispatch] = useReducer(boardReducer, initialState.boardState);

    return (
        <Board.Provider value={{ boardState, boardDispatch }}>
            {children}
        </Board.Provider>
    );
}

export const useBoardContext = () => useContext(Board);