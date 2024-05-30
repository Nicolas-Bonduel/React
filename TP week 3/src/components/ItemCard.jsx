import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsync } from "../store/slice/cartSlice";
import { NavLink } from "react-router-dom";

function ItemCard({ item }) {

    const [qty, setQty] = useState(1);
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
    const handleAddCart = () => {
        if (!validQty)
            return;
        if (loading)
            return;

        dispatch(addAsync({
            id: item.id,
            qty: qty,
        }));
    }
    const loadingFor = useSelector((state) => state.cart.loadingFor);
    const loading = loadingFor == item.id;

    return (
        <>
            <div className="item-card">
                <NavLink to={"/product/" + item.id} className="picture">
                    <img alt="picture" src={item.image} />
                </NavLink>
                <div className="padded">
                    <NavLink to={"/product/" + item.id} className="title">{item.title}</NavLink>
                    <p className="description">{item.description}</p>
                    <span className="price">{item.price.toFixed(2).toString().replace('.', ',')} $</span>
                    <div className={validQty ? "qty-box" : "qty-box is-invalid"}>
                        <span className="qty-decrease" onClick={() => handleQty(parseInt(qty)-1)}>-</span>
                        <input ref={qtyRef} className="qty" type="number" min="1" max="99" value={qty} onChange={e => handleQty(e.target.value)} />
                        <span className="qty-increase" onClick={() => handleQty(parseInt(qty)+1)}>+</span>
                    </div>
                    <button className={validQty && !loading ? "add-to-cart-btn" : "add-to-cart-btn disabled"} onClick={handleAddCart}>
                        Add to cart
                        <div className="loader-wrapper-btn">
                            <span style={loading ? {} : { display: 'none' }} className="loader"></span>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )

}

export default ItemCard;