import React from "react";
import '../Styles/SelectStyles.css'
import '../Styles/ProductViewPageStyles.css'

export default function DropDownMenu({dropDownText, onChangeState})
{
    const [open, setOpen] = React.useState(false);

    return(
        <div className="dropdown">
            <div
                className="selection-box"
                style = {{width: '100%', margin: '0'}}
                onClick={
                    ()=>{
                        setOpen(prev => {
                            onChangeState(!prev)
                            return !prev;
                        })
                }}  
            >
                {dropDownText}
                <img 
                    src = {`${process.env.PUBLIC_URL}/Images/Down-Arrow-Icon.png`} 
                    className= {`selection-box-arrow${open ? ' selection-box-arrow-focused': ''}`}
                />
            </div>
        </div>
    )


}