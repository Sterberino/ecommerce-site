import React from "react"
import '../Styles/Pagination.css'
import '../Styles/textStyles.css'

export default function Pagination({itemsPerPage, totalItems, initialIndex})
{
    const [index, setIndex] = React.useState(initialIndex !== null && initialIndex !== undefined ? initialIndex : 0);

    const generateButtons = ()=> {
        let pages = Math.ceil(totalItems / itemsPerPage);
        let result = []

        for(let i = 0; i < pages; i++)
        {
            let element = 
            (<div 
                className="pagination-box"
                key = {i}
            >
                <div className="title-text">{`${i+1}`}</div>
            </div>);
            result.push(element)
        }

        return result;
    }

    return (
        <div className="pagination-row">
            {generateButtons(9, 70)}
        </div>
    )

}