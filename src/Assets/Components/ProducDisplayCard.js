import React from "react";
import NeoMorphicIcon from "./NeoMorphicIcon";

import '../Styles/neomorphicStyles.css'
import '../Styles/textStyles.css'
import '../Styles/CardAnimation.css'
import '../Styles/PurchaseButton.css'

import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import AnimatedCheckmark from "./AnimatedCheckmark";
import usePostCart from "../Hooks/usePostCart";

export default function ProductDisplayCard({product, delay})
{     

    const {
      productname, 
      productimageurl, 
      productprice, 
      productquantityavailable, 
      productdescription, 
      productisonsale, 
      productsaleprice,
      productseller
    } = product;

    const [mousedOver, setMousedOver] = React.useState(false);
    const [addingToCart, setAddingToCart] = React.useState(false);
    const [completedAddCart, setCompletedAddCart] = React.useState(false);
    
    const [clicked, setClicked] = React.useState(false);

    const[postingCart, setPostingCart] = usePostCart(product, 1);
    const navigate = useNavigate();
    
    React.useEffect(()=>{
      if(!completedAddCart && clicked)
      {
        if(addingToCart && !postingCart)
        {
          setPostingCart(true);
          setAddingToCart(false);
        }
        else if(!addingToCart && !postingCart)
        {
          setCompletedAddCart(true)
        }
      }
    }, [addingToCart, postingCart, completedAddCart])


    const AddToCart = (e)=> {
      if(!addingToCart && !completedAddCart && !postingCart)
      {
        setClicked(true);
        setAddingToCart(true);
        return;
      }
    }
    
    return (
        <div 
          className={`neomorphic-card${delay !== null && delay !== undefined && delay !== 0 ? ' card-animation' : ''}`} 
          style = {{animationDelay: delay !== null && delay !== undefined && delay !== 0 ? `${delay}s` : '0s'}}
          onMouseOver={()=>{setMousedOver(true)}}
          onMouseOut={()=>{setMousedOver(false)}}
          onClick={()=>{
            window.scrollTo({top: 0, left: 0, behavior: "instant"})
            navigate(
            {
              pathname: "/singleproduct",
              search: `itemId=${product.productid}`
            }, 
            {
              state: {product : product}
            }
          )}}
        >
       
        <div className='image-display'>
        <img 
           src={ `${process.env.PUBLIC_URL}${productimageurl}`}/>
        </div> 

        <div 
          className='title-text'
          style={{
            fontSize: '1.4em',
            marginLeft: '20px',
            marginTop: '10px',
            alignSelf: 'flex-start'
          }}
        >{product.productname}</div>

        <div 
          className='basic-text'
          style={{
            fontSize: '1em',
            marginLeft: '20px',
            alignSelf: 'flex-start'
          }}
        >{product.productseller}</div>


        {product.productisonsale ? 
        <div
          className="simple-row"
        >
          <div 
            className='title-text'
            style={{
              fontSize: '1.2em',
              marginLeft: '20px',
              textAlign: "center"
            }}
        >{`$${product.productsaleprice}`}</div>
        <div 
            className='canceled-text'
            style={{
              fontSize: '1em',
              marginLeft: '10px',
              height: '100%'
            }}
        >{`List: $${product.productprice}`}</div>
        </div> :
        <div 
        className='title-text'
        style={{
          fontSize: '1.2em',
          marginLeft: '20px',
          alignSelf: 'flex-start',
          marginBottom: 'auto'
        }}
      >{`$${product.productprice}`}</div>
        }
        
        <div 
          className="purchase-button" 
          style = {{bottom : mousedOver || addingToCart ? '0px' : '-55px'}}
          onClick={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            AddToCart(e)
          }}
        >  
          {!addingToCart && !clicked && !completedAddCart && <div className = "img-wrapper">
          <img src ={`${process.env.PUBLIC_URL}/Images/shopping-cart.png`} />
          </div>}
          {!addingToCart && !clicked && !completedAddCart  && <div className="title-text">{"Add To Cart"}</div>}
          {(addingToCart || postingCart) && <Spinner style={{justifySelf: 'center', alignSelf: 'center', left: 'calc(50% - 40px)'}}/>}
          {!addingToCart && completedAddCart && 
            <AnimatedCheckmark 
              style = {{
                position: 'relative', 
                width: '25px', 
                height: '25px',
                left: 'calc(50% - 12.5px)'
              }}
              color={'rgba(225,225,225,1)'}  
            />
          }
        </div>
      </div>
  );
}