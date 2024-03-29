import { useSpendingsContext } from "../context/useSpendingsContext";

const Filter = () => {
    const {state: {filterBy}, dispatch} = useSpendingsContext();
    // hardcoded, bear with it
    const categories = ["Alimentation", "Logement", "Transport", "Divertissement", "Santé", "Education", "Autres"];

    const onFilterChange = (e) => {
        dispatch({
            type: 'filter_by',
            payload: e.target.value
        })
    }

    return (
        <>
            <h3 className="filter-section">
                <p style={{whiteSpace: "nowrap"}}>Filtrer par :</p>
                <select onChange={onFilterChange} value={filterBy} style={{marginLeft: "5%"}}>
                    <option value="">-All-</option>
                    {
                        categories.map((categorie,index) => <option key={index} value={categorie}>{categorie}</option>)
                    }
                </select>
            </h3>
        </>
    )

}

export default Filter;
