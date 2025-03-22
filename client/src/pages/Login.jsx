import React from 'react';
import { useRef } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router';

const Login = () => {

    const navigator = useNavigate();
       
    const emailDom = useRef();
    const passwordDom = useRef();       

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = emailDom.current.value;
        const password = passwordDom.current.value;

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            await axios.get('/user/login', {
                email,
                password
            }); 
            alert("Login successful")
            navigator('/')
        } catch (error) {
            console.log(error.response.data);
            alert("Server error")
        }           
    };


    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                    ref={emailDom}
                    type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input  ref={passwordDom}
                    type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;