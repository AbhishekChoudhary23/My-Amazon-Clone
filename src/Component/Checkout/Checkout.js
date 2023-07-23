import React from "react";
import "./Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import {useStateValue} from '../../StateProvider'
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";

function Checkout(){
  const [{basket, user}, dispatch] = useStateValue();
  
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img className="checkout_ad" src="https://th.bing.com/th/id/OIF.h5KwI8ugJX8iWPs0K2KL6w?pid=ImgDet&rs=1"/>

        <div>
          <h3>Hello, {user?.email}</h3>
            <h2 className="checkout_title">Your Shopping basket</h2>    

            {basket.map(item => (
              <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating} />
            ))}
            
        </div>
        
      </div>

      <div className="checkout_right">
        <Subtotal/>
      </div>
    </div>
  );
};

export default Checkout;
 