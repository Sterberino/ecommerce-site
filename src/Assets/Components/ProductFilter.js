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
import ProductSearchBar from './ProductSearchBar';

export default function ProductFilter({filters, setFilters})
{
    const {filterOpen, setFilterOpen} = React.useContext(filterContext);
    const [windowWidth, windowHeight] = useWindowSize();

    const [priceFilterOpen, setPriceFilterOpen] = React.useState(false);
    const [purchasesFilterOpen, setPurchasesFilterOpen] = React.useState(false);
    const [onSaleFilterOpen, setOnSaleFilterOpen] = React.useState(false);
    
    const [searchFilterOpen, setSearchFilterOpen] = React.useState(false);

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
        query.appliedQuery.offset = 0;
        query.unappliedQuery.offset = 0;
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
        query.appliedQuery.offset = 0;
        query.unappliedQuery.offset = 0;
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
        query.appliedQuery.offset = 0;
        query.unappliedQuery.offset = 0;
        setQueryValues(query);
    }

    const HandleSearchChange = (value)=> {
        let query = {
            ...queryValues,
        }

        let originalApplied = query.appliedQuery.search;
        if(value !== null)
        {
            query.unappliedQuery.search = value;
        }
        else{
            delete query.unappliedQuery.search;
        }
        
        //If you don't include this line, the applied query updates as well. Why? Who knows. I wasn't able to figure out what the issue was.
        query.appliedQuery.search = originalApplied
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
                initialMin={queryValues.appliedQuery.minPrice ? queryValues.appliedQuery.minPrice : null}
                initialMax={queryValues.appliedQuery.maxPrice ? queryValues.appliedQuery.maxPrice : null}
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
                initialMin={queryValues.appliedQuery.minPurchases ? queryValues.appliedQuery.minPurchases : null}
                initialMax={queryValues.appliedQuery.maxPurchases ? queryValues.appliedQuery.maxPurchases : null}
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
                initialVal={queryValues.appliedQuery.onSale ? queryValues.unappliedQuery.onSale ? queryValues.unappliedQuery.onSale :  queryValues.appliedQuery.onSale : null}
                onValueChanged={(val)=> {
                    HandleSaleChange(val)
                }}
            />
            }
            <DropDownMenu 
                dropDownText={"Search"}  
                onChangeState={(val)=>{
                    setSearchFilterOpen(val)
                    if(val === false)
                    {
                    }
                }}
            />
            {searchFilterOpen && <ProductSearchBar 
                    initialText={queryValues.unappliedQuery.search}
                    updateOnTextChange={true}
                    onSearch={(val)=>{HandleSearchChange(val)}}
                    hideSearchIcon={true}
                />
            }
            <ApplyFilterButton />
        </div>
    )
}