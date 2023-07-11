import React from "react";
import { ProductsContext } from "../../App.js";


export default function useGetProducts(initialVal = null)
{
    const[fetchingProducts, setFetchingProducts] = React.useState(true);
    const[queryParams, setQueryParams] = React.useState(initialVal === null ? {} : initialVal)
    const [results, setResults] = React.useState(null);
    const {products, setProducts} = React.useContext(ProductsContext);
   
    const GetQueryString = ()=>{
        let queryString = new URLSearchParams(queryParams).toString();        
        if(queryString === '')
        {
            return queryString;
        }
        const objString = '?' + queryString;
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
                setResults({
                    requiresUpdate: false,
                    products : payload
                })
            })
            .then(()=> {
                setFetchingProducts(false);
            })
        }
    }, [fetchingProducts])

    return [fetchingProducts, setFetchingProducts, 
            queryParams, setQueryParams,
            results
        ];
}
