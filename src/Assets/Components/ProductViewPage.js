import React from "react";
import ProductGrid from './ProductGrid.js';
import ProductViewLabel from './ProductViewLabel.js'
import ProductFilterHeader from './ProductFilterHeader.js'
import useGetCards from '../Hooks/useGetCards.js';
import ProductFilter from './ProductFilter.js'
import '../Styles/GridStyles.css'
import '../Hooks/useGetCards.js'
import '../Styles/ProductViewPageStyles.css'
import SiteHeader from "./SiteHeader.js";
import SiteFooter from "./SiteFooter.js";
import useGetProducts from "../Hooks/useGetProducts.js";
import Spinner from "./Spinner.js";
import BlackMirrorSpinner from "./BlackMirrorSpinner.js";
import useWindowSize from "../Hooks/useWindowSize.js";
import Pagination from "./Pagination.js";
import useGetProductCount from "../Hooks/useGetProductCount.js";
import { useLocation } from "react-router-dom";

//For sub elements controlling if the filter should be open or not. (when mobile view)
export const filterContext = React.createContext();
//Query Context, the query values for item filtering
export const queryContext = React.createContext();

export default function ProductViewPage() {
  const location = useLocation();

  const [queryValues, setQueryValues] = React.useState({appliedQuery: {...location.state, limit: 9, offset: 0}, unappliedQuery: {...location.state, limit: 9, offset: 0}, requiresRefresh: true});
  const[fetchingProducts, setFetchingProducts, queryParams, setQueryParams] = useGetProducts(queryValues.appliedQuery);
  const [fetchingCount, setFetchingCount, countQueryParams, setCountQueryParams, countResults] = useGetProductCount(queryValues.appliedQuery)
  
  const productCards = useGetCards();
  
  const [windowWidth, windowHeight] = useWindowSize();
  const[lastWindowWidth, setLastWindowWidth] = React.useState(window.innerWidth);
  
  const[filterOpen, setFilterOpen] = React.useState(windowWidth > 640 ? true : false);
  
const AssignFilterState = ()=>{
    //Switch filter visibility on
    if(lastWindowWidth <= 640 && windowWidth > 640)
    {
      setFilterOpen(true);
    }
    else if(windowWidth <= 640 && lastWindowWidth > 640)
    {
      setFilterOpen(false);
    }
    else if(windowWidth > 640 && !filterOpen)
    {
      setFilterOpen(true);
    }
    setLastWindowWidth(windowWidth);
}

  React.useEffect(()=>{
    AssignFilterState();
  }, [fetchingProducts, fetchingCount]);

  React.useEffect(()=>{
    AssignFilterState();
  }, [windowWidth]);

  React.useEffect(()=>{
    if(Object.keys(queryValues.appliedQuery).length !== 0 && queryValues.requiresRefresh === true)
    {
      let newQuery = {
        ...queryValues,
        requiresRefresh: false
      };
      setQueryValues(newQuery);
      
      setQueryParams(newQuery.appliedQuery);
      setFetchingProducts(true);
    
      setCountQueryParams(newQuery.appliedQuery);
      setFetchingCount(true);
    }
  }, [queryValues]);
  
  const updatePagination = (index)=>{
    let newQuery = {
      ...queryValues
    }
    newQuery.requiresRefresh = true;
    newQuery.appliedQuery.offset = 9 * index;
    newQuery.unappliedQuery.offset = 9 * index;
  
    setQueryValues(newQuery);
  }

  const GetProductColumn = ()=>{
    return(
      <div className="products-column">
        <ProductGrid products={productCards}/>
        <Pagination 
          initialIndex={Math.floor(Number(queryValues.appliedQuery.offset) / 9)}
          itemsPerPage={9}
          totalItems={countResults}
          onChangeIndex={(index)=> {updatePagination(index)}}
        />
      </div>
    )
  }

  const EvaluateHeaderText = ()=>{
    if(queryValues.appliedQuery.search)
    {
      return `Search: "${queryValues.appliedQuery.search}"` 
    }
    
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
                return 'A-Z'
            case 'createdat':
                return 'Latest';
            case 'numpurchases':
                return 'Most Popular';
            default:
                return null;
        }
    }
    else{
      return 'Shop';
    }
}


  if(fetchingProducts || fetchingCount) 
  {
    return(
      <queryContext.Provider value = {{queryValues: queryValues, setQueryValues: setQueryValues}}>
    <filterContext.Provider value={{filterOpen: filterOpen, setFilterOpen : setFilterOpen}}>
      <div>
      <SiteHeader />
      <div className='title-text' style={{fontSize:"1.5em", marginTop: "30px"}}>{EvaluateHeaderText()}</div>
      <ProductFilterHeader/>
        <div className="product-viewpage-body">
          {filterOpen && <ProductFilter/>}
          <BlackMirrorSpinner style = {{
            width: '100%',
            justifyContent: 'center'
        }}/>
        </div>
        <SiteFooter />
      </div>
      </filterContext.Provider>
      </queryContext.Provider>
    )
  }

  return (
    <queryContext.Provider value = {{queryValues: queryValues, setQueryValues: setQueryValues}}>
    <filterContext.Provider value={{filterOpen: filterOpen, setFilterOpen : setFilterOpen}}>
      <div>
      <SiteHeader />
      <div className='title-text' style={{fontSize:"1.5em", marginTop: "30px"}}>{EvaluateHeaderText()}</div>
      <ProductFilterHeader/>
        <div className="product-viewpage-body">
          {filterOpen && <ProductFilter/>}
          {productCards.length > 0 ? 

           GetProductColumn() : 
            <div style = {{
              alignSelf: 'center',
              justifySelf: 'start',
              width: '100%', 
              marginBottom: "100px"
            }} className="title-text">{"No Results"}</div>
          }
        </div>
        <SiteFooter />
      </div>
      </filterContext.Provider>
      </queryContext.Provider>
    );
  }
  