import React from "react"
import '../Styles/Pagination.css'
import '../Styles/textStyles.css'

export default function Pagination({itemsPerPage, totalItems, initialIndex, onChangeIndex})
{
    const [index, setIndex] = React.useState(initialIndex !== null && initialIndex !== undefined ? initialIndex : 0);

    const onClickPaginationButton = (num)=> {
        if(onChangeIndex !== null && onChangeIndex !== undefined)
        {
            onChangeIndex(num)
        }
    }

    const generateButtons = ()=> {
        let pages = Math.ceil(totalItems / itemsPerPage);
        let result = []
        
        //Current page
        let element = 
        (<div 
            className="current-pagination-box"
            key = {index}
        >
            <div className="title-text">{`${index+1}`}</div>
        </div>);
        result.push(element)

        let toEnd = pages - index - 1;
        switch(toEnd)
        {
            case 0:
                break;
            case 1: {
                let element2 = 
                (<div 
                    className="pagination-box"
                    key = {index + 1}
                    onClick={(e)=>{
                        e.preventDefault();
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                        onClickPaginationButton(index + 1)
                    }}
                >
                    <div className="title-text">{`${index+2}`}</div>
                </div>);
                result.push(element2);
                break;
            }
            case 2:{
                let element2 = 
                (<div 
                    className="pagination-box"
                    key = {index + 1}
                    onClick={(e)=>{
                        e.preventDefault();  
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})  
                        onClickPaginationButton(index + 1)
                    }}
                >
                    <div className="title-text">{`${index+2}`}</div>
                </div>);
                result.push(element2);

                let element3 = 
                (<div 
                    className="pagination-box"
                    key = {index + 2}
                    onClick={(e)=>{
                        e.preventDefault();
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                        onClickPaginationButton(index + 2)
                    }}
                >
                    <div className="title-text">{`${index+3}`}</div>
                </div>);
                result.push(element3);
                break;
            }
            default:{
                let element2 = 
                (<div 
                    className="pagination-box"
                    key = {index + 1}
                    onClick={(e)=>{
                        e.preventDefault();    
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                        onClickPaginationButton(index + 1)
                    }}
                >
                    <div className="title-text">{`${index+2}`}</div>
                </div>);
                result.push(element2);

                let element3 = 
                (<div 
                    className="pagination-dots"
                    key = {index + 2}
                >
                    <div className="title-text">{'...'}</div>
                </div>);
                result.push(element3);
                
                let element4 = 
                (<div 
                    className="pagination-box"
                    key = {index + 3}
                    onClick={(e)=>{
                        e.preventDefault();
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                        onClickPaginationButton(pages - 1)
                    }}
                >
                    <div className="title-text">{`${pages}`}</div>
                </div>);
                result.push(element4);
                
                break;
            }
        }

        let toStart =  index;
        switch(toStart)
        {
            case 0:
                break;
            case 1: {
                let element2 = 
                (<div 
                    className="pagination-box"
                    key = {index - 1}
                >
                    <div className="title-text">{`${index}`}</div>
                </div>);
                result.unshift(element2);
                break;
            }
            case 2:{
                let element2 = 
                (<div 
                    className="pagination-box"
                    key = {index -1}
                    onClick={(e)=>{
                        e.preventDefault();
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                        onClickPaginationButton(index - 1)
                    }}
                >
                    <div className="title-text">{`${index}`}</div>
                </div>);
                result.unshift(element2);

                let element3 = 
                (<div 
                    className="pagination-box"
                    key = {index - 2}
                    onClick={(e)=>{
                        e.preventDefault();
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                        onClickPaginationButton(index - 2)
                    }}
                >
                    <div className="title-text">{`${index - 1}`}</div>
                </div>);
                result.unshift(element3);
                break;
            }
            default:{
                let element2 = 
                (<div 
                    className="pagination-box"
                    key = {index - 1}
                    onClick={(e)=>{
                        e.preventDefault();
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                        onClickPaginationButton(index - 1);
                    }}
                >
                    <div className="title-text">{`${index}`}</div>
                </div>);
                result.unshift(element2);

                let element3 = 
                (<div 
                    className="pagination-dots"
                    key = {index - 2}
                >
                    <div className="title-text">{'...'}</div>
                </div>);
                result.unshift(element3);
                
                let element4 = 
                (<div 
                    className="pagination-box"
                    key = {index - 3}
                    onClick={(e)=>{
                        e.preventDefault();
                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                        onClickPaginationButton(0)
                    }}
                >
                    <div className="title-text">{`${1}`}</div>
                </div>);
                result.unshift(element4);
                
                break;
            }
        }

        let rightEndcap= 
        (<div 
            className = {`${toEnd === 0 ? 'pagination-endcap-unselectable' : 'pagination-endcap-button'}`}
            key = {pages + 1}
            onClick={(e)=>{
                if(toEnd !== 0)
                {
                    e.preventDefault();
                    window.scrollTo({top: 0, left: 0, behavior: "instant"})
                    onClickPaginationButton(index + 1)
                }                
            }}
        >
            <div className="title-text">{'Next'}</div>
        </div>);
        result.push(rightEndcap);
                
        let leftEndcap= 
        (<div 
            className = {`${toStart === 0 ? 'pagination-endcap-unselectable' : 'pagination-endcap-button'}`}
            key = {-1}
            onClick={(e)=>{
                if(toStart !== 0)
                {
                    e.preventDefault();
                    window.scrollTo({top: 0, left: 0, behavior: "instant"})
                    onClickPaginationButton(index - 1)
                }
            }}
        >
            <div className="title-text">{'Prev'}</div>
        </div>);
        result.unshift(leftEndcap);
                
        
                
        //pagination-endcap-button
        return result;
    }

    return (
        <div className="pagination-row">
            {generateButtons()}
        </div>
    )

}