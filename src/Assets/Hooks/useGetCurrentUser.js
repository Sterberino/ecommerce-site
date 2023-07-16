import React from "react";

import { UserContext } from "../../App";

export default function useGetCurrentUser()
{
    const {user, setUser} = React.useContext(UserContext);

    React.useEffect(()=> {
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

        fetchUser();
    })
}