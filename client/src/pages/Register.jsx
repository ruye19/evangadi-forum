import axios from '../api/axiosConfig';
import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router';

const Register = () => {

    const navigator = useNavigate();

    const userNameDom = useRef();
    const firstNameDom = useRef();          
    const lastNameDom = useRef();
    const emailDom = useRef();  
    const passwordDom = useRef();


    const handleRegister = async (e) => {
    e.preventDefault();
    const username = userNameDom.current.value;
    const firstname = firstNameDom.current.value;   
    const lastname = lastNameDom.current.value;
    const email = emailDom.current.value;
    const password = passwordDom.current.value;

    if (!username || !firstname || !lastname || !email || !password) {
        alert("Please fill all fields");
        return;
    }


    try {
        await axios.post('/user/register',{
            username,
            firstname,
            lastname,
            email,
            password
        })
        alert("User registered successfully")
        navigator('/login')
    } catch (error) {
        alert("Server error")
        console.log(error.respons)
    }

    }

    return (
       <section>
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input  ref={userNameDom} type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="firstname">Firstname:</label>
                    <input ref={firstNameDom} type="text" id="firstname" name="firstname" required />
                </div>
                <div>
                    <label htmlFor="lastname">Lastname:</label>
                    <input ref={lastNameDom} type="text" id="firstname" name="lastname" required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input ref={emailDom} type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input ref={passwordDom} type="password" id="password" name="password" required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
       </section>
    );
};

export default Register;