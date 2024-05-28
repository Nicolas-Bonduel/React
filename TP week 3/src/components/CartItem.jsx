import { useSelector } from "react-redux";
import '../assets/cart.scss';
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
const CartItem = ({ item }) => {

    const items = useSelector((state) => state.items.items);
    const store_item = items.find(item_ => item_.id == item.id);

    const [qty, setQty] = useState(item.qty);
    const [validQty, setValidQty] = useState(true);
    const qtyRef = useRef(null);
    const handleQty = (qty) => {
        setQty(qty);
        setValidQty(true);

        if (!parseInt(qty))
            setValidQty(false);
        if (parseInt(qty) < parseInt(qtyRef.current.min))
            setValidQty(false);
        if (parseInt(qty) > parseInt(qtyRef.current.max))
            setValidQty(false);
    }

    return (
        <>
            <div className="flex">
                <img className="img-cart" src={store_item.image} />
                <div>
                    <NavLink to={'/product/' + item.id} className="title">title: {store_item.title}</NavLink>
                    <p className="category ">category: {store_item.category}</p>
                    <p className="description">desc: {store_item.description}</p>
                    <p className="price">{store_item.price.toFixed(2).toString().replace('.', ',')} $</p>
                    <p className="qty-label">Quantity:</p>
                    <div className={validQty ? "qty-box" : "qty-box is-invalid"}>
                        <span className="qty-decrease" onClick={() => handleQty(qty-1)}>-</span>
                        <input ref={qtyRef} className="qty" type="number" min="1" max="99" value={qty} onChange={e => handleQty(e.target.value)} />
                        <span className="qty-increase" onClick={() => handleQty(qty+1)}>+</span>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CartItem;
