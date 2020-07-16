import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import { auth, db } from '../../firebase';
import './Product.css';
import { useHistory } from 'react-router-dom';

function Product({ id, title, price, rating, image }) {

    const loggedInUser = auth.currentUser;
    const history = useHistory();
    const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

    const addToBasket = () => {
        if(loggedInUser) {
            const uid = loggedInUser.uid;
            db.ref(`/cart/${uid}`).push({
                id, title, price, rating, image
            });
        } else {
            history.push('/login');
        }
    }
    return (
        <div className="product">
            <div className="product__info">
                <div tabIndex="0">
                    <ResponsiveEllipsis
                        style={{ whiteSpace: 'pre-wrap', height: '100px' }}
                        text={title}
                        maxLine={5}
                        ellipsis='...'
                        basedOn='letters'
                    />
                </div>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {
                        Array(rating).fill().map((v, i) => (
                            <p key={i}>
                                <span role="img" aria-label="rating">⭐</span>
                            </p>
                        ))
                    }
                </div>
            </div>
            <img src={image} alt={title} />
            <button onClick={addToBasket}>Add to cart</button>
        </div>
    )
}

export default Product
