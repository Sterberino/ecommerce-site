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

import { queryContext } from './ProductViewPage';
import ApplyFilterButton from './ApplyFilterButton';

export default function ProductFilter({filters, setFilters})
{
    const {filterOpen, setFilterOpen} = React.useContext(filterContext);
    const [windowWidth, windowHeight] = useWindowSize();

    const [priceFilterOpen, setPriceFilterOpen] = React.useState(false);
    const [purchasesFilterOpen, setPurchasesFilterOpen] = React.useState(false);
    const [onSaleFilterOpen, setOnSaleFilterOpen] = React.useState(false);

    const {queryValues, setQueryValues} = React.useContext(queryContext);

    const HandlePurchasesChange = (values)=>{
        let minPurchases = values.min === "" ? null : values.min; 
        let maxPurchases = values.max === "" ? null : values.max; 
    
        let query = {
            ...queryValues,
        }
        if(minPurchases !== null)
        {
            query.unappliedQuery.minPurchases = minPurchases;
        }
        else{
            delete query.unappliedQuery.minPurchases;
        }
        if(maxPurchases !== null)
        {
            query.unappliedQuery.maxPurchases = maxPurchases;
        }
        else{
            delete query.unappliedQuery.maxPurchases;
        }
        console.log(JSON.stringify(query))
        setQueryValues(query);
    }

    const HandlePriceChange = (values) => {
        let minPrice = values.min === "" ? null : values.min; 
        let maxPrice = values.max === "" ? null : values.max; 

        let query = {
            ...queryValues,
        }

        if(minPrice !== null)
        {
            query.unappliedQuery.minPrice = minPrice;
        }
        else{
            delete query.unappliedQuery.minPrice;
        }

        if(maxPrice !== null)
        {
            query.unappliedQuery.maxPrice = maxPrice;
        }
        else{
            delete query.unappliedQuery.maxPrice;
        }
        console.log(JSON.stringify(query))
        setQueryValues(query);
    }

    const HandleSaleChange = (value) => {
        let query = {
            ...queryValues,
        }
        if(value !== null)
        {
            query.unappliedQuery.onSale = value;
        }
        else{
            delete query.unappliedQuery.onSale;
        }
        setQueryValues(query);
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
            <ApplyFilterButton />
        </div>
    )
}