import '../Styles/textStyles.css';
import '../Styles/HomepageHeroStyles.css';
import '../Styles/SiteFooterStyles.css';
import '../Styles/BackgroundElements.css';
import "../Styles/ApplyFilterButton.css";
import "../Styles/HomepageCard.css";

export default function HomepageCard({imageUrl, style, title})
{
    return(
        <div className="homepage-card-wrapper" style={{...style}}>
            <div className="homepage-card">
                <div className="homepage-card-face">
                    <div className="homepage-card-header">
                        <h3 className="homepage-card-title homepage-card-title-left">{title}</h3>
                        <h3 className="homepage-card-title homepage-card-title-right">...</h3>
                    </div>
                    
                    <img className="homepage-card-image" src={`${process.env.PUBLIC_URL}/Images/${imageUrl}`}></img>
                    <div className="hero-button">Shop Now</div>
                </div>
            </div>
        </div>
    )
}