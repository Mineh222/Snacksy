import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { thunkDeleteSnack, thunkGetSingleSnack } from '../../store/snacks';
import { thunkAddToCart } from '../../store/cart';
import { useParams, useHistory, Link } from 'react-router-dom';
import { thunkGetCart } from '../../store/cart';

import Reviews from '../Reviews';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import Modal from 'react-modal';
import './SingleSnack.css'


export default function SingleSnack() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { snackId } = useParams();
    const [quantity, setQuantity] = useState(1);

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);



    const sessionUser = useSelector((state) => state.session.user);
    const snack = useSelector((state) => state.allSnacks[snackId]);
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const userId = useSelector((state) => state.session?.user?.id);
    let snackies = []


    async function handleSubmit(e) {
        e.preventDefault();

        if (cart) {
            const ok = await dispatch(thunkAddToCart(cart, snack, quantity))
            if (ok) {
                setQuantity(quantity)
                return alert("Added to cart!")
            }
            return alert("Snack already in cart!")
        }
    }

    useEffect(() => {
        window.scroll(0, 0)
        dispatch(thunkGetSingleSnack(snackId))
        if (userId) {
            dispatch(thunkGetCart(userId))
        }
    }, [dispatch, snackId])

    const onDelete = () => {
        dispatch(thunkDeleteSnack(snackId))
        history.push('/')
    }
    function openLoginModal() {
        setShowLoginForm(true)
    }

    function closeLoginModal() {
        setShowLoginForm(false)
    }

    function openClose() {
        setShowSignupForm(true)
        closeLoginModal(true)
    }

    if (!snack) return null


    function stringify() {
        if (cart) {
            cart.snacks.forEach(item => {
                snackies.push(JSON.stringify(item))
            })
            return snackies
        }
    }

    const formStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            minHeight: '100%',
            padding: '12px',
            backgroundColor: 'rgba(34, 34, 34, 0.65)'
        },
        content: {
            position: 'relative',
            margin: 'auto',
            maxWidth: '384px',
            width: '100%',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '24px',
            outline: 'none',
            padding: '18px',
            overflow: 'visibile'
        }
    };

    return (
        <>
            <div className='single-snack-container'>
                <div className='img-div'>
                    <img className='single-img' src={snack.cover_pic} alt='snackImage'></img>
                    <div className='snack-info-div'>
                        <h1 className='single-title' >{snack.title}</h1>
                        <h2 className='single-cat'>{snack.category}</h2>
                        <h2 className='single-price'>${snack.price.toFixed(2)}</h2>
                        <h3 className='single-des'>{snack.description}</h3>
                        <form onSubmit={handleSubmit}>
                            {sessionUser && cart && !stringify(cart.snacks).includes(JSON.stringify(snack)) && (
                                <button className='addToCartbtn' type="submit">Add to Cart</button>
                            )}
                            {cart && cart.snacks && stringify(cart.snacks).includes(JSON.stringify(snack)) && (
                                <p className='already-in-cart'>This snack is in your cart!</p>
                            )}
                        </form>
                        <div>
                            {!sessionUser && (
                                <>
                                    <button className='sign-in-to-addCart' onClick={openLoginModal}>Sign in to Add to cart</button>
                                    <Modal isOpen={showLoginForm} style={formStyles}>
                                        <button className="close_login_btn" onClick={() => setShowLoginForm(false)}>X</button>
                                        <LoginForm />
                                        <button className="register_btn" onClick={openClose}>Register</button>
                                    </Modal>
                                    <Modal isOpen={showSignupForm} style={formStyles}>
                                        <button className="close_login_btn" onClick={() => setShowSignupForm(false)}>X</button>
                                        <SignUpForm setTrigger={setShowSignupForm} />
                                    </Modal>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {sessionUser && sessionUser.id === snack.user_id &&
                    <>
                        <div className='edit-delete-div'>
                            <Link to={`/snacks/${snack.id}/edit`}>
                                <button className='edit-single-snack-btn'>Edit  <i className="fa-solid fa-pen-to-square"></i></button>
                            </Link>
                            <button className='delete-single-snack-btn' onClick={onDelete}>Delete  <i className="fa-solid fa-trash-can"></i></button>
                        </div>
                    </>
                }
                {/* {!sessionUser && (
                    <>
                        <button className='sign-in-to-addCart' onClick={openLoginModal}>Sign in to Add to cart</button>
                        <Modal isOpen={showLoginForm} style={formStyles}>
                            <button className="close_login_btn" onClick={() => setShowLoginForm(false)}>X</button>
                            <LoginForm />
                            <button className="register_btn" onClick={openClose}>Register</button>
                        </Modal>
                        <Modal isOpen={showSignupForm} style={formStyles}>
                            <button className="close_login_btn" onClick={() => setShowSignupForm(false)}>X</button>
                            <SignUpForm setTrigger={setShowSignupForm} />
                        </Modal>
                    </>
                )} */}
            </div>
            <Reviews />
        </>
    )
}
