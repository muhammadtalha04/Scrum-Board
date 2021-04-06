import { createContext, Dispatch, useContext, useReducer } from "react";
import { formReducer } from "../reducers/FormReducer";
import { Action, FormState } from "../types";

interface FormContextType {
    formState: FormState,
    formDispatch: Dispatch<Action>
}

const initialState = {
    formState: {
        popupTitle: "",
        type: "",
        title: "",
        description: "",
        card: "",
        ticketId: ""
    },
    formDispatch: () => undefined
};

const FormContext = createContext<FormContextType>(initialState);

interface FormContextProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const FormProvider: React.FC<FormContextProviderProps> = ({ children }) => {
    const [formState, formDispatch] = useReducer(formReducer, initialState.formState);

    return (
        <FormContext.Provider value={{ formState, formDispatch }}>
            {children}
        </FormContext.Provider>
    )
}

export const useFormContext = () => useContext(FormContext);