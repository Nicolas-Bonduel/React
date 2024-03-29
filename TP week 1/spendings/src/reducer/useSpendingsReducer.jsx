import { useReducer } from "react";

const spendingsBaseState = {
    // list of spendings items
    items: [
        // dummy dataset (easier to test with an initial dataset)
        {
            id: 1,
            category: "Alimentation",
            title: "Whisky",
            desc: "L'indispensable ! 666 bouteilles",
            amount: 13320,
            date: "2024-03-28",
            required_fields : "category|title|amount|date",
            editing_field: "",
            validation: {},
        },
        {
            id: 2,
            category: "Alimentation",
            title: "Eau(1 bouteille)",
            desc: "Le saviez-vous? 70% des accidents de voiture sont perpétués par des buveurs d'eau !",
            amount: 2.00,
            date: "2001-01-02",
            required_fields : "category|title|amount|date",
            editing_field: "",
            validation: {},
        },
        {
            id: 3,
            category: "Santé",
            title: "Chloroquine",
            desc: "L'indispensable après l'indispensable",
            amount: 300,
            date: "2024-03-01",
            required_fields : "category|title|amount|date",
            editing_field: "",
            validation: {},
        },
        {
            id: 4,
            category: "Logement",
            title: "Chez ma soeur",
            desc: "Je paie en nature (ch'est le chnord ichi!)",
            amount: 0,
            date: "2024-02-02",
            required_fields : "category|title|amount|date",
            editing_field: "",
            validation: {},
        },
        {
            id: 5,
            category: "Transport",
            title: "Soucoupe Volante",
            desc: "à l'énergie solaire!",
            amount: 0,
            date: "2024-02-29",
            required_fields : "category|title|amount|date",
            editing_field: "",
            validation: {},
        },
        {
            id: 6,
            category: "Divertissement",
            title: "Hold-up",
            desc: "La vérité.",
            amount: -1,
            date: "2024-03-29",
            required_fields : "category|title|amount|date",
            editing_field: "",
            validation: {},
        },
    ]
    /*
        list of: {
            id: int,
            category: string,
            title: string,
            desc: string,
            amount: string,
            date: string,
            required_fields : string,
                /*
                    '<required field 1 name>|<required field 2 name>|...'
            editing_field: string,
            validation: object
                /*
                    validation[<field_name>] <=> '<error message>'
                
        }
    */,
    // current sorting option
    sorting: '',
    /*
        value: '{field}|{order}'
    */
    filterBy: '',
}

const spendingsReducer = 
    (state, action) => {
        let items, i, eval_;
        switch (action.type) {
            // add an item to spendings
            case 'add':
                return {...state, items: [...state.items, {
                    id: Date.now(), // dirty but bear with it
                    category: "added category",
                    title: "added title",
                    desc: "added description",
                    amount: 0,
                    date: "added date",
                    required_fields : "category|title|amount|date",
                    editing_field: "|category|title|desc|amount|date",
                    validation: {},
                }]};
            // edit an item from spendings
            case 'edit':
                return {...state, items: action.payload.items}
            // delete an item from spendings
            case 'delete':
                items = [...state.items];
                items = items.filter((i) => i.id != action.payload.id);
                return {...state, items: items};
            // order items in spendings
            case 'order_by':
                if (!state.items.length)
                    return state;
                items = [...state.items];
                switch (action.payload.field) {
                    // order by 'category', 'title' or 'desc' criteria
                    case 'category':
                    case 'title':
                    case 'desc':
                    case 'amount':
                    case 'date':
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

            case 'filter_by':

                return {
                    ...state,
                    filterBy: action.payload
                }

            default:
                return state;
        }
    }

export default () => useReducer(spendingsReducer,spendingsBaseState);
