import { createContext, useReducer } from "react";


export const WindowContext = createContext(); // вернет объект с компонентами Provider and Consumer


export const WindowContextProvider = ({ children }) => { //ChatContextProvider - оборачиваем index
    const INITIAL_STATE = {
        sidebar: true,
        chat: true
    }
    const windowReducer = (state, action) => {
        switch (action.type) {
            case "HIDE_CONTACTS":
                return {
                    sidebar: false,
                    chat: true
                };
            case "SHOW_CONTACTS":
                return {
                    sidebar: true,
                    chat: false
                };
            case "SHOW_ALL":
                return {
                    sidebar: true,
                    chat: true
                };
                case "HIDE_CHAT":
                return {
                    sidebar: true,
                    chat: false
                };
            default:
                return state;
        }
    };

    const [state, dispatchWindows] = useReducer(windowReducer, INITIAL_STATE);

    return (
        <WindowContext.Provider value={{ windows: state, dispatchWindows }}>
            {children}
        </WindowContext.Provider>
    );
};