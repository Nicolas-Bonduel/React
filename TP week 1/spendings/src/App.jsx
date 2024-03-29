import Table from './Components/Table.jsx';

import './index.css';
import './spendings.css';

import { useState, useEffect } from 'react';
import { useSpendingsContext } from "./context/useSpendingsContext";

function App() {

    const {state: {items, filterBy}, dispatch} = useSpendingsContext();
    const [totalAmount, setTotalAmount] = useState(0);
    const [amountsByCategories, setAmountsByCategories] = useState([0,0,0,0,0,0,0]);

    const categories = ["Alimentation", "Logement", "Transport", "Divertissement", "Santé", "Education", "Autres"];

    useEffect(() => {
        setAmountsByCategories(amountsByCategories.map((categorieAmount,categorieIndex) => items.filter(item => item.category === categories[categorieIndex]).reduce((accumulator, currentValue) => accumulator + currentValue.amount,0)));
        setTotalAmount(items.reduce((accumulator, currentValue) => accumulator + currentValue.amount,0));
    },[items]);

    const onFilterChange = (e) => {
        dispatch({
            type: 'filter_by',
            payload: e.target.value
        })
    }

    return (
        <>

            <div className="disclaimer" style={{"marginTop": "20vh"}}>

                <p>Hey!</p>
                <br />

            </div>

            <p>
                Filter by :
                <select onChange={onFilterChange} value={filterBy}>
                    <option value="">-All-</option>
                    {
                        categories.map((categorie,index) => <option key={index} value={categorie}>{categorie}</option>)
                    }
                </select>
            </p>

            <Table />

            <p>Total des dépenses :</p>
            <table style={{color:'white'}}>
                <thead>
                    <tr>
                        <th>Catégorie</th>
                        <th>Montant total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        amountsByCategories.map((categorieAmount,index) =>
                            <tr key={index}>
                                <td>{categories[index]}</td>
                                <td>{categorieAmount} €</td>
                            </tr>
                        )
                    }
                    <tr style={{fontWeight:'bold'}}>
                        <td>Total amount</td>
                        <td>{totalAmount} €</td>
                    </tr>
                </tbody>
                <tfoot></tfoot>
            </table>
        </>
    )
}

export default App