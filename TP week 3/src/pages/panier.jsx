import { useEffect } from "react";
import { getItems } from "../store/slice/itemsSlice";
import { useDispatch } from "react-redux";


const Cart = () => {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const handleAdd = (id) => {
        dispatch(add({ id }));
    };

    const handleDelete = (id) => {
        dispatch(delete_({ id }));
    };

    const handleDestroy = () => {
        dispatch(destroy());
    };

    return (
        <div>
            <h2>Mon Panier</h2>
            {items.length === 0 ? (
                <p>Votre panier est vide</p>
            ) : (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            Article ID: {item.id} 
                            <button onClick={() => handleDelete(item.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleDestroy}>Vider le panier</button>
        </div>
    );
}
export default Cart;
