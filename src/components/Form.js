import "./Form.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
const Form = () => {
    const [dateOfProcess, setDateOfProcess] = useState();
    const [foodOrigin, setFoodOrigin] = useState();
    const [address, setAddress] = useState();
    const [freezingTemperature, setFreezingTemperature] = useState();
    const sendTransaction = (e) => {
        e.preventDefault()
        var data = {
            "userId": "cemre",
            "orgMSP": "Org1MSP",
            "channelName": "mychannel",
            "chaincodeName": "food",
            "data": {
                "function": "createFood",
                "foodNumber": "food6",
                "DateOfProcess": dateOfProcess,
                "FoodOrigin": foodOrigin,
                "FactoryAddress": address,
                "FreezingTemp": freezingTemperature
            }
            
        }
        console.log(JSON.stringify(data))
        axios.post('http://10.1.23.150:4000/tx',data )
            .then(res => console.log("res", res))
            .catch(err => console.error("err".err))
    }
    return (
        <div className="container">      {" "}
            <form>    
                <h1>New Transaction</h1>{" "} 
                <label>Date Of Process</label> 
                <input type="date" onChange={(e) => setDateOfProcess(e.target.value)} /> 
                <label>Food Origin</label>
                <input name="origin" onChange={(e) => setFoodOrigin(e.target.value)} /> 
                <label>Factory Address</label>
                <input name="address" onChange={(e) => setAddress(e.target.value)} /> 
                <label>Freezing Temperature</label>        
                 <input name="Temperature" onChange={(e) => setFreezingTemperature(e.target.value)} />        
                 <button onClick={(e) => sendTransaction(e)}>          Add a new transaction{" "}
            </button>      </form>{" "}    </div>);
};
export default Form;