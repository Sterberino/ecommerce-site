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
export default function ProductViewPage() {
  const{products, setProducts} = React.useContext(ProductsContext);
  const[fetchingProducts, setFetchingProducts] = useGetProducts();
  const productCards = useGetCards();
  
  const [windowWidth, windowHeight] = useWindowSize();
  const[lastWindowWidth, setLastWindowWidth] = React.useState(window.innerWidth);
  
  const[filterOpen, setFilterOpen] = React.useState(false);
  
  
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
    setLastWindowWidth(windowWidth);
  }, [windowWidth])

 
    
 

  window.scrollTo({top: 0, left: 0, behavior: "instant"})

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
    );
  }
  