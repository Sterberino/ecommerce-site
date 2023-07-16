import React from "react";

import { UserContext } from "../../App";

export default function useGetCurrentUser()
{
    const {user, setUser} = React.useContext(UserContext);

    React.useEffect(()=> {
        const fetchUser = async()=>{
            try {
                const data = await fetch('../api/v1/auth/getcurrentuser', {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })

                if(data.status !== 200)
                {
                    throw new Error(data.status);
                }
                const json = await data.json();

                return json;
            }
            catch(err){
                throw err;
            }
        }

        if(localStorage.getItem('token') && (user.username === null || user.username === undefined))
        {
            fetchUser().then(res => {
                if(Boolean(res.useristempuser) === false)
                {
                    let userRes = {...res};
                    delete userRes.token;
                    
                    setUser(userRes);        
                }
            })
        }
    })
}