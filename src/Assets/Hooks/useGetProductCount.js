import React from "react";


export default function useGetProductCount(initialVal = null)
{
    const[fetchingCount, setFetchingCount] = React.useState(true);
    const[countQueryParams, setCountQueryParams] = React.useState(initialVal === null ? {} : initialVal)
    const [countResults, setCountResults] = React.useState(null);
 
    const GetQueryString = ()=>{
        let query = {...countQueryParams};
        delete query.limit;
        let queryString = new URLSearchParams(query).toString();        
        if(queryString === '')
        {
            return queryString;
        }
        const objString = '?' + queryString;
        return objString;
    }

    React.useEffect(()=>{    
        if(fetchingCount)
        {
            fetch(`../api/v1/products/productcount${GetQueryString()}`, 
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then(res => {
                const{entries} = res;
                setCountResults(entries)
            })
            .then(()=> {
                setFetchingCount(false);
            })
        }
    }, [fetchingCount])

    return [fetchingCount, setFetchingCount, 
            countQueryParams, setCountQueryParams,
            countResults
        ];
}

