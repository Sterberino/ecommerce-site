import React from "react";
import '../Styles/Checkbox.css'
import '../Styles/textStyles.css'

export default function({onValueChanged})
{
    const [onSale, setOnSale] = React.useState(false)

    return(
        <div className="filter-form">
           <div className="title-text">{"On Sale?"}</div>
           <div 
                className= {`check-box${onSale ? " checked": " unchecked"}`}
                onClick={()=>{
                    let saleVal = onSale;
                    setOnSale(prev=>!prev)
                    if(onValueChanged !== null && onValueChanged !== undefined)
                    {
                        onValueChanged(!saleVal);
                    }
                }
                }
            >
                <img src={`${process.env.PUBLIC_URL}/Images/Checkmark.png`}/>
           </div>
        </div>
    )
}