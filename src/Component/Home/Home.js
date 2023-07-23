import React from "react";
import "./Home.css";
import Product from "../../Product/Product";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://wallpapercave.com/wp/wp3144878.jpg"
        />

        <div className="home_row">
          <Product 
            id="12353455"
            title="The leas startup: How Constant Innovation Creates Radocally Successful Businesses Paperback"
            price={29.99}
            image="https://www.colemanm.org/images/books/ries-the-lean-startup.jpg"
            rating={3}
          />
          <Product
            id="45434576"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beaterm, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239}
            image="https://m.media-amazon.com/images/I/61FJtVQh9bL.jpg"
            rating={4}
           />
        </div>
        
        <div className="home_row">
          <Product
          id="84890323"
          title="Smart Waterproof Band Wristband ID115 Plus Bracelet Sport Tracker Heart Rate Monitor"
          price={39.49}
          rating={2}
          image="https://th.bing.com/th/id/OIP.D-qMxXPLX51QgWq7vW3SRgHaHa?pid=ImgDet&rs=1"
           />
          <Product
          id="78452673"
          title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
          price={98.99}
          rating={5}
          image="https://th.bing.com/th/id/OIP.Nh9CdJ4Qc3v7hzHAVL85PgHaEl?pid=ImgDet&rs=1"
           />
          <Product
          id="52385674"
          title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
          price={598.99}
          rating={5}
          image="https://th.bing.com/th/id/OIP.Gdaqiw1JQLpqzT0U-49PbQHaHa?pid=ImgDet&rs=1"
           />
        
        </div>

        <div className="home_row">
          <Product 
          id="44324578"
          title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
          price={1094.98}
          rating={4}
          image="https://brain-images-ssl.cdn.dixons.com/6/6/10204366/u_10204366.jpg"
          />
        </div>

      </div>
    </div>
  );
}

export default Home;
