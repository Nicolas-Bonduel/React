import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";

function ItemsByCategory({category, ignore = -1}) {

    const items = useSelector(state => state.items.items);
    const itemsByCategory = items.filter(item => item.category === category);

    return (
        <>
            <div className="items-wrapper">
                {
                    itemsByCategory.map((item, idx) => (ignore === -1 || item.id != ignore) && <ItemCard key={idx} item={item} />)
                }
            </div>
        </>
    )

}

export default ItemsByCategory;