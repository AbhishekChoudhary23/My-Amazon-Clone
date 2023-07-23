import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../reducer";
import axios from "../../axios";
import { db } from "../../firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
      // generate the special stripe secret which allows us to charge a customer
      const getClientSecret = async () => {
        try {
          const response = await axios({
            method: 'post',
            url: `/payments/create?total=${getBasketTotal(basket) * 100}`
          });
          setClientSecret(response.data.clientSecret);
        } catch (error) {
          console.error('Error in getClientSecret:', error);
        }
      };
    
      getClientSecret();
    }, [basket]);

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('hi', user)

    const handleSubmit = async (event) => {
      // do all the fancy stripe stuff...
      try {
        // Ensure that clientSecret is a valid string before proceeding
        if (typeof clientSecret !== 'string') {
          throw new Error('Invalid clientSecret');
        }
        
      event.preventDefault();
      setProcessing(true);
    
    
      try {
        const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        });
      
        if (payload && payload.paymentIntent) {
          const paymentIntent = payload.paymentIntent;
          console.log(payload);
          console.log(paymentIntent);
      
          // Handle successful payment
          await db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created
            });
      
          setSucceeded(true);
          setError(null);
          setProcessing(false);
      
          dispatch({
            type: 'EMPTY_BASKET'
          });
      
          navigate('/orders');
        } else {
          console.error('Invalid payload or paymentIntent data');
          setError('Payment failed. Please try again.');
          setProcessing(false);
          // Handle the case when payload or paymentIntent is undefined or missing
          // Set appropriate error states or take necessary action
        }
      } catch (error) {
        console.error('Error in handleSubmit:', error);
        setError('Payment failed. Please try again.');
        setProcessing(true);
      }
      
    
        setSucceeded(true);
        setError(null);
        setProcessing(false);
    
        dispatch({
          type: 'EMPTY_BASKET'
        });
    
        navigate('/orders');
      } catch (error) {
        console.error('Error in handleSubmit:', error);
        // Handle any error during payment processing
        setError('Payment failed. Please try again.');
        setProcessing(false);
      }
    };
    
    

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* Payment section - Delivery address */}
        <div className="payment_section">
          <div className="payment_title">
            <h3> Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>C wing, flat 201</p>
            <p>Gokuldhaam Society</p>
            <p>Powder Gali</p>
          </div>
        </div>

        {/* Payment section - review Items */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        
        {/* Payment section - Payment Method */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/*Stripe used here */}
            <form onSubmit={handleSubmit}>

              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                  <h3> Order Total: {value}</h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                    <span>{processing? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
                    {/* Error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
