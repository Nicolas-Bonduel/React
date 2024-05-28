import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsync } from "../store/slice/cartSlice";

import '../assets/product.scss';

function ProductItem({ id }) {

    const items = useSelector((state) => state.items.items);
    const item = items.find(i => i.id == id);

    const [qty, setQty] = useState(1);
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
    const loading = loadingFor != -1;

    const contentRef = useRef(null);
    const pictureWrapperRef = useRef(null);
    useEffect(() => {
        pictureWrapperRef.current.style.height = `${contentRef.current.offsetHeight}px`;
    }, []);

    return (
        <>
            <div className="product-item-wrapper">
                <span ref={pictureWrapperRef} className="picture-wrapper">
                    <img className="picture" alt="picture" src={item.image} />
                </span>
                <div ref={contentRef} className="column">
                    <span className="title">{item.title}</span>
                    <span className="category">{item.category}</span>
                    <span className="description">{item.description}</span>
                    <span className="price">{item.price.toFixed(2).toString().replace('.', ',')} $</span>
                    <p className="qty-label">Quantité :</p>
                    <div className={validQty ? "qty-box" : "qty-box is-invalid"}>
                        <span className="qty-decrease" onClick={() => handleQty(qty - 1)}>-</span>
                        <input ref={qtyRef} className="qty" type="number" min="1" max="99" value={qty} onChange={e => handleQty(e.target.value)} />
                        <span className="qty-increase" onClick={() => handleQty(qty + 1)}>+</span>
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

export default ProductItem
