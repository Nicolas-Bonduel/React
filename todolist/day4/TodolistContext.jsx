import { createContext, useReducer } from "react";

export const todolistContext = createContext(null);

const TodolistContextProvider = ({children}) => {

    const context = useReducer(
        (state, action) => {
            let items, i, eval_;
            switch (action.type) {
                // add an item to todolist
                case 'add':
                    return {...state, items: [...state.items, {
                        id: state.items.length + 1,
                        is_done: false,
                        category: "added category",
                        title: "added title",
                        desc: "added description",
                        editing_field: "|category|title|desc",
                    }]};
                // edit an item from todolist
                case 'edit':
                    return {...state, items: action.payload.items}
                // delete an item from todolist
                case 'delete':
                    items = [...state.items];
                    items = items.filter((i) => i.id != action.payload.id);
                    return {...state, items: items};
                // order items in todolist
                case 'order_by':
                    if (!state.items.length)
                        return state;
                    items = [...state.items];
                    switch (action.payload.field) {
                        // order by 'is done' criteria
                        case 'is_done':
                            for (i = 0; i < (items.length - 1); i++) {
                                eval_ = !items[i].is_done && items[i + 1].is_done;
                                if (eval_) {
                                    [items[i], items[i + 1]] = [items[i + 1], items[i]];
                                    i = -1;
                                }
                            }
                            break;
                        // order by 'category', 'title' or 'desc' criteria
                        case 'category':
                        case 'title':
                        case 'desc': console.log("sorting " + action.payload.field + ' ' + action.payload.order);
                            for (i = 0; i < (items.length - 1); i++) {
                                eval_ = items[i][action.payload.field] > items[i + 1][action.payload.field];
                                if (eval_) {
                                    [items[i], items[i + 1]] = [items[i + 1], items[i]];
                                    i = -1;
                                }
                            }
                            break;
                        default:
                            return state;
                    }
                    if (action.payload.order == 'desc')
                        items = items.reverse();

                    return {...state, items: items, sorting: '' + action.payload.field + '|' + (action.payload.order == 'asc' ? 'ascending' : 'descending')};

                default:
                    return state;
            }
        },
        {
            // list of todolist items
            items: [
                // dummy dataset (didn't implement adding part yet)
                {
                    id: 1,
                    is_done: false,
                    category: "category 1",
                    title: "title 1",
                    desc: "desc 1",
                    editing_field: "",
                },
                {
                    id: 2,
                    is_done: true,
                    category: "category 2",
                    title: "title 2",
                    desc: "desc 2",
                    editing_field: "",
                },
                {
                    id: 3,
                    is_done: false,
                    category: "category 3",
                    title: "title 3",
                    desc: "desc 3",
                    editing_field: "",
                },
            ]
            /*
                list of: {
                    id: int,
                    is_done: bool,
                    category: string,
                    title: string,
                    desc: string,
                    editing_field: string,
                }
            */,
            // current sorting option
            sorting: '',
            /*
                value: '{field}|{order}'
            */
        }
        
    );

    return (
        <todolistContext.Provider value={context}>
            {children}
        </todolistContext.Provider>
    )

}

export default TodolistContextProvider;