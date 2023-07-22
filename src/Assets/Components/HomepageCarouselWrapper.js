import React from "react";
import useGetProducts from "../Hooks/useGetProducts";
import Carousel from "./Carousel";
import BlackMirrorSpinner from "./BlackMirrorSpinner";
import CarouselProductCard from "./CarouselProductCard";

export default function HomepageCarouselWrapper({params})
{
    const[fetchingProducts, setFetchingProducts] = React.useState(true);
    const [results, setResults] = React.useState(null);

    const GetCarouselContents =()=>{
        const res = results.products.slice(0, 10).map((current, i) => {
            return (
                <CarouselProductCard 
                    key = {i}
                    product = {current}
                />
            )
        });

        return res;
    }

    
    const GetQueryString = ()=>{
        let queryString = new URLSearchParams(params).toString();        
        if(queryString === '')
        {
            return queryString;
        }

        const objString = '?' + queryString;
        return objString;
    }

    React.useEffect(()=>{    
        if(fetchingProducts)
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

    if(fetchingProducts)
    {
        return <BlackMirrorSpinner style = {{
            width: '100%',
            justifyContent: 'center'}} 
        />
    }
    else{
        
        return <Carousel carouselContents = {GetCarouselContents()}/>
    }
}