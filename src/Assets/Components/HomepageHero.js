import React from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/textStyles.css'
import '../Styles/HomepageHeroStyles.css'
import '../Styles/SiteFooterStyles.css'

export default function HomepageHero({imageUrl, title, navigationState})
{
    const navigate = useNavigate();

    return(
        <div className="homepage-hero">
            <img src={imageUrl}/>
            <div className="homepage-hero-title">
                <div className="title-text">
                    {title}
                </div>

                <div 
                    className="title-text"
                    onClick={()=> {
                        navigate('/shop', {state: navigationState})
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                    }}
                >{"SHOP NOW"}</div>
            </div>
            <div className="footer-divider-bar"></div>
        </div>
    )

}