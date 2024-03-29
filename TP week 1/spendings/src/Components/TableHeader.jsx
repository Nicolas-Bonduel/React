import { useSpendingsContext } from "../context/useSpendingsContext";

function TableHeader() {

    const {state: {sorting}, dispatch} = useSpendingsContext();

    return (
        <>
            <div className="header flex-row">

                <div className="category flex-row center">
                    <p>Catégorie</p>
                    {
                        sorting.includes('category') && sorting.includes('descending') ?
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'category', order: 'asc'}}) } className="order-asc" alt="order by asc" src="https://www.svgrepo.com/show/93813/up-arrow.svg" height="12px"/> :
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'category', order: 'desc'}}) } className="order-desc" alt="order by desc" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Arrow-down.svg" height="12px"/>

                    }
                </div>

                <div className="title flex-row center">
                    <p>Titre</p>
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

                <div className="amount flex-row center">
                    <p>Montant</p>
                    {
                        sorting.includes('desc') && sorting.includes('descending') ?
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'amount', order: 'asc'}}) } className="order-asc" alt="order by asc" src="https://www.svgrepo.com/show/93813/up-arrow.svg" height="12px"/> :
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'amount', order: 'desc'}}) } className="order-desc" alt="order by desc" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Arrow-down.svg" height="12px"/>

                    }
                </div>

                <div className="date flex-row center">
                    <p>Date</p>
                    {
                        sorting.includes('desc') && sorting.includes('descending') ?
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'date', order: 'asc'}}) } className="order-asc" alt="order by asc" src="https://www.svgrepo.com/show/93813/up-arrow.svg" height="12px"/> :
                            <img onClick={ () => dispatch({type: 'order_by', payload: {field: 'date', order: 'desc'}}) } className="order-desc" alt="order by desc" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Arrow-down.svg" height="12px"/>

                    }
                </div>
                
                <div className="delete flex-row center">
                    <p>Supp.</p>
                </div>

            </div>
        </>
    )

}

export default TableHeader;