import { useEffect } from "react";
import { getItems } from "../store/slice/itemsSlice";
import { useDispatch, useSelector } from "react-redux";
import '../assets/cart.scss';
import CartItem from "../components/CartItem";
import { destroy } from "../store/slice/cartSlice";

const Cart = () => {
    const items = useSelector((state) => state.cart.items);

    const dispatch = useDispatch();
    const handleDestroy = () => {
        dispatch(destroy());
    };

    const cartItems = useSelector((state) => state.cart.items);
    const store_items = useSelector((state) => state.items.items);

    const cartItems_amount = cartItems.reduce((total, item) => total + item.qty, 0);

    const subtotal = cartItems.reduce((total, item) => {
        return total + (store_items.find(i => i.id == item.id).price * item.qty);
    }, 0);


    return (
        <div>
            <h2>Hi userName!</h2>
            {cartItems.length === 0 ? (
                <p>Votre panier est vide</p>
            ) : (
                <>
                    <div className="border">
                        <p>There are {cartItems_amount} items in your basket</p>
                        <button className="button-cart" onClick={handleDestroy}>Vider le panier</button>
                    </div>
                    <ul>
                        {cartItems.map((item, idx) => <CartItem key={idx} item={item} />)}
                    </ul>
                    <div className="subtotal">
                        <p>Total: ${subtotal.toFixed(2)}</p>
                    </div>
                </>
            )}

        </div>
    );
}
export default Cart;
