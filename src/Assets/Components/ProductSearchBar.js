import React from "react";

import "../Styles/SearchBarStyles.css"

export default function ProductSearchBar({onSearch, hideSearchIcon, style, initialText, updateOnTextChange})
{
    const [searchInput, setSearchInput] = React.useState(initialText ? `${initialText}` : "");
    const [hideIcon, setHideIcon] = React.useState(hideSearchIcon ? hideSearchIcon : false);

    return(
        <form 
            style= {{...style}}
            className="search-bar"
            onSubmit={(e)=>{
                e.preventDefault();
                if(onSearch !== null && onSearch !== undefined)
                {
                    onSearch(searchInput);
                }
            }}
            >
            <input 
                type="text"
                value={searchInput}
                size={"5"}
                placeholder = "Search Products"
                onChange={(e)=>{
                    e.preventDefault();
                    setSearchInput(e.target.value)
                    if(updateOnTextChange === true)
                    {
                        if(onSearch !== null && onSearch !== undefined)
                        {
                            onSearch(e.target.value)
                        }
                    }
                }}
            >
            </input>
            {!hideIcon && <img 
                src={`${process.env.PUBLIC_URL}Images/search-icon.png`}
                onClick={()=>{
                    if(onSearch !== null && onSearch !== undefined)
                    {
                        onSearch(searchInput);
                    }
                }}    
            />}
        </form>
    )
}