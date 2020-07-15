import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import './Login.css';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = (event) => {

        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            }).catch(error => console.error(error));
    };
    const register = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            }).catch(error => console.error(error));
    };
    return (
        <div className="login">
            <Link to="/">
                <img
                    src="http://pngimg.com/uploads/amazon/amazon_PNG24.png"
                    alt="Login"
                    className="login__logo" />

            </Link>
            <div className="login__container">
                <div className="form__container">
                    <h1>Sign In</h1>
                    <form>
                        <h5>Email</h5>
                        <input
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <h5>Password</h5>
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={login} type="submit" className="login__signInButton">Sign In </button>
                    </form>
                    <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice</p>
                </div>
                <button onClick={register} type="submit" className="login__signUpButton">Sign Up </button>
            </div>
        </div>
    )
}

export default Login
