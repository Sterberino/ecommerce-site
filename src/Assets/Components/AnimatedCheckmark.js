import React from "react";
import '../Styles/AnimatedCheckmark.css'

export default function AnimatedCheckmark({style, color})
{
    return (
        <div style = {{...style}}>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                enableBackground="new 0 0 24 24" 
                id="Layer_1" 
                version="1.0" 
                viewBox="0 0 24 24" 
            >
                    <polyline className="path" fill="none" points="20,6 9,17 4,12" stroke={color !== null && color !== undefined ? `${color}`: 'rgba(255, 255, 255, 1)'} strokeMiterlimit="10" strokeWidth="2"/>
            </svg>
        </div>
        
    )


}