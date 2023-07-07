import React from "react";
import '../Styles/SearchBarStyles.css'
import { clear } from "@testing-library/user-event/dist/clear";

export default function PurchasesFilter({onValuesChange})
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
                    value={`${inputMin}`}
                    type="text"
                    pattern="[0-9]*"
                    placeholder="Min"
                    onChange={(e)=> {
                        if(e.target.validity.valid)
                        {
                            setInputMin(e.target.value)
                            if(onValuesChange !== null  && onValuesChange !== undefined)
                            {
       
                                onValuesChange({min: e.target.value, max: inputMax})
                            }
                        } 
                        else{
                            setInputMin(inputMin);
                        }
                    }}
                    ></input>
                </div>
                
                <div 
                    className="input-field"
                    style ={{marginLeft: "10px"}}
                >
                    <input 
                    value={`${inputMax}`}
                    type="text"
                    pattern="[0-9]*"
                    placeholder="Max"
                    onChange={(e)=> {
                        if(e.target.validity.valid)
                        {
                            setInputMax(e.target.value)
                            if(onValuesChange !== null  && onValuesChange !== undefined)
                            {
                                onValuesChange({min: inputMin, max: e.target.value})
                            }
                        }    
                        else{
                            setInputMax(inputMax);
                        } 
                    }}
                    ></input>
                </div>
                
            </form>
        )
    }



    return(
        <div>
            {Inputs()}
        </div>
    )
}