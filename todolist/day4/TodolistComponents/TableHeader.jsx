import { todolistContext } from "../TodolistContext";
import { useContext } from "react";

function TableHeader() {

    const [{sorting}, dispatch] = useContext(todolistContext);

    return (
        <>
            <div className="header flex-row">

                <div className="is-done flex-row center">
                    <p>Done?</p>
                    {
                        sorting.includes('is_done') && sorting.includes('descending') ?
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'is_done', order: 'asc'}}) } className="order-asc" alt="order by asc" src="https://www.svgrepo.com/show/93813/up-arrow.svg" height="12px"/> :
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'is_done', order: 'desc'}}) } className="order-desc" alt="order by desc" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Arrow-down.svg" height="12px"/>

                    }
                </div>

                <div className="category flex-row center">
                    <p>Category</p>
                    {
                        sorting.includes('category') && sorting.includes('descending') ?
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'category', order: 'asc'}}) } className="order-asc" alt="order by asc" src="https://www.svgrepo.com/show/93813/up-arrow.svg" height="12px"/> :
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'category', order: 'desc'}}) } className="order-desc" alt="order by desc" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Arrow-down.svg" height="12px"/>

                    }
                </div>

                <div className="title flex-row center">
                    <p>Title</p>
                    {
                        sorting.includes('title') && sorting.includes('descending') ?
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'title', order: 'asc'}}) } className="order-asc" alt="order by asc" src="https://www.svgrepo.com/show/93813/up-arrow.svg" height="12px"/> :
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'title', order: 'desc'}}) } className="order-desc" alt="order by desc" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Arrow-down.svg" height="12px"/>

                    }
                </div>

                <div className="description flex-row center">
                    <p>Description</p>
                    {
                        sorting.includes('desc') && sorting.includes('descending') ?
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'desc', order: 'asc'}}) } className="order-asc" alt="order by asc" src="https://www.svgrepo.com/show/93813/up-arrow.svg" height="12px"/> :
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'desc', order: 'desc'}}) } className="order-desc" alt="order by desc" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Arrow-down.svg" height="12px"/>

                    }
                </div>
                
                <div className="delete flex-row center">
                    <p>Delete</p>
                </div>

            </div>
        </>
    )

}

export default TableHeader;