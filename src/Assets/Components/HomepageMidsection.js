import React from "react";
import { useNavigate } from "react-router-dom";
import HomepageCard from "./HomepageCard";
import HomepageCardsWrapper from "./HomepageCardsWrapper";
import HomepageCardsWrapperAlt from "./HomepageCardsWrapperAlt";


export default function HomepageMidsection({navigationState})
{
    const navigate = useNavigate();

    return(
        <section className="homepage-midsection">
            <div className="hero-column">
                <h1 className="hero-title"><span className="pretty-gradient-text">NFT</span>s Protect You Against Inflation </h1>
                <p className="hero-paragraph">NFTs, with their scarcity and independence from traditional markets, serve as a hedge against inflation due to their limited supply and decentralized nature on blockchain technology, making them valuable for diversifying investments and safeguarding against economic uncertainty.</p>
                <button 
                    className="hero-button"
                    onClick={()=> {
                        navigate('/shop', {state: navigationState})
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                    }}
                >{"SHOP NOW"}</button>
            </div>
            
            <HomepageCardsWrapperAlt />
            <div className="blob" style={{translate: "85% -20%",borderRadius: "100% 75% 92% 74% / 60% 80% 30% 70%"}}></div>
        </section>
    )

}