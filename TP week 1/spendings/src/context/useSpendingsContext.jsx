import { createContext, useContext } from "react";
import useSpendingsReducer from "../reducer/useSpendingsReducer";

const SpendingsContext = createContext();

const SpendingsContextProvider = ({ children }) => {
    const [state, dispatch] = useSpendingsReducer();

    return <SpendingsContext.Provider value={{ state, dispatch }}>{children}</SpendingsContext.Provider>
}

export const useSpendingsContext = () => useContext(SpendingsContext);
export default SpendingsContextProvider;
