import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import { useStateValue } from '../../StateProvider';
import './Product.css';

function Product({ id, title, price, rating, image }) {

    const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)
    const [, dispatch] = useStateValue();
    const addToBasket = () => {
        // Add item to basket
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id, title, price, rating, image
            }
        })
    }
    return (
        <div className="product">
            <div className="product__info">
                <div tabindex="0">
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
                        Array(rating).fill().map(_ => (
                            <p>
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
