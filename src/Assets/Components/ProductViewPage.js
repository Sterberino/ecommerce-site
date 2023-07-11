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
import { ProductsContext } from "../../App.js";
import useGetProducts from "../Hooks/useGetProducts.js";
import Spinner from "./Spinner.js";
import BlackMirrorSpinner from "./BlackMirrorSpinner.js";
import useWindowSize from "../Hooks/useWindowSize.js";

//For sub elements controlling if the filter should be open or not. (when mobile view)
export const filterContext = React.createContext();

//Query Context, the query values for item filtering
export const queryContext = React.createContext();


export default function ProductViewPage() {
  const [queryValues, setQueryValues] = React.useState({appliedQuery: {limit: 9}, unappliedQuery: {limit: 9}, requiresRefresh: true});
  const[fetchingProducts, setFetchingProducts, queryParams, setQueryParams] = useGetProducts(queryValues.appliedQuery);
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
  }, [fetchingProducts]);

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
      setQueryParams(queryValues.appliedQuery);
      setFetchingProducts(true);
    }
  }, [queryValues]);
  

  if(fetchingProducts)
  {
    return(
      <queryContext.Provider value = {{queryValues: queryValues, setQueryValues: setQueryValues}}>
    <filterContext.Provider value={{filterOpen: filterOpen, setFilterOpen : setFilterOpen}}>
      <div>
      <SiteHeader />
      <ProductViewLabel/>
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
      <ProductViewLabel/>
      <ProductFilterHeader/>
        <div className="product-viewpage-body">
          {filterOpen && <ProductFilter/>}
          {productCards.length > 0 ? 
            <ProductGrid products={productCards}/> : 
            <div style = {{
              alignSelf: 'center',
              justifySelf: 'start',
              width: '100%', 
              marginBottom: "100px"
            }} className="title-text">{"No Results"}</div>}
        </div>
        <SiteFooter />
      </div>
      </filterContext.Provider>
      </queryContext.Provider>
    );
  }
  