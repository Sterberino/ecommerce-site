import React from "react"
import '../Styles/ApplyFilterButton.css'
import '../Styles/textStyles.css'
import { queryContext, filterContext } from "./ProductViewPage"


export default function ApplyFilterButton()
{
    const{filterOpen, setFilterOpen} = React.useContext(filterContext);
    const {queryValues, setQueryValues} = React.useContext(queryContext);
    //TODO: Add callback for updating query context
    const handleClick = ()=> {
        let query = {
            ...queryValues
        };
        query.appliedQuery = query.unappliedQuery;
        query.unappliedQuery = {};
        query.requiresRefresh = true;
        
        setQueryValues(query);
        setFilterOpen(false);
    }

    return(
        <div 
            className="apply-filter-button"
            onClick={()=>{handleClick()}}
        >
            <div className="title-text">{"Apply"}</div>
        </div>
    )

}