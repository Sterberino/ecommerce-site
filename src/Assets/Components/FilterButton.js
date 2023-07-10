import React from "react";
import '../Styles/FilterButton.css'
import { filterContext } from "./ProductViewPage";

export default function FilterButton()
{
    const {filterOpen, setFilterOpen} = React.useContext(filterContext);
    const ClickHandler = ()=> {
        let newVal = !filterOpen;
        setFilterOpen(newVal);
    }



    return(
        <div className="filter-button" onClick={()=> {ClickHandler()}}>
            <img src ={`${process.env.PUBLIC_URL}/Images/FilterIcon.png`}/>
        </div>
    )
}