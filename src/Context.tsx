import React, { createContext, useState, ReactNode, FC } from "react";
interface MyContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export const MyContext = createContext<MyContextType | undefined>(undefined);
interface MyContextProviderProps {
    children: ReactNode;
}
export const MyContextProvider: FC<MyContextProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    return (
        <MyContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </MyContext.Provider>
    );
};
