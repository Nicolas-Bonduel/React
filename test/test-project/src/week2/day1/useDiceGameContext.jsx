import { createContext, useContext, useReducer } from "react";

const DiceGameContext = createContext();

const DiceGameContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        (state_, action) => {
            switch (action.type) {
                case 'add':
                    return {
                        ...state_,
                        rolls: [...state_.rolls, ...action.payload.rolls]
                    };
    
                default:
                    return state_;
            }
        },
        {
            rolls: []
        }
    );

    return <DiceGameContext.Provider value={{ state, dispatch }}>{children}</DiceGameContext.Provider>
}

export const useDiceGameContext = () => useContext(DiceGameContext);
export default DiceGameContextProvider;


