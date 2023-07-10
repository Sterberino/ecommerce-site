import React from "react";
import '../Styles/textStyles.css'
import '../Styles/ProductFilterHeader.css'
import SortByDropdown from './SortByDropdown.js'
import Select from "./Select";
import useWindowSize from "../Hooks/useWindowSize";
import FilterButton from "./FilterButton";

export default function ProductFilterHeader({})
{
    const [windowWidth, windowHeight] = useWindowSize();
    
    return(
        <div className="product-filter-header">
            
            {windowWidth > 640 ? <div className="title-text">{'Filter By:'}</div> : <FilterButton/>}
            <Select 
                style = {{
                    width: '160px'
                }}
                options = {[
                    'A-Z',
                    'Price (High-Low)',
                    'Price (Low-High)',
                    'Latest',
                    'Most Popular'
                ]}
            />
        </div>
    )
}