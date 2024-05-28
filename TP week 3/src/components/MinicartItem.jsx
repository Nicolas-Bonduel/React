import { useDispatch, useSelector } from "react-redux";
import { delete_ } from "../store/slice/cartSlice";
import { NavLink, useNavigate } from "react-router-dom";

function MinicartItem({item}) {

    const items = useSelector((state) => state.items.items);
    const store_item = items.find(item_ => item_.id == item.id);

    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(delete_({
            id: item.id,
        }));
    }

    return (
        <>
            <div className="item-wrapper">
                <NavLink to={"/product/" + item.id} className="picture-wrapper">
                    <img className="picture" alt="picture" src={store_item.image} />
                </NavLink>
                <div className="column">
                    <NavLink to={"/product/" + item.id} className="title">{store_item.title}</NavLink>
                    <div className="row">
                        <span className="amount-price">{item.qty} x {store_item.price.toFixed(2).toString().replace('.', ',')} $</span>
                        <button className="delete" onClick={handleDelete}>
                            <img alt="delete" src="https://boutique-lebarbierquifume.com/wp-content/uploads/2021/01/close-icon2.png" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default MinicartItem;