import { todolistContext } from "../TodolistContext";
import { useContext } from "react";

function TableRow({id, is_done, category, title, desc, editing_field, special}) {

    const [{items}, dispatch] = useContext(todolistContext);

    /**
     * Toggles checkbox
     */
    const handleCheck = () => {
        let items_ = [...items];
        items.map((item) => {
            if (item.id == id)
                item.is_done = !item.is_done;

            return item;
        });
        dispatch( {type: 'edit', payload: {items: items_}} );
    }

    /**
     * Toggles editing mode for fields
     */
    const handleEdit = (event, field, type, target = null) => {
        let items_ = [...items];
        items.map((item) => {
            if (item.id == id) {
                switch (type) {
                    case 'edit':
                        if (!item.editing_field.includes(field))
                            item.editing_field = item.editing_field + '|' + field;
                        break;
                    case 'save':
                        if (item.editing_field.includes(field)) {
                                item[field] = event.type == 'click' ?
                                    event.target.previousSibling.value :
                                    event.target.value;
                            item.editing_field = item.editing_field.replace('|' + field, '');
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

                    <div className="is-done flex-row center">
                        <input onChange={handleCheck} type="checkbox" name="check" checked={is_done} />
                    </div>

                    <div className="category flex-row center">
                        {
                            editing_field.includes('category') ?
                                <>
                                    <input onKeyDown={ (e) => { if (e.key === "Enter") return handleEdit(e, 'category', 'save'); } } type="text" />
                                    <img onClick={ (e) => handleEdit(e, 'category', 'save') } className="edit-field" alt="edit" src="https://www.svgrepo.com/show/309930/save.svg" height="12px"/>
                                </>
                                :
                                <>
                                    <p className="badge" style={is_done ? {'textDecoration': 'line-through'} : {}}>{category}</p>
                                    <img onClick={ (e) => handleEdit(e, 'category', 'edit') } className="edit-field" alt="edit" src="https://www.svgrepo.com/show/73131/edit-button.svg" height="12px"/>
                                </>
                        }
                    </div>

                    <div className="title flex-row center">
                        {
                            editing_field.includes('title') ?
                                <>
                                    <input onKeyDown={ (e) => { if (e.key === "Enter") return handleEdit(e, 'title', 'save'); } } type="text" />
                                    <img onClick={ (e) => handleEdit(e, 'title', 'save') } className="edit-field" alt="edit" src="https://www.svgrepo.com/show/309930/save.svg" height="12px"/>
                                </>
                                :
                                <>
                                    <p style={is_done ? {'textDecoration': 'line-through'} : {}}>{title}</p>
                                    <img onClick={ (e) => handleEdit(e, 'title', 'edit') } className="edit-field" alt="edit" src="https://www.svgrepo.com/show/73131/edit-button.svg" height="12px"/>
                                </>
                        }
                    </div>

                    <div className="description flex-row">
                        {
                            editing_field.includes('desc') ?
                                <>
                                    <input onKeyDown={ (e) => { if (e.key === "Enter") return handleEdit(e, 'desc', 'save'); } } type="text" />
                                    <img onClick={ (e) => handleEdit(e, 'desc', 'save') } className="edit-field" alt="edit" src="https://www.svgrepo.com/show/309930/save.svg" height="12px"/>
                                </>
                                :
                                <>
                                    <p style={is_done ? {'textDecoration': 'line-through'} : {}}>{desc}</p>
                                    <img onClick={ (e) => handleEdit(e, 'desc', 'edit') } className="edit-field" alt="edit" src="https://www.svgrepo.com/show/73131/edit-button.svg" height="12px"/>
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