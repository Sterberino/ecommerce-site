import React from "react";
import { ProductsContext } from "../../App.js";


export default function useGetProducts()
{
    const[fetchingProducts, setFetchingProducts] = React.useState(true);
    const[queryParams, setQueryParams] = React.useState({})
    const {products, setProducts} = React.useContext(ProductsContext);
   
    const GetQueryString = ()=>{
        let queryString = new URLSearchParams(queryParams).toString();        
        if(queryString === '')
        {
            return queryString;
        }

        const objString = '?' + queryString;
        console.log(objString)
        return objString;
    }

    React.useEffect(()=>{    
        if(fetchingProducts || products.requiresUpdate)
        {
            fetch(`../api/v1/products${GetQueryString()}`, 
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then(res => {
                const{payload} = res;
                setProducts({
                    requiresUpdate: false,
                    products : payload
                })
            })
            .then(()=> {
                setFetchingProducts(false);
            })
        }
    }, [fetchingProducts])

    return [fetchingProducts, setFetchingProducts, queryParams, setQueryParams];
}