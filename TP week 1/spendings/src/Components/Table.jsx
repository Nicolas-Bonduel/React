import { useSpendingsContext } from "../context/useSpendingsContext";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table() {

    const {state: {items, filterBy}} = useSpendingsContext();

    return (
        <>
            <div id="spendings" className="flex-column">


                <h2 style={{marginTop: "1%"}}>Dépenses</h2>


                <div className="table flex-column">

                    <TableHeader />
                    {
                        filterBy === ''
                        ? items.map( (item, idx) => <TableRow key={idx} {...item} /> )
                        : items.filter(item => item.category === filterBy).map( (item, idx) => <TableRow key={idx} {...item} /> )
                    }
                    {
                        
                        filterBy != '' && items.filter(item => item.category === filterBy).length == 0 ?
                            <div className="row flex-row center">
                                <h3>Aucune catégorie trouvée</h3>
                            </div> :
                            ''
                    }
                    <TableRow special="add"/>

                </div>
                
            </div>
        </>
    )

}

export default Table;