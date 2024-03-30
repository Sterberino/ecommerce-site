import React from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/textStyles.css'
import '../Styles/HomepageHeroStyles.css'
import '../Styles/SiteFooterStyles.css'
import '../Styles/BackgroundElements.css'

export default function HomepageHero({imageUrl, title, navigationState})
{
    const navigate = useNavigate();

    return(
        <section className="homepage-hero">
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

            <div className="background-grid"></div>
            <div className="blob"></div>
            <div className="blob" style={{translate: "-130% 30%",borderRadius: "100% 75% 92% 74% / 60% 80% 30% 70%"}}></div>
        </section>
    )

}