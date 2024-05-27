import { useState } from "react";
import { useSelector } from "react-redux";

function Minicart() {

    const [minicartVisible, setMinicartVisible] = useState(false);

    const cartItems = useSelector((state) => state.cart.items);

    return (
        <>
            <button id="minicart-btn" onClick={() => setMinicartVisible(!minicartVisible)}>
                <img className="minicart-icon" alt="my cart" src="./images/cart-icon_black.png" />
                <span className="cart-count">0</span>
            </button>

            <div id="minicart" style={{'right': minicartVisible ? '0' : '-25%'}}>
                <button className="close-button" onClick={() => setMinicartVisible(false)}>X</button>

                <div className="content">
                    {
                        cartItems.length ?
                            (
                                <div></div>
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