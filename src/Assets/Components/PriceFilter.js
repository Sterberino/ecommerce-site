import React from "react";
import '../Styles/SearchBarStyles.css'
import { clear } from "@testing-library/user-event/dist/clear";

export default function PriceFilter()
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
                    value={`$${inputMin}`}
                    type="text"
                    onChange={(e)=> {
                        let filtered = e.target.value.replace(/[^0-9.]/gi, "");
                        let hasDecimal = false;
                        if(filtered.at(filtered.length - 1) === ".")
                        {
                            for(let i = 0; i < filtered.length -1; i++)
                            {
                                if(filtered[i] === ".")
                                {
                                    hasDecimal = true;
                                    break;
                                }
                            }
                        }

                        if(!hasDecimal)
                        {
                            setInputMin(filtered);
                        }
                    }}
                ></input>

                <input 
                    style ={{width: '100%', left: '0', margin: '0'}}
                    value={`$${inputMax}`}
                    type="text"
                    pattern="[0-9]*"
                    onChange={(e)=> {
                        let filtered = e.target.value.replace(/[^0-9.]/gi, "");
                        let hasDecimal = false;
                        if(filtered.at(filtered.length - 1) === ".")
                        {
                            for(let i = 0; i < filtered.length -1; i++)
                            {
                                if(filtered[i] === ".")
                                {
                                    hasDecimal = true;
                                    break;
                                }
                            }
                        }

                        if(!hasDecimal)
                        {
                            setInputMax(filtered);
                        }
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