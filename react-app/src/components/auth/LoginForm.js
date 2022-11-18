import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = ({ setTrigger }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password))

    if (data) {
      setErrors(data);
    }
  };


  // useEffect(() => {
  //   console.log("user2", user)
  //   // dispatch(thunkGetCart(user?.id))
  // }, [dispatch])

  const demoSubmit = (e) => {
    e.preventDefault();
    return dispatch(login('demo@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div class="sign_in_modal">
      <h2 id="sign_in_header">Sign in</h2>
      <form className="sign_in_form" onSubmit={onLogin}>
        <div className="signin_errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label id="email_signin_label" htmlFor='email'>Email address</label>
        <input
          id="email_signin_input"
          name='email'
          type='text'
          value={email}
          onChange={updateEmail}
          required
        />
        <label id="password_signin_label" htmlFor='password'>Password</label>
        <input
          id="password_signin_input"
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
          required
        />
        <button id="signin_btn" type='submit'>Sign in</button>
        <Link to='/' className='demo-link' onClick={demoSubmit}>Demo Snacksy! Click to sign in as a guest user.</Link>
      </form>
    </div>
  );
};

export default LoginForm;
