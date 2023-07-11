import React from "react";
import '../Styles/SearchBarStyles.css'

export default function PriceFilter({onValuesChange, initialMin, initialMax})
{
    const [inputMin, setInputMin] = React.useState(initialMin !== undefined && initialMin !== null  ? initialMin : "");
    const [inputMax, setInputMax] = React.useState(initialMax !== undefined && initialMax !== null  ? initialMax : "");

    const Inputs = ()=> {
        return (
            <div className="filter-form-wrapper">
            <form 
                className="filter-form"
            >
                <div 
                    className="input-field"
                    style ={{paddingRight: "10px"}}
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
                    style ={{paddingLeft: '10px'}}
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
            </div>
        )
    }



    return(
        Inputs()
    )
}