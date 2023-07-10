import React, { useState } from 'react';
import ProductViewPage from "./ProductViewPage";
import "../Styles/ProductViewPageStyles.css";
import DropDownMenu from './DropdownMenu';
import PriceFilter from './PriceFilter';
import PurchasesFilter from './PurchasesFilter';
import OnSaleFilter from './OnSaleFilter';
import { filterContext } from './ProductViewPage';
import useWindowSize from '../Hooks/useWindowSize';
import FilterCloseButton from './FilterCloseButton';
export default function ProductFilter({filters, setFilters})
{
    const {filterOpen, setFilterOpen} = React.useContext(filterContext);
    const [windowWidth, windowHeight] = useWindowSize();

    const [priceFilterOpen, setPriceFilterOpen] = React.useState(false);
    const [purchasesFilterOpen, setPurchasesFilterOpen] = React.useState(false);
    const [onSaleFilterOpen, setOnSaleFilterOpen] = React.useState(false);

    const [QueryFields, setQueryFields] = React.useState(null);


    const HandlePurchasesChange = (values)=>{
        let minPurchases = values.min === "" ? null : values.min; 
        let maxPurchases = values.max === "" ? null : values.max; 
    
        let query = {
            ...QueryFields,
        }
        if(minPurchases !== null)
        {
            query.minPurchases = minPurchases;
        }
        else{
            delete query.minPurchases;
        }
        if(maxPurchases !== null)
        {
            query.maxPurchases = maxPurchases;
        }
        else{
            delete query.maxPurchases;
        }
        console.log(JSON.stringify(query))
        setQueryFields(query);
    }

    const HandlePriceChange = (values) => {
        let minPrice = values.min === "" ? null : values.min; 
        let maxPrice = values.max === "" ? null : values.max; 

        let query = {
            ...QueryFields,
        }
        if(minPrice !== null)
        {
            query.minPrice = minPrice;
        }
        else{
            delete query.minPrice;
        }
        if(maxPrice !== null)
        {
            query.maxPrice = maxPrice;
        }
        else{
            delete query.maxPrice;
        }
        console.log(JSON.stringify(query))
        setQueryFields(query);
    }

    const HandleSaleChange = (value) => {
        let query = {
            ...QueryFields,
        }
        if(value !== null)
        {
            query.onSale = value;
        }
        else{
            delete query.onSale;
        }
        setQueryFields(query);
    }

    return(
        <div className='product-filter'>
            {windowWidth <= 640 && <FilterCloseButton />}

            <DropDownMenu 
                dropDownText={"Price"} 
                onChangeState={(val)=>{
                    setPriceFilterOpen(val)
                    if(val === false)
                    {
                        HandlePriceChange({max: "", min: ""})
                    }
                }}
            />
            {priceFilterOpen && 
            <PriceFilter 
                onValuesChange={(values) => {
                   HandlePriceChange(values);
                }
            }
            />}
            <DropDownMenu 
                dropDownText={"Purchases"}  
                onChangeState={(val)=>{
                    setPurchasesFilterOpen(val)
                    if(val === false)
                    {
                        HandlePriceChange({max: "", min: ""})
                    }
                }}
            />
            {purchasesFilterOpen && 
            <PurchasesFilter 
                onValuesChange={(values) => {
                    HandlePurchasesChange(values);
                }}
            />}
            <DropDownMenu 
                dropDownText={"On Sale"}  
                onChangeState={(val)=>{
                    setOnSaleFilterOpen(val)
                    if(val === false)
                    {
                        HandleSaleChange(null)
                    }
                }}
            />
            {onSaleFilterOpen && 
            <OnSaleFilter 
                onValueChanged={(val)=> {
                    HandleSaleChange(val)
                }}
            />
            }
        </div>
    )
}