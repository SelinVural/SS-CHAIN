import { useState } from 'react'
import { RegisterApi } from '../services/Api';
import { isAuthenticated } from '../services/Auth';
import { storeUserData } from '../services/Storage';
import './RegisterPage.css'
import { Link, Navigate,BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function RegisterPage(){
    const initialStateErrors = {
        userId:{required:false},
        password:{required:false},       
        custom_error:null
    };
    const [errors,setErrors] = useState(initialStateErrors);

    const [loading,setLoading]  =  useState(false);

    const handleSubmit = (event)=>{
        event.preventDefault();
        let errors =initialStateErrors; 
        let hasError = false;        
        if (inputs.userId == "") {
            errors.userId.required =true;
            hasError=true;
        }
        if (inputs.password == "") {
            errors.password.required =true;
            hasError=true;
        }

        if (!hasError) {
            setLoading(true)
            //sending register api request
            RegisterApi(inputs).then((response)=>{
                if(response.status === 200){
                    if(response.data.message === "missing" || response.data === "password not matched"){                   
                        setErrors({...errors,custom_error:"Invalid Credentials"})
                        console.log(response)
                    }else{
                        console.log(response)
                        storeUserData(response.data.password);
                    }
                        
                   }else{
                    console.log(response)
                    setErrors({...errors,custom_error:"Invalid Credentials"})
                   }
                // storeUserData(response.data.password);
            }).catch((err)=>{
               if(err.response.data.error.message=="EMAIL_EXISTS"){
                    setErrors({...errors,custom_error:"Already this email has been registered!"})
               }else if(String(err.response.data.error.message).includes('WEAK_PASSWORD')){
                    setErrors({...errors,custom_error:"Password should be at least 6 characters!"})
               }

            }).finally(()=>{
                setLoading(false)
            })
        }   
        setErrors(errors);
    }

    const [inputs,setInputs] = useState({
        userId:"",
        password:"",        
    })

    const handleInput = (event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }

    if (isAuthenticated()) {
        //redirect user to dashboard
        return <Navigate to="/dashboard" />
    }
    
    return (
        <div>
            <NavBar/>
            <section className="register-block">
                <div className="container">
                <div className="row ">
                    <div className="col register-sec">
                        <h2 className="text-center">SS-CHAIN Register Page</h2>
                        <form onSubmit={handleSubmit} className="register-form" action="" >
                        <div className="form-group">
                            <label htmlFor="userId" className="text-uppercase">UserName</label>
            
                            <input type="text" className="form-control" onChange={handleInput} name="userId" id="userId"  />
                        { errors.userId.required?
                            (<span className="text-danger" >
                                    UserName is required.
                                </span>):null
                            }
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password" className="text-uppercase">Password</label>
                            <input  className="form-control" type="password" onChange={handleInput}  name="password" id="" />
                            { errors.password.required?
                            (<span className="text-danger" >
                                Password is required.
                            </span>):null
                            }
                        </div>
                        <div className="form-group">
            
                            <span className="text-danger" >
                            { errors.custom_error?
                            (<p>{errors.custom_error}</p>)
                            :null
                            }
                            </span>
                            {loading ?
                            (<div  className="text-center">
                                <div className="spinner-border text-primary " role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>):null
                            }
            
                            <input type="submit" className="btn btn-login float-right" disabled={loading}  value="Register" />
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Already have an SS-CHAIN account ? Please <Link to="/login">Login</Link>.
                        </div>
            
            
                        </form>
            
            
                    </div>
            
                </div>
            
            
                </div>
            </section>    
        </div>
        )
}