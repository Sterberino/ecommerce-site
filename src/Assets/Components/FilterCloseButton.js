import React from "react";
import { filterContext } from "./ProductViewPage";
import '../Styles/FilterButton.css'

export default function FilterCloseButton()
{
    const {filterOpen, setFilterOpen} = React.useContext(filterContext);
    const ClickHandler = ()=> {
        setFilterOpen(false);
    }



    return(
        <div className="filter-button filter-close-button" onClick={()=> {ClickHandler()}}>
            <img src ={`${process.env.PUBLIC_URL}/Images/x-icon.png`}/>
        </div>
    )
}