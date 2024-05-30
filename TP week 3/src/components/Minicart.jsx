import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import MinicartItem from "./MinicartItem";
import { useNavigate } from "react-router-dom";

import cart_icon from '../assets/images/cart-icon_black.png';

function Minicart() {

    const [minicartVisible, setMinicartVisible] = useState(false);

    const cartItems = useSelector((state) => state.cart.items);
    const store_items = useSelector((state) => state.store.items);

    const cartItems_amount = cartItems.reduce((total, item) => total + item.qty, 0);

    const subtotal = cartItems.reduce((total, item) => {
        return total + (store_items.find(i => i.id == item.id)?.price ?? 0 * item.qty);
    }, 0);

    const navigate = useNavigate();

    const minicart_btn_ref = useRef(null);
    const minicart_ref = useRef(null);
    document.addEventListener('mousedown', function (event) {
        if (minicart_btn_ref.current && !minicart_btn_ref.current.contains(event.target) && minicart_ref.current && !minicart_ref.current.contains(event.target))
            setMinicartVisible(false);
    })

    return (
        <>

            <button ref={minicart_btn_ref} id="minicart-btn" onClick={() => setMinicartVisible(!minicartVisible)}>
                <img className="minicart-icon" alt="my cart" src={cart_icon} />
                <span className="cart-count">{cartItems_amount > 99 ? '99+' : cartItems_amount}</span>
            </button>

            <div ref={minicart_ref} id="minicart" style={{ 'right': minicartVisible ? '0' : '-25%' }}>
                <button className="close-button" onClick={() => setMinicartVisible(false)}>X</button>

                <div className="content">
                    {
                        cartItems.length ?
                            (
                                <>
                                    { !store_items.length && <div className="loader-wrapper"><span className="loader"></span></div> }

                                    {cartItems.map((item, idx) => <MinicartItem key={idx} item={item} />)}

                                    <span className="subtotal">
                                        Subtotal : {subtotal.toFixed(2).toString().replace('.', ',')} $
                                    </span>

                                    <button className="view-cart-btn" onClick={() => navigate('cart')}>
                                        My cart
                                    </button>
                                </>
                            )
                            :
                            (
                                <p className="cart-is-empty">Votre panier est vide</p>
                            )
                    }

                </div>
            </div>
        </>
    )

}

export default Minicart;