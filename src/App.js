import "./App.css";
import React, { useEffect } from "react";
import Login from "./Component/Login/Login";
import Checkout from "./Component/Checkout/Checkout";
import Header from "./Component/Header/Header";
import Home from "./Component/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Component/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Component/Orders/Orders";

const promise = loadStripe(
  "pk_test_51NVG0ESEKTbcaJaRzE8syLzSR5GYbtKIk0gvrC5ghyKbR3kkOL8diXv6LgiV66KWgGBymLhk2Nmzhii8LPRRuO3s00E7wl4Pzm"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads...
    auth.onAuthStateChanged((authUser) => {
      // this acts as a listener
      console.log("The User Is >>> '", authUser);

      if (authUser) {
        // The use just logged in / the user was lagged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
