import React from 'react';
import { useContext } from 'react';
import { AppState } from '../App';

const Home = () => {
   const {user}= useContext(AppState)
        return (

        <div>
            <h1>Welcome to Evangadi Forum</h1>
            <p>This is the home page of the forum.</p>
            <br />
            <hr />

            <p> hey , {user?.username}</p>
        </div>
    );
};

export default Home;