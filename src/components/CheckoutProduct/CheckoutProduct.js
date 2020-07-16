import React from 'react';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './CheckoutProduct.css';

function CheckoutProduct({ id, title, price, rating, image }) {
    const [{ user }] = useStateValue();

    const removeFromBasket = () => {
        const cartRef = db.ref(`/cart/${user.uid}`);
        const findItemByIdQuery = cartRef.orderByChild("id").equalTo(id);
        findItemByIdQuery.on('child_added', (snapshot) => {
            snapshot.ref.remove();
            findItemByIdQuery.off()
        })
    };
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt={title} />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <small>{price}</small>
                </p>
                <div className="checkoutProduct__rating">
                    {
                        Array(rating).fill().map((v, i) => (
                            <p key={i}>
                                <span role="img" aria-label="rating">⭐</span>
                            </p>
                        ))
                    }
                </div>
                <button onClick={removeFromBasket}>Remove from basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct;
