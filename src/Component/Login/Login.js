import React, { useState } from "react";
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    //Firebase LogIn code
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate('/')
      })
      .catch(error => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    //Firebase registration code
    auth 
      .createUserWithEmailAndPassword(email,password)
      .then((auth)=>{
        //successfully create new user with email and password
        console.log(auth);

        if(auth) {
          navigate('/')
        }
      })
      .catch(error => alert(error.message))
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://www.ecomcrew.com/wp-content/uploads/2020/11/amazon.png"
        />
      </Link>

      <div className="login_container">
        <h1> Sign-In</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="login_signInButton">
            {" "}
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cokies Notice and our
          Interest-Based Ads Notice
        </p>

        <button onClick={register} className="login_registerButton">
          {" "}
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
