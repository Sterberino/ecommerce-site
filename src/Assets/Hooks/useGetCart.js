import React from "react";

//Import cart context
import { CartContext, UserContext } from "../../App";

//If we don't have a stored token, we Create a temp user, then we can fetch cart items for the user.
export default function useGetCart()
{
    const {cart, setCart} = React.useContext(CartContext)
    const {user, setUser} = React.useContext(UserContext);

    const[fetchingCart, setFetchingCart] = React.useState(true);

    React.useEffect(()=>{    
        const createTempUser = async()=>{
            try{
                const data = await fetch('../api/v1/auth/tempUser', 
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                
                const json = await data.json();
                localStorage.setItem('token', json.token);  
                
                return json;
            }
            catch(err)
            {
                console.log(err);
                throw err;
            }
            
        }

        const fetchData = async()=> {
            try
            {
                const data = await fetch('../api/v1/cart', 
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                    
                })
    
                const json = await data.json();
                return json;
            }
            catch(err)
            {
                console.log(err);
                throw err;
            }
        
        }

        const fetchUser = async()=>{
            let token = localStorage.getItem('token')
            if(token && token !== undefined && token !== null && (user.username === null || user.username === undefined))
            {
                try {
                    const data = await fetch('../api/v1/auth/getcurrentuser', {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization" : `Bearer ${localStorage.getItem('token')}`
                        }
                    })
    
                    const json = await data.json();
                    let userRes = {...json};
                    delete userRes.token;
                    setUser(userRes);
                    return json;
                }
                catch(err){
                    console.log(`${err.message}`)
                }
            }
        }

        if(fetchingCart || cart.requiresUpdate)
        {
            //Not logged in
            if(!localStorage.getItem('token') || localStorage.getItem('token') === undefined)
            {
                const res = createTempUser().then((res)=> {
                    fetchUser().then(
                        res => {
                            fetchData().then(res=> {
                                setCart({cartItems: res.payload, requiresUpdate: false})
                                setFetchingCart(false)
                            }).catch(err => {console.log(err)})
                        }
                    )
                }).catch(err => {console.log(err)})
            }
            else{
                fetchUser().then(res => {
                    fetchData().then(res=> {
                        setCart( prev => ({cartItems: res.payload, requiresUpdate: false}))
                        setFetchingCart(false)
                    }).catch(err => {console.log(err)})
                }).catch(err => {console.log(err)})

            }
        }
    }, [fetchingCart, cart])

    return [fetchingCart, setFetchingCart];
}