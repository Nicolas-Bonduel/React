import { useSpendingsContext } from "../context/useSpendingsContext";
import { useContext } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table() {

    const {state: {items, filterBy}} = useSpendingsContext();

    return (
        <>
            <div id="spendings" className="flex-column">
                <div className="table flex-column">

                    <TableHeader />
                    {
                        filterBy === ''
                        ? items.map( (item, idx) => <TableRow key={idx} {...item} /> )
                        : items.filter(item => item.caterogy === filterBy).map( (item, idx) => <TableRow key={idx} {...item} /> )
                    }
                    <TableRow special="add"/>

                </div>
            </div>
        </>
    )

}

export default Table;