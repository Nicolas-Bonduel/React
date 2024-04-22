import { createContext, useContext, useReducer } from "react";

const ArticleContext = createContext(null);

const ArticleContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        (state_, action) => {
            switch (action.type) {
                case 'add':
                    return {
                        ...state_,
                        articles: [...state_.articles, {
                            id: Date.now(),
                            content: action.payload.content
                        }]
                    };
    
                default:
                    return state_;
            }
        },
        {
            articles: [
                {
                    id: 1,
                    content: "content 1"
                },
                {
                    id: 2,
                    content: "content 2"
                },
                {
                    id: 3,
                    content: "content 3"
                }
            ]
        }
    );

    return <ArticleContext.Provider value={{ state, dispatch }}>{children}</ArticleContext.Provider>
}

export const useArticleContext = () => useContext(ArticleContext);
export default ArticleContextProvider;


