import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import './SubTotal.css';


function SubTotal() {
    const [{ basket }] = useStateValue();
    return (
        <div className="subtotal">
            <CurrencyFormat
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={value => (
                    <>
                        <p>
                            Subtotal ({basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal_gift">
                            <input type="checkbox" className="checkout__checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
            />
            <button>Proceed to checkout</button>
        </div>
    )
}

export default SubTotal
