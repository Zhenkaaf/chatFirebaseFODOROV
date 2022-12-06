import { createContext, useReducer } from "react";


//Метод createContext создает объект контекста, 
//на который могут подписаться компоненты приложения. 
//После подписки компоненты получают возможность получать значение контекста от ближайшего к ним Provider
export const ChatContext = createContext(); // вернет объект с компонентами Provider and Consumer


export const ChatContextProvider = ({ children }) => { //ChatContextProvider - оборачиваем index
    const INITIAL_STATE = {
        contact: {}
    }
    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_CONTACT":
                return {
                    contact: action.payload,
                };
                case "DEL_CONTACT":
                return {
                    contact: {}
                };
            default:
                return state;
        }
    };
    
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};