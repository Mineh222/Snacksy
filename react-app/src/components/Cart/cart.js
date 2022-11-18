import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteFromCart, thunkGetCart } from "../../store/cart";
import { useHistory } from 'react-router-dom';
import OrderForm from "../OrderForm/orderForm";
import EditSnackQtyForm from "../EditSnackQtyForm";
import './cart.css'

const Cart = () => {
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const [hasUpdated, setHasUpdated] = useState(false);
    console.log(hasUpdated);

    const userId = useSelector(state => state.session?.user?.id);
    const history = useHistory()

    let total = 0
    let totalItems = 0

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCart(userId))
        if (hasUpdated) {
            dispatch(thunkGetCart(userId))
            setHasUpdated(false)
        }
    }, [dispatch, hasUpdated]);

    return (
        <div className='cart'>
            <div className='cart-snacks'>
                <div className="empty-cart-container">
                    {cart && !cart.quantity > 0 && (
                        <div className="empty-msg">
                            <h1>Your cart is empty</h1>
                            <img src='https://c.tenor.com/ZWKLHi3zOksAAAAC/milk-and-mocha-cute.gif'></img>
                            <button className="empty-add" onClick={() => history.push('/category/all')}>Add some snacks to fill it up</button>
                        </div>
                    )}
                </div>
                {cart && cart.quantity > 0 && (
                    <div className="snacky">
                        {/* <h2>{cart.quantity} snack(s) in your cart</h2> */}
                        {cart.snacks && cart.snacks.map(snack => (
                            <div key={snack.id} className='cart-snack'>
                                <div style={{ 'display': 'none' }}>
                                    {total += (snack.price * snack.quantity)}
                                    {totalItems += snack.quantity}
                                </div>
                                <div className="snack-display">
                                    <img src={snack.cover_pic}></img>
                                    <div>
                                        <p>{snack.title}</p>
                                        <p>${(snack.price).toFixed(2)} Each</p>
                                        {/* <p>Qty: {snack.quantity}</p> */}
                                        <EditSnackQtyForm snack={snack} setTrigger={setHasUpdated}/>
                                        <button className='remove-cart-button' onClick={() => dispatch(thunkDeleteFromCart(cart, snack))}>Remove from cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="checkout">
                {cart && cart.quantity > 0 && (
                    <div className="checkout-form-area">
                        <OrderForm total={total} totalItems={totalItems} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart;
