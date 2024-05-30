import { useDispatch, useSelector } from "react-redux";
import '../assets/cart.scss';
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { add, delete_, updateQuantity } from "../store/slice/cartSlice";

import image_placeholder from '../assets/images/img-placeholder.png';

const CartItem = ({ item }) => {

    const items = useSelector((state) => state.store.items);
    const store_item = items.find(item_ => item_.id == item.id);

    const [qty, setQty] = useState(item.qty);
    const [validQty, setValidQty] = useState(true);
    const qtyRef = useRef(null);
    const handleQty = (qty) => {
        setQty(qty);
        setValidQty(true);

        if (!parseInt(qty))
            setValidQty(false);
        if (Number(qty) != qty || Number(qty) % 1)
            setValidQty(false);
        if (parseInt(qty) < parseInt(qtyRef.current.min))
            setValidQty(false);
        if (parseInt(qty) > parseInt(qtyRef.current.max))
            setValidQty(false);
    }

    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(delete_({ id: item.id }));
    };

    useEffect(() => {
        if (validQty)
            dispatch(updateQuantity({ id: item.id, qty }));
    }, [qty]);


    const totalItemPrice = (store_item?.price ?? 0 * qty).toFixed(2).toString().replace('.', ',');

    return (
        <>
            <div className="flex items">
                <img className="img-cart" src={store_item?.image ?? image_placeholder} />
                <div>
                    <NavLink to={'/product/' + item.id} className="title">title: {store_item?.title ?? ''}</NavLink>
                    <p className="category ">category: {store_item?.category ?? ''}</p>
                    <p className="description">desc: {store_item?.description ?? ''}</p>
                    <p className="price">{(store_item?.price ?? 0).toFixed(2).toString().replace('.', ',')} $</p>
                    <p className="qty-label">Quantity:</p>
                    <div className={validQty ? "qty-box" : "qty-box is-invalid"}>
                        <span className="qty-decrease" onClick={() => handleQty(parseInt(qty) - 1)}>-</span>
                        <input ref={qtyRef} className="qty" type="number" min="1" max="99" value={qty} onChange={e => handleQty(e.target.value)} />
                        <span className="qty-increase" onClick={() => handleQty(parseInt(qty) + 1)}>+</span>
                    </div>
                    <p>Total item: <span className="price">{totalItemPrice} €</span></p>
                    <button onClick={handleDelete} className="button-cart">Remove Item</button>
                </div>
            </div>
        </>
    );
}
export default CartItem;
