import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";

function ItemsByCategory({category}) {

    const items = useSelector(state => state.items.items);
    const itemsByCategory = items.filter(item => item.category === category);

    return (
        <>
            <div className="items-wrapper">
                {
                    itemsByCategory.map((item, idx) => <ItemCard key={idx} item={item} />)
                }
            </div>
        </>
    )

}

export default ItemsByCategory;