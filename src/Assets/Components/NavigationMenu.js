import { useNavigate} from "react-router-dom";

import '../Styles/textStyles.css'
import '../Styles/SiteHeaderStyles.css'
import '../Styles/SiteFooterStyles.css'

export default function NavigationMenu()
{
    const navigate = useNavigate();

    return(
        <div className="navigation-menu">
                    <div className="navigation-menu-item">
                        <div 
                            className="title-text"
                            onClick = {()=> {navigate('/')}}    
                        >
                        {"Home"}</div>
                    </div>
                    <div className="navigation-menu-item">
                        <div 
                            className="title-text"
                            onClick = {()=> {
                                navigate('/shop')
                                window.scrollTo({top: 0, left: 0, behavior: "instant"})
                            }}
                        >{"Shop"}</div>
                    </div>
                    <div 
                        className="navigation-menu-item"
                        onClick = {()=> {navigate('/about')}}
                    >
                        <div className="title-text">{"About"}</div>
                    </div>
                    <div className="navigation-menu-item">
                        <div 
                            className="title-text"
                            onClick = {()=> {navigate('/contact')}}
                        >{"Contact"}</div>
                    </div>
            </div>
        )
}