import React from "react";
import ProductSearchBar from '../Components/ProductSearchBar';
import ProductCart from '../Components/ProductCart';
import { useNavigate} from "react-router-dom";

import '../Styles/textStyles.css'
import '../Styles/SiteHeaderStyles.css'
import '../Styles/SiteFooterStyles.css'

import {CartContext, UserContext} from "../../App";
import useGetCart from "../Hooks/useGetCart";

export default function SiteHeader({})
{
    const {user, setUser} = React.useContext(UserContext);
    const {cart, setCart} = React.useContext(CartContext);
    const navigate = useNavigate();
    const [fetchingCart, setFetchingCart] = useGetCart();


    React.useEffect(()=> {
        if(cart.requiresUpdate)
        {
            setFetchingCart(true);        
        }
    }, [cart, fetchingCart])

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

    return(
        <div>
            <div className="site-header">
                <ProductSearchBar
                    onSearch={(searchVal)=>{
                        navigate('/shop', {state: {search: searchVal}})
                        navigate(0)
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                    }}
                />
                <div className='title-text'>Bored Ape Escape</div>
                <div className="cart-group">
                    <div className="title-text" onClick={()=>{navigate('/login')}}>{LoggedIn() ? "Sign Out" : "Sign In"}</div>
                    <ProductCart/>
                </div>
            </div>
            
            <div className="navigation-menu">
                <div className="navigation-menu-item">
                    <div 
                        className="title-text"
                        onClick = {()=> {navigate('/')}}    
                    >
                    {"Home"}</div>
                </div>
                <div className="navigation-menu-item">
                    <div 
                        className="title-text"
                        onClick = {()=> {
                            navigate('/shop')
                            window.scrollTo({top: 0, left: 0, behavior: "instant"})
                        }}
                    >{"Shop"}</div>
                </div>
                {/* <div className="navigation-menu-item">
                    <div className="title-text">{"News & Events"}</div>
                </div>*/}
                <div 
                    className="navigation-menu-item"
                    onClick = {()=> {navigate('/about')}}
                >
                    <div className="title-text">{"About"}</div>
                </div>
                <div className="navigation-menu-item">
                    <div 
                        className="title-text"
                        onClick = {()=> {navigate('/contact')}}
                    >{"Contact"}</div>
                </div>
            </div>
     
        </div>
    )
}