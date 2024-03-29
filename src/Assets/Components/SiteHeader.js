import React from "react";
import ProductSearchBar from '../Components/ProductSearchBar';
import ProductCart from '../Components/ProductCart';
import { useNavigate} from "react-router-dom";

import '../Styles/textStyles.css'
import '../Styles/SiteHeaderStyles.css'
import '../Styles/SiteFooterStyles.css'

import {CartContext, UserContext} from "../../App";
import useGetCart from "../Hooks/useGetCart";
import NavigationMenu from "./NavigationMenu";
import useWindowSize from "../Hooks/useWindowSize";
import Icon from "./Icon";

export default function SiteHeader({})
{
    const {user, setUser} = React.useContext(UserContext);
    const {cart, setCart} = React.useContext(CartContext);
    const navigate = useNavigate();
    const [fetchingCart, setFetchingCart] = useGetCart();
    const [size] = useWindowSize();

    React.useEffect(()=> {
        if(cart.requiresUpdate)
        {
            setFetchingCart(true);        
        }
    }, [cart, fetchingCart])
    React.useEffect(() => {}, [size])

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

    //Desktop Header
    if (size > 720)
    {
        return(
            <header className="site-header">
                <div className="icon-bar-group">
                    <Icon
                        maskUrl={`${process.env.PUBLIC_URL}Images/icon.png`}
                        style={{width:"40px",height:"40px"}} 
                    />
                    <ProductSearchBar
                        onSearch={(searchVal)=>{
                            navigate('/shop', {state: {search: searchVal}})
                            navigate(0)
                            window.scrollTo({top: 0, left: 0, behavior: "instant"})
                        }}
                    />
                </div>
                            
                <NavigationMenu />
                <div className="cart-group">
                    <div className="title-text" onClick={()=>{navigate('/login')}}>{LoggedIn() ? "Sign Out" : "Sign In"}</div>
                    <ProductCart/>
                </div>
            </header>
        )    
    }
    //Mobile Header
    else {
        return(
            <header className="site-header">
                <div className="icon-bar-group">
                    <Icon
                        maskUrl={`${process.env.PUBLIC_URL}Images/icon.png`}
                        style={{width:"40px",height:"40px"}} 
                    />
                    <div className="cart-group">
                        <div className="title-text" onClick={()=>{navigate('/login')}}>{LoggedIn() ? "Sign Out" : "Sign In"}</div>
                        <ProductCart/>
                    </div>       
                </div>
                     
                
                <NavigationMenu />
                
            </header>
        )    
    }
    
}