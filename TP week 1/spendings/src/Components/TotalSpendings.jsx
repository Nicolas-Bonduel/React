import { useSpendingsContext } from "../context/useSpendingsContext";
import { useState, useEffect } from 'react';

const TotalSpendings = () => {

    const {state: {items}} = useSpendingsContext();
    const [itemsByCategory, setItemsByCategory] = useState([]);

    // hardcoded, bear with it
    const categories = ["Alimentation", "Logement", "Transport", "Divertissement", "Santé", "Education", "Autres"];

    const now = new Date();

    useEffect(() => {
        let itemsByCategory = [];

        categories.forEach( (cat, idx) => itemsByCategory[idx] = { key: cat, items: [] } );

        let current_category_idx;
        items.forEach( (item) => {
            current_category_idx = itemsByCategory.findIndex( ({key}) => key == item.category );
            if (current_category_idx == -1) {
                console.log("ERR. Couldn't find category '" + item.category + "'");
                return;
            }
            itemsByCategory[current_category_idx].items.push(item);
        });

        setItemsByCategory(itemsByCategory);
    }, [items]);

    return (
        <>
            <div id="spendings-total">
                <h2 style={{marginBottom: "5%"}}>Total des dépenses</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Catégorie</th>
                            <th>Montant total</th>
                            <th>Mensuel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itemsByCategory.map(({key, items}, idx) => 
                                <tr key={idx}>
                                    <td>{key}</td>
                                    <td>{ items.reduce( (acc, item) => acc + item.amount, 0) } €</td>
                                    <td>{ items.reduce( (acc, item) =>
                                        acc + ( ( ( ( now.getTime() - (new Date(item.date)).getTime() ) / (24 * 60 * 60 * 1000) ) <= 30 ) ? item.amount : 0 )
                                    , 0) } €</td>
                                </tr>
                            )
                        }
                        <tr style={{fontWeight:'bold'}}>
                            <td>Total</td>
                            <td>{ items.reduce( (acc, item) => acc + item.amount, 0) } €</td>
                            <td>{ items.reduce( (acc, item) =>
                                        acc + ( ( ( ( now.getTime() - (new Date(item.date)).getTime() ) / (24 * 60 * 60 * 1000) ) <= 30 ) ? item.amount : 0 )
                            , 0) } €</td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </>
    )
}

export default TotalSpendings;
