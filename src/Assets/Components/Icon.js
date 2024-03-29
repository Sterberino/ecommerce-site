import React from "react";
import '../Styles/IconImage.css'

export default function Icon({style, maskUrl, HandleClick})
{
    return (
        <div 
            onClick={()=>{if(HandleClick !== null && HandleClick !== undefined){HandleClick()}}}
            className="icon-button-border"
            style = {{
                ...style,
            }}
        >  
            <div 
                className= {`icon-button`} 
                style = {{
                    maskImage: `url(${process.env.PUBLIC_URL}/${maskUrl})`,
                    WebkitMaskImage: `url(${process.env.PUBLIC_URL}/${maskUrl})`
                }}
            >
            </div>

        </div>
    )
}