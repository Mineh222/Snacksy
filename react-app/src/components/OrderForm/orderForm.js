import { useDispatch, useSelector } from 'react-redux';
import { thunkClearCart } from '../../store/cart';
import { useHistory } from 'react-router-dom';
import '../Cart/cart.css'

const OrderForm = ({ total, totalItems }) => {
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const history = useHistory()

    const dispatch = useDispatch()

    const handleOrder = async (e) => {
        e.preventDefault();
        await dispatch(thunkClearCart(cart))
        history.push('/')
        return alert('Order Placed! Thank you for shopping on Snacksy')
    }

    return (
        <form className='checkout-form'>
            <div className='cart-summary'>
                <h2 id="how_pay">Select your payment type:</h2>
                <div>
                    <div className='payment-select'>
                        <input type='radio' id='cards' name='payment' value='cards' defaultChecked/>
                        <label htmlFor='cards'>
                            <i className="fa-brands fa-cc-visa" />
                            <i className="fa-brands fa-cc-mastercard" />
                            <i className="fa-brands fa-cc-amex" />
                            <i className="fa-brands fa-cc-discover" />
                        </label>
                    </div>
                    <div className='payment-select'>
                        <span className='check'>
                            <input type='radio' id='paypal' name='payment' value='paypal' className='radio-payments' />
                            <label htmlFor='paypal'><i className="fa-brands fa-cc-paypal" /></label>
                        </span>
                    </div>
                    <div className='payment-select'>
                        <span className='check'>
                            <input type='radio' id='applepay' name='payment' value='applepay' className='radio-payments' />
                            <label htmlFor='applepay'><i className="fa-brands fa-cc-apple-pay" /></label>
                        </span>
                    </div>
                </div>
                <div>
                    <p>Item(s) subtotal: ${total.toFixed(2)}</p>
                    <p>Shipping: FREE</p>
                </div>
            </div>
            <p>Total for {totalItems} item(s): ${total.toFixed(2)}</p>
            <button onClick={handleOrder}>Place Order</button>
        </form>
    )
}

export default OrderForm
