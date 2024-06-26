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
import '../Styles/BackgroundBlock.css';
import '../Styles/BackgroundElements.css';
import HomepageMidsection from "./HomepageMidsection";

export default function Homepage()
{
    window.scrollTo({top: 0, left: 0, behavior: "instant"})
    return(
        <div>
            <SiteHeader />
            <HomepageHero 
                navigationState = {{sort: 'createdat', sortMode: 'DESC'}}
            />
            <div className="background-block">
                <div 
                    className="title-text"
                    style = {{
                        fontSize : '1.3em'
                    }}
                >{"New Arrivals"}</div>
                <HomepageCarouselWrapper params={{sort: 'createdat', sortMode: 'DESC', limit: '10'}}/>
            </div>

            <HomepageMidsection 
                navigationState = {{sort: 'numpurchases', sortMode: 'DESC'}}
            />

            <section className="background-block">
                <div 
                    className="title-text"
                    style = {{
                        fontSize : '1.3em'
                    }}
                >{"Most Popular"}</div>
                <HomepageCarouselWrapper params={{ sort: 'numpurchases', sortMode: 'DESC', limit: '10' }} />
            </section>

            <OurStory />
            <SiteFooter />
        </div>
    )
}