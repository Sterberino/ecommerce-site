import React from "react";
import '../Styles/SearchBarStyles.css'
import { clear } from "@testing-library/user-event/dist/clear";

export default function PurchasesFilter()
{
    const [inputMin, setInputMin] = React.useState("");
    const [inputMax, setInputMax] = React.useState("");

    const Inputs = ()=> {
        return (
            <form 
                className="search-bar"
                style = {{
                    marginTop: "1px",
                    width: `${100 / 0.85}%`
                }}
            
            >
                <input 
                    style ={{width: '100%', left: '0', margin: '0', marginRight: "10px"}}
                    value={`${inputMin}`}
                    type="text"
                    pattern="[0-9]*"
                    onChange={(e)=> {
                        e.target.validity.valid ? setInputMin(e.target.value) : setInputMin(inputMin);
                    }}
                ></input>

                <input 
                    style ={{width: '100%', left: '0', margin: '0'}}
                    value={`${inputMax}`}
                    type="text"
                    pattern="[0-9]*"
                    onChange={(e)=> {
                        e.target.validity.valid ? setInputMax(e.target.value) : setInputMax(inputMax);
                    }}
                ></input>
            </form>
        )
    }



    return(
        <div>
            {Inputs()}
        </div>
    )
}