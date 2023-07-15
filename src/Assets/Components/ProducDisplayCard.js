import React from "react";
import NeoMorphicIcon from "./NeoMorphicIcon";

import '../Styles/neomorphicStyles.css'
import '../Styles/textStyles.css'
import '../Styles/CardAnimation.css'
import { useNavigate } from "react-router-dom";

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

      const navigate = useNavigate();
      return (
    
        <div 
          className={`neomorphic-card${delay !== null && delay !== undefined && delay !== 0 ? ' card-animation' : ''}`} 
          style = {{animationDelay: delay !== null && delay !== undefined && delay !== 0 ? `${delay}s` : '0s'}}
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
            fontSize: '1.6em',
            marginLeft: '20px',
            marginTop: '10px',
            alignSelf: 'flex-start'
          }}
        >{product.productname}</div>
        
        {product.productisonsale ? 
        <div
          className="simple-row"
        >
          <div 
            className='title-text'
            style={{
              fontSize: '1.3em',
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
          fontSize: '1.3em',
          marginLeft: '20px',
          alignSelf: 'flex-start',
          marginBottom: 'auto'
        }}
      >{`$${product.productprice}`}</div>
        }
        <NeoMorphicIcon 
          iconFilepath={`Images/shopping-cart` } 
          style = {{
            width: '50px',
            height: '50px',
            marginRight: "5%",
            alignSelf: 'flex-end',
            justifySelf: '', 
            bottom: "10px",
            top: 'auto'
          }}
        />

        </div>
 
        
  );
}