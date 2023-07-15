import React from "react";
import '../Styles/textStyles.css'
import '../Styles/ProductFilterHeader.css'
import SortByDropdown from './SortByDropdown.js'
import Select from "./Select";
import useWindowSize from "../Hooks/useWindowSize";
import FilterButton from "./FilterButton";

import { queryContext } from "./ProductViewPage";

export default function ProductFilterHeader({})
{
    const [windowWidth, windowHeight] = useWindowSize();
    const {queryValues, setQueryValues} = React.useContext(queryContext);

    const HandleSelectionChange = (val)=>{
        let sort = null;
        let sortMode = null;

        //We map the incoming text to an appropriate postgres query parameter
        switch(val)
        {
            case  'A-Z':
                sort = 'productname';
                sortMode = 'ASC';
                break;
            case 'Price (High-Low)':
                sort = 'productprice';
                sortMode = 'DESC';      
                break;
            case 'Price (Low-High)':
                sort = 'productprice';
                sortMode = 'ASC';  
                break;
            case 'Latest':
                sort = 'createdat'; 
                sortMode = 'DESC';
                break;
            case 'Most Popular':
                sort = 'numpurchases';
                sortMode = 'DESC';  
                break;
            //Something went wrong, don't apply changes
            default:
                break;
        }

        if(sort !== null)
        {
            let query = {
                ...queryValues
            }

            query.appliedQuery.sort = sort;
            query.appliedQuery.sortMode = sortMode;
            query.appliedQuery.offset = 0;
            query.unappliedQuery.offset = 0;
            query.requiresRefresh = true;
            setQueryValues(query);
        }
    }

    const EvaluateInitialText = ()=>{
        if(queryValues.appliedQuery.sort && queryValues.appliedQuery.sortMode)
        {
            switch(queryValues.appliedQuery.sort)
            {
                case 'productprice':
                    if(queryValues.appliedQuery.sortMode === 'ASC')
                    {
                        return 'Price (Low-High)';
                    }
                    else{
                        return 'Price (High-Low)';
                    }
                case 'productname':
                    return 'productname'
                case 'createdat':
                    return 'Latest';
                case 'numpurchases':
                    return 'Most Popular';
                default:
                    return null;
            }
        }
        return null;
    }

    return(
        <div className="product-filter-header">
            
            {windowWidth > 640 ? <div className="title-text">{'Filter By:'}</div> : <FilterButton/>}
            <Select 
                initialText={EvaluateInitialText()}
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
                onChangeSelection={(val)=> {HandleSelectionChange(val)}}
            />
        </div>
    )
}