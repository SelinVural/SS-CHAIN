import './LoginPage.css';

import { useState } from 'react';
import { LoginApi } from '../services/Api';
import {storeUserData } from '../services/Storage'
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function LoginPage (){
    const navigate = useNavigate();
    const initialStateErrors = {
        username:{required:false},
        password:{required:false},
        custom_error:null
    };
    const [errors,setErrors] = useState(initialStateErrors);
    
    const [loading,setLoading]  =  useState(false);

    const [inputs,setInputs] = useState({
        username:"",
        password:"",
    })
    const handleInput = (event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }

    const handleSubmit = (event)=>{     
        event.preventDefault();
        let errors =initialStateErrors; 
        let hasError = false; 
        
        
        if (inputs.username == "") {
            errors.username.required =true;
            hasError=true;
        }
        if (inputs.password == "") {
            errors.password.required =true;
            hasError=true;
        }
       
        if (!hasError) {
            setLoading(true)
            //sending login api request
            LoginApi(inputs).then((response)=>{ 
                console.log(response)            
               if(response.status === 200){
                //-----
                if(response.data.message === "missing" || response.data === "password not matched"){                   
                    setErrors({...errors,custom_error:"Invalid Credentials"})
                }else{
                    storeUserData(response.data.password);
                }
                //----
                //storeUserData(response.data.password);
               }else if (response.status === 404 || response.status === 401){
                setErrors({...errors,custom_error:"Invalid Credentials"})
               }
               else{
                setErrors({...errors,custom_error:"Invalid Credentials"})
               }
            }).catch((err)=>{                
               if (err.code="ERR_BAD_REQUEST") {
                    setErrors({...errors,custom_error:"Invalid Credentials."})
               }

            }).finally(()=>{
                setLoading(false)
            })    
        }
        setErrors({...errors});

    }

    if (isAuthenticated()) {
        //redirect user to dashboard
        return <Navigate to="/transactions" />
    }


    return (
        <div>
            <NavBar/>
            <section className="login-block">
                <div className="container">
                    <div className="row ">
                        <div className="col login-sec">
                            <h2 className="text-center">SS-CHAIN Login Page</h2>
                            <form onSubmit={handleSubmit} className="login-form" action="">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="text-uppercase">User ID</label>
                                <input type="text"  className="form-control" onChange={handleInput} name="username"  id="username" placeholder="UserName"  />
                                { errors.username.required?
                                (<span className="text-danger" >
                                    User is required.
                                </span>):null
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                <input  className="form-control" type="password" onChange={handleInput}  name="password" placeholder="password" id="" />
                                { errors.password.required?
                                (<span className="text-danger" >
                                    Password is required.
                                </span>):null
                                }
                            </div>
                            <div className="form-group">
                                {loading ?
                                (<div  className="text-center">
                                    <div className="spinner-border text-primary " role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>):null
                                }
                                <span className="text-danger" >
                                { errors.custom_error?
                                (<p>{errors.custom_error}</p>)
                                :null
                                }
                                </span>
                                <input  type="submit" className="btn btn-login float-right" disabled={loading}  value="Login" />
                            </div>
                            <div className="clearfix"></div>
                            <div className="form-group">
                            If you don't have an SS-CHAIN account please <Link  to="/register">register</Link> and create a new account.
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}