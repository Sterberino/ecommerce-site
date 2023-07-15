import React from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Carousel from "./Carousel";
import '../Styles/textStyles.css'
import CarouselProductCard from "./CarouselProductCard";
import HomepageHero from "./HomepageHero";
import OurStory from "./OurStory";
import useGetProducts from "../Hooks/useGetProducts";
import { ProductsContext } from "../../App";
import Spinner from "./Spinner";
import BlackMirrorSpinner from "./BlackMirrorSpinner";
import HomepageCarouselWrapper from "./HomepageCarouselWrapper";
export default function Homepage()
{
    const[fetchingProducts, setFetchingProducts] = useGetProducts();
    const {products, setProducts} = React.useContext(ProductsContext);

    window.scrollTo({top: 0, left: 0, behavior: "instant"})

    React.useEffect(()=> {}, [fetchingProducts])

    const carouselContents = products.products.slice(0, 10).map((current, i) => {
        return (
            <CarouselProductCard 
                key = {i}
                product = {current}
            />
        )
    });

    if(fetchingProducts)
    {
        return(
            <div>
                <SiteHeader />
                <BlackMirrorSpinner style = {{
                    width: '100%',
                    justifyContent: 'center'
                }}/>
                <SiteFooter />
            </div>
        )
    }

    return(
        <div>
            <SiteHeader />

            <HomepageHero 
                imageUrl = {`${process.env.PUBLIC_URL}/Images/Monke.png`}
                title={"Brand New Brands"}
                navigationState = {{sort: 'createdat', sortMode: 'DESC'}}
            />
            <div>
                <div 
                    className="title-text"
                    style = {{
                        fontSize : '1.3em'
                    }}
                >{"New Arrivals"}</div>
                <HomepageCarouselWrapper params={{sort: 'createdat', sortMode: 'DESC', limit: '10'}}/>
            </div>

            <HomepageHero 
                imageUrl = {`${process.env.PUBLIC_URL}/Images/Monke2.png`}
                title={"Best Sellers"}
                navigationState = {{sort: 'numpurchases', sortMode: 'DESC'}}
            />

            <div>
                <div 
                    className="title-text"
                    style = {{
                        fontSize : '1.3em'
                    }}
                >{"Most Popular"}</div>
                <HomepageCarouselWrapper params={{sort: 'numpurchases', sortMode: 'DESC', limit: '10'}}/>
            </div>

            <OurStory />
            <SiteFooter />
        </div>
    )
}