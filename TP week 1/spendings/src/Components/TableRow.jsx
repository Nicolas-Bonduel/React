import { useSpendingsContext } from "../context/useSpendingsContext";
import { useContext } from "react";

function TableRow({id, category, title, desc, amount, date, required_fields, editing_field, validation,  special}) {

    const categories = ["Alimentation", "Logement", "Transport", "Divertissement", "Santé", "Education", "Autres"];

    const {state: {items}, dispatch} = useSpendingsContext();

    /**
     * Toggles editing mode for fields
     */
    const handleEdit = (event, field, type, target = null) => {

        let items_ = [...items];
        let value;
        items.map((item) => {
            if (item.id == id) {
                switch (type) {

                    case 'edit':
                        if (!item.editing_field.includes(field))
                            item.editing_field = item.editing_field + '|' + field;

                        break;

                    case 'save':
                        console.log('hey');
                        // sanity check
                        if (!item.editing_field.includes(field))
                            return;

                        // get input value
                        value = event.type == 'click' ?
                            event.target.previousSibling.value :
                            event.target.value;
                        // to float if number (dunno why it gives me a string even though the input is of type number)
                        if (field == "amount")
                            value = parseFloat(value);

                        // very simple validation
                        console.log(value);
                        if (!value || (field == "category" && value == "default") && item.required_fields.includes(field)) {
                            console.log('no');
                            item.validation[field] = 'invalide!';
                        }
                        else {
                            item.validation[field] = '';
                            if (event.key === "Enter") {
                                item[field] = value;
                                item.editing_field = item.editing_field.replace('|' + field, '');
                            }
                        }
                        
                        break;

                }
            }

            return item;
        });

        dispatch( {type: 'edit', payload: {items: items_}} );

    }

    return (

        special && special == "add" ?
            <>
                <div className="row flex-row add-item">
                    <img onClick={ () => dispatch({type: 'add'}) } alt="add item" src="https://icons.veryicon.com/png/o/miscellaneous/small-face-icon/add-to-118.png" />
                </div>
            </>
            :
            <>
                <div className="row flex-row" data-id={id}>

                    <div className="category flex-row center">
                        {
                            editing_field.includes('category') ?
                                <>
                                    <select onChange={ (e) => handleEdit(e, 'category', 'save') }>
                                        <option default value="default">- Catégories -</option>
                                        {
                                            categories.map( (cat, idx) => <option key={idx} value={cat}>{cat}</option> )
                                        }
                                    </select>
                                    <img onClick={ (e) => handleEdit(e, 'category', 'save') } className="edit-field" alt="save" src="https://www.svgrepo.com/show/309930/save.svg" height="12px"/>
                                </>
                                :
                                <>
                                    <p className="badge">{category}</p>
                                    <img onClick={ (e) => handleEdit(e, 'category', 'edit') } className="edit-field" alt="edit" src="https://www.svgrepo.com/show/73131/edit-button.svg" height="12px"/>
                                </>
                        }
                    </div>

                    <div className="title flex-row center">
                        {
                            editing_field.includes('title') ?
                                <>
                                    <input onKeyDown={ (e) => { if (e.key === "Enter") return handleEdit(e, 'title', 'save'); } } type="text" />
                                    <img onClick={ (e) => handleEdit(e, 'title', 'save') } className="edit-field" alt="save" src="https://www.svgrepo.com/show/309930/save.svg" height="12px"/>
                                </>
                                :
                                <>
                                    <p>{title}</p>
                                    <img onClick={ (e) => handleEdit(e, 'title', 'edit') } className="edit-field" alt="edit" src="https://www.svgrepo.com/show/73131/edit-button.svg" height="12px"/>
                                </>
                        }
                    </div>

                    <div className="description flex-row">
                        {
                            editing_field.includes('desc') ?
                                <>
                                    <input onKeyDown={ (e) => { if (e.key === "Enter") return handleEdit(e, 'desc', 'save'); } } type="text" />
                                    <img onClick={ (e) => handleEdit(e, 'desc', 'save') } className="edit-field" alt="save" src="https://www.svgrepo.com/show/309930/save.svg" height="12px"/>
                                </>
                                :
                                <>
                                    <p>{desc}</p>
                                    <img onClick={ (e) => handleEdit(e, 'desc', 'edit') } className="edit-field" alt="edit" src="https://www.svgrepo.com/show/73131/edit-button.svg" height="12px"/>
                                </>
                        }
                    </div>

                    <div className="amount flex-row">
                        {
                            editing_field.includes('amount') ?
                                <>
                                    <input onKeyDown={ (e) => { return handleEdit(e, 'amount', 'save'); } } type="number" className={ validation['amount'] ? "input-invalid" : "" }/>
                                    <img onClick={ (e) => handleEdit(e, 'amount', 'save') } className="edit-field" alt="save" src="https://www.svgrepo.com/show/309930/save.svg" height="12px"/>
                                </>
                                :
                                <>
                                    <p>{amount} €</p>
                                    <img onClick={ (e) => handleEdit(e, 'amount', 'edit') } className="edit-field" alt="edit" src="https://www.svgrepo.com/show/73131/edit-button.svg" height="12px"/>
                                </>
                        }
                    </div>

                    <div className="date flex-row">
                        {
                            editing_field.includes('date') ?
                                <>
                                    <input onChange={ (e) => handleEdit(e, 'date', 'save') } type="date" />
                                    <img onClick={ (e) => handleEdit(e, 'date', 'save') } className="edit-field" alt="save" src="https://www.svgrepo.com/show/309930/save.svg" height="12px"/>
                                </>
                                :
                                <>
                                    <p>{date}</p>
                                    <img onClick={ (e) => handleEdit(e, 'date', 'edit') } className="edit-field" alt="edit" src="https://www.svgrepo.com/show/73131/edit-button.svg" height="12px"/>
                                </>
                        }
                    </div>

                    <div className="delete flex-row center">
                        <img onClick={ () => dispatch( {type: 'delete', payload: {id: id}} ) } className="delete-row" alt="delete" src="https://www.svgrepo.com/show/96495/delete.svg" height="24px" />
                    </div>

                </div>
            </>
    )

}

export default TableRow;