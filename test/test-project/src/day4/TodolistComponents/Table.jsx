import { todolistContext } from "../TodolistContext";
import { useContext } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table() {

    const [{items}, dispatch] = useContext(todolistContext);

    return (
        <>
            <div className="table flex-column">

                <TableHeader />

                { items.map( (item, idx) => <TableRow key={idx} {...item} /> ) }

                <TableRow special="add"/>

            </div>
        </>
    )

}

export default Table;