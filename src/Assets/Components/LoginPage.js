import React from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Login from "./Login"

import '../Styles/SingleProductPage.css'
import '../Styles/loginStyles.css'

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function LoginPage(){
    const {user, setUser} = React.useContext(UserContext);
    
    const navigate = useNavigate();
    const LoggedIn = ()=> {
        if(localStorage.getItem('token') 
        && (user.username !== null && user.username !== undefined) 
        && Boolean(user.useristempuser) === false)
        {
            return true;
        }
        else{
            return false;
        }
    }

    const Logout = ()=> {
        localStorage.clear('token')
        setUser({});
        navigate('/')
    }

    if(!LoggedIn())
    {
        return(

            <div>
                <SiteHeader/>
                <div className="twoColumns" style = {{minHeight: 'max-content'}}>
                    <Login/>
                    <div className="login-divider-bar"></div>
                    <div 
                        className="login-form-container"
                        style = {{alignItems: 'start', display: 'flex', justifyContent: 'start'}}
                    >
                        <div 
                            className="title-text"
                            style = {{
                                marginTop: "20px",
                                marginLeft: "0",
                                fontSize: "1.5em"
                            }}
                        >{"Guest Checkout"}</div>
                        <div 
                            className="basic-text"
                            style = {{
                                minWidth: '100%',
                                marginLeft: '0px',
                                fontSize: '0.8em'
                            }}
                        >
                            {"You can check out without creating an account. You'll have a chance to create an account later."}
                        </div>
                        <form 
                            onSubmit={(event)=> {
                                event.preventDefault()
                            }}
                            className = "login-input-form"
                        >
                    
                            <input 
                                style = {{width: 'min-content'}}
                                type = "submit"
                                value={"Continue As Guest"}
                                onClick={()=>{navigate('/cart')}}
                            ></input>
                        </form>
                    </div>
                </div>
                <SiteFooter/>
            </div>
        )
    }
    else{
        return (
            <div >
                <SiteHeader/>
                <div 
                    className="login-form-container"
                    style = {{alignItems: 'start', display: 'flex', justifyContent: 'center', width: '200px', left: 'calc(50% - 100px)'}}
                >
                    <div 
                        className="title-text"
                        style = {{
                            marginTop: "20px",
                            marginLeft: "0",
                            fontSize: "1.5em",
                            textAlign: 'left'
                        }}
                    >{`Would you like to sign out, ${user.username}?`}</div>
                    <div 
                        className="basic-text"
                        style = {{
                            minWidth: '100%',
                            marginLeft: '0px',
                            fontSize: '0.8em'
                        }}
                    >
                        {"You can always sign back in or check out as a guest if you'd like."}
                    </div>
                    <form 
                        onSubmit={(event)=> {
                            event.preventDefault()
                        }}
                        className = "login-input-form"
                    >
                
                        <input 
                            style = {{width: 'min-content'}}
                            type = "submit"
                            value={"Sign Out"}
                            onClick={()=>{Logout()}}
                        ></input>
                    </form>
                </div>
                <SiteFooter/>
            </div>
        )
    }
   
}