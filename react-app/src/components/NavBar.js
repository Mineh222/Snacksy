
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import Modal from 'react-modal';
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchBar from './SearchBar';
import './navbar.css'
import zIndex from '@material-ui/core/styles/zIndex';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session?.user);
  const cart = useSelector(state => Object.values(state?.shoppingCart)[0]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  Modal.setAppElement('body');

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

  const formStyles = {
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      minHeight: '100%',
      padding: '30px 12px',
      zIndex: 6,
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '384px',
      width: '100%',
      top: '80px',
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
      overflow: 'visibile',
      zIndex: 4
    }
  };

  let cartQuantity = null;
  if (cart) {
    cartQuantity = cart.quantity
  }

  return (
    <nav className='nav'>
      <ul className='navbar'>
        <div className='snacksy-home-bttn'>
          <NavLink to='/' exact={true} activeClassName='active' className='home-title'>
            Snacksy
          </NavLink>
        </div>
        <div className='search-bar'>
          <SearchBar />
        </div>
        {sessionUser && (
        <>
          <div className="create-snack">
            <NavLink to="/new-snack">
              <div className='create-snack-dropdown'>
                <button className='create-snack-bttn'>
                  <i className="fa-solid fa-store fa-lg"></i>
                </button>
                <div className='dropdown-title'>
                  <p id='drop-down-text'>Create a Snack</p>
                </div>
              </div>
            </NavLink>
          </div>
          <div className='shopping-cart'>
            <NavLink to={`/cart/${sessionUser?.id}`}>
              <Badge color="primary" badgeContent={cartQuantity} overlap="rectangular">
                <ShoppingCartIcon color='action'/>
              </Badge>
            </NavLink>
          </div>
        </>
        )}
        {!sessionUser && (
          <div className='signin-navbar'>
            <button className='signin-button' onClick={openLoginModal}>Sign in</button>
            <Modal isOpen={showLoginForm} style={formStyles}>
              <button className="close_login_btn" onClick={() => setShowLoginForm(false)}>X</button>
              <LoginForm />
              <button className="register_btn" onClick={openClose}>Register</button>
            </Modal>
            <Modal isOpen={showSignupForm} style={formStyles}>
              <button className="close_login_btn" onClick={() => setShowSignupForm(false)}>X</button>
              <SignUpForm setTrigger={setShowSignupForm} />
            </Modal>
          </div>
        )}
        {sessionUser && (
          <div className='logout-button'>
            <LogoutButton setTrigger={setShowLoginForm} setTriggerSignup={setShowSignupForm}/>

          </div>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
