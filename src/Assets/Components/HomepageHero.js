import React from "react";
import { useNavigate } from "react-router-dom";
import HomepageCard from "./HomepageCard";
import HomepageCardsWrapper from "./HomepageCardsWrapper";


export default function HomepageHero({navigationState})
{
    const navigate = useNavigate();

    return(
        <section className="homepage-hero">
            <div className="hero-column">
                <h1 className="hero-title">Discover Collect And Sell Extraordinary <span className="pretty-gradient-text">NFT</span> Art</h1>
                <p className="hero-paragraph">NFTs, or Non-Fungible Tokens, are unique digital assets on a blockchain, verifying ownership of items like art. Unlike cryptocurrencies, NFTs can't be traded one-to-one. They revolutionize digital ownership, letting creators monetize their work. Join the NFT revolution now!</p>
                <button 
                    className="hero-button"
                    onClick={()=> {
                        navigate('/shop', {state: navigationState})
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                    }}
                >{"SHOP NOW"}</button>
            </div>
            
            <HomepageCardsWrapper />
            <div className="blob" style={{translate: "-130% 30%",borderRadius: "100% 75% 92% 74% / 60% 80% 30% 70%"}}></div>
        </section>
    )

}