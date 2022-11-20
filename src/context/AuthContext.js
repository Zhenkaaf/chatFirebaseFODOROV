import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

//Метод createContext создает объект контекста, 
//на который могут подписаться компоненты приложения. 
//После подписки компоненты получают возможность получать значение контекста от ближайшего к ним Provider
export const AuthContext = createContext(); // вернет объект с компонентами Provider and Consumer

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log('user====', user)
        });
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )

};