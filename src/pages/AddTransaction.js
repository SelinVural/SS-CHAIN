import React from 'react';
import NavBar from "../components/NavBar"
import { useState } from "react";
import ReactDOM from "react-dom/client";
import Form from '../components/Form';

const AddTransaction = () => {
    return (
        <div>
            <NavBar/>
            <Form/>
        </div>
    );
};



export default AddTransaction;