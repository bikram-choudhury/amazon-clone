import React from 'react';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { useStateValue } from '../../StateProvider';
import SubTotal from '../SubTotal/SubTotal';
import './Checkout.css';

function Checkout() {
    const [{ basket }] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout_left">

                <img
                    src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
                    alt="checkout"
                    className="checkout_ad" />
                {
                    basket?.length === 0 ? (
                        <div className="checkout__title">
                            <h2>Your Shopping Basket is empty</h2>
                            <p>You have no items in your basket. To buy one "Add Basket" next to tht item</p>
                        </div>
                    ) : (
                            <div>
                                <h2 className="checkout__title">Your Shopping Basket</h2>
                                <div className="checkout__items">
                                    {
                                        basket.map(item => (
                                            <CheckoutProduct {...item} />
                                        ))
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
            {
                basket.length > 0 && (
                    <div className="checkout_subtotal">
                        <SubTotal />
                    </div>
                )
            }
        </div>
    )
}

export default Checkout
