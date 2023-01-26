import React, { useEffect, useState } from 'react';
import NavBar from "../components/NavBar"
import { Button, Checkbox, Icon, Table, TableCell } from 'semantic-ui-react'
import axios from 'axios';
import {Link} from "react-router-dom";
import AddTransaction from './AddTransaction';
import QRCode from "react-qr-code";
import { logout,isAuthenticated } from "../services/Auth"
import { useNavigate, Navigate } from "react-router-dom"

{/* <table class="ui celled definition compact table"><thead class="full-width"><tr class=""><th class=""></th><th class="">Name</th><th class="">Registration Date</th><th class="">E-mail address</th><th class="">Premium Plan</th></tr></thead><tbody class=""><tr class=""><td class="collapsing"><div class="ui fitted slider checkbox"><input type="checkbox" class="hidden" readonly="" tabindex="0"/><label></label></div></td><td class="">John Lilki</td><td class="">September 14, 2013</td><td class="">jhlilk22@yahoo.com</td><td class="">No</td></tr><tr class=""><td class="collapsing"><div class="ui fitted slider checkbox"><input type="checkbox" class="hidden" readonly="" tabindex="0"/><label></label></div></td><td class="">Jamie Harington</td><td class="">January 11, 2014</td><td class="">jamieharingonton@yahoo.com</td><td class="">Yes</td></tr><tr class=""><td class="collapsing"><div class="ui fitted slider checkbox"><input type="checkbox" class="hidden" readonly="" tabindex="0"/><label></label></div></td><td class="">Jill Lewis</td><td class="">May 11, 2014</td><td class="">jilsewris22@yahoo.com</td><td class="">Yes</td></tr></tbody><tfoot class="full-width"><tr class=""><th class=""></th><th colSpan="4" class=""><button class="ui small icon primary right floated left labeled button"><i aria-hidden="true" class="user icon"></i> Add User</button><button class="ui small button">Approve</button><button class="ui small disabled button" disabled="" tabindex="-1">Approve All</button></th></tr></tfoot></table> */ }


const Transaction = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataItems, setDataItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetch() {
            var data = JSON.stringify({
                "chaincodeName": "food",
                "channelName": "mychannel",
                "userId": "cemre",
                "orgMSP": "Org1MSP",
                "data": {
                    "function": "queryAllFoods"
                }
            });
            var config = {
                method: 'post',
                url: 'http://10.1.23.150:4000/query',
                headers: { 'Content-Type': 'application/json' },
                data: data
            };
            axios(config)
                .then(function (response) {
                    console.log(response.data)
                    setIsLoaded(true);
                    setDataItems(response.data);
                })
                .catch(function (error) {
                    setIsLoaded(true);
                    setError(error);                    
                });
        }
        fetch()
    }, [])

    const logoutUser = ()=>{
        logout();
        navigate('/login')
    }

    if (!isAuthenticated()) {
        //redirect user to dashboard
        return <Navigate to="/login" />
    }

    if(error){
        return <div>Error: {error.message}</div>;
    }else if (!isLoaded){
        return <div>Loading...</div>;
    }else{        
        return (
            <div>
                <NavBar logoutUser={logoutUser}  />
                <h1>TRANSACTIONS</h1>
                <Table celled compact definition>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                                <Button class="ui primary basic button"> <Link  to="/addtransaction">
                                Add Transaction </Link>
                                </Button>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Date Of Expiration</Table.HeaderCell>
                            <Table.HeaderCell>Date Of Process</Table.HeaderCell>
                            <Table.HeaderCell>Factory Address</Table.HeaderCell>
                            <Table.HeaderCell>Food Origin Plan</Table.HeaderCell>
                            <Table.HeaderCell>Freezing Temperature</Table.HeaderCell> 
                            <Table.HeaderCell>QR Code</Table.HeaderCell>   
                        </Table.Row>
                    </Table.Header>
    
                    <Table.Body>
                        {dataItems.map(dataItem => (
                            <Table.Row key={dataItem.Key}>
                            <Table.Cell>{dataItem.Record.DateOfExpiration}</Table.Cell>
                            <Table.Cell>{dataItem.Record.DateOfProcess}</Table.Cell>
                            <Table.Cell>{dataItem.Record.FactoryAddress}</Table.Cell>
                            <Table.Cell>{dataItem.Record.FoodOrigin}</Table.Cell>
                            <Table.Cell>{dataItem.Record.FreezingTemp}</Table.Cell>
                            <Table.Cell>
                            <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                            <QRCode
                            size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={dataItem.Key}
                            viewBox={`0 0 256 256`}/
                            ></div>
                            </Table.Cell>
                        </Table.Row>         
                        ))}                    
                    </Table.Body>
    
                    <Table.Footer fullWidth>

                    </Table.Footer>
                </Table>
            </div>
        );
            

    }
   
}


export default Transaction;