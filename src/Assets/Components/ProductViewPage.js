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
import useWindowSize from "../Hooks/useWindowSize.js";

//For sub elements controlling if the filter should be open or not. (when mobile view)
export const filterContext = React.createContext();

//Query Context, the query values for item filtering
export const queryContext = React.createContext();


export default function ProductViewPage() {
  const{products, setProducts} = React.useContext(ProductsContext);
  const[fetchingProducts, setFetchingProducts] = useGetProducts();
  const productCards = useGetCards();
  
  const [windowWidth, windowHeight] = useWindowSize();
  const[lastWindowWidth, setLastWindowWidth] = React.useState(windowWidth);
  
  const[filterOpen, setFilterOpen] = React.useState(windowWidth > 640 ? true : false);
  const [queryValues, setQueryValues] = React.useState({appliedQuery: {}, unappliedQuery: {}});
  
  React.useEffect(()=>{}, [fetchingProducts])
  React.useEffect(()=>{
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
  }, [windowWidth])

 console.log(JSON.stringify( queryValues))
    
  if(fetchingProducts)
  {
    return(
      <div>
        <SiteHeader />
        <Spinner style = {{
            width: '100%',
            justifyContent: 'center'
        }}/>
        <SiteFooter />
      </div>
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
          <ProductGrid products={productCards}/>
        </div>
        <SiteFooter />
      </div>
      </filterContext.Provider>
      </queryContext.Provider>
    );
  }
  