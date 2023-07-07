import React from "react";
import '../Styles/SearchBarStyles.css'

export default function PriceFilter({onValuesChange})
{
    const [inputMin, setInputMin] = React.useState("");
    const [inputMax, setInputMax] = React.useState("");

    const Inputs = ()=> {
        return (
            <form 
                className="filter-form"
            >
                <div 
                    className="input-field"
                    style ={{marginRight: "10px"}}
                >
                <input 
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
                            if(onValuesChange !== null && onValuesChange !== undefined)
                            {
                                onValuesChange({min: filtered, max: inputMax})
                            }
                        }
                    }}
                ></input>

                </div>
                
                <div  
                    className="input-field"
                    style ={{marginLeft: '10px'}}
                >
                <input 
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
                            if(onValuesChange !== null  && onValuesChange !== undefined)
                            {
                                onValuesChange({min: inputMin, max: filtered})
                            }
                        }
                    }}
                ></input>
                </div>
                
            </form>
        )
    }



    return(
        Inputs()
    )
}