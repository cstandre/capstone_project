import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import { loadProducts } from "../../store/products";
import { addItem } from "../../store/cart";

import "./main.css"


const MainPage = () => {
  const history = useHistory();
  const products = useSelector(state=>state?.products);
  const sessionUser = useSelector(state=>state?.session.user);
  const dispatch = useDispatch();
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderHeight, setSliderHeight] = useState(0);

  const productArr = Object?.values(products)?.slice(0,5);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    const calculateSliderSize = () => {
      const parentContainerWidth = document.querySelector('.body').clientWidth;
      const calculatedWidth = Math.round(parentContainerWidth * 0.8);
      setSliderWidth(calculatedWidth);

      const calculatedHeight = Math.round(calculatedWidth * 0.3);
      setSliderHeight(calculatedHeight);
    };

    calculateSliderSize();
    window.addEventListener('resize', calculateSliderSize);

    return () => {
      window.removeEventListener('resize', calculateSliderSize);
    };
  }, []);

  const images = [
    {
      url: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_1.jpg"
    },
    {
      url: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_2.jpg"
    },
    {
      url: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_3.jpg"
    }
  ];

  const handleCartButton = (id) => {
    dispatch(addItem(id, 1));
  };

  const throwError = (e) => {
    e.preventDefault();
    alert('Login to add item to your cart!')
  };

  const handleProductDetail = (productId) => {
    // console.log(productId)
    history.push(`/products/${productId}`);
};

  return (
    <div className="body">
      <div>
        <div className="slider">
          <SimpleImageSlider
            width={sliderWidth}
            height={sliderHeight}
            images={images}
            showNavs={true}
          />
        </div>
        <div className="product-display-container">
          {productArr?.map((product, idx) =>
            <div className={`product-box container-${idx}`} key={idx}>
              <img className={`product-box-img-${idx}`} alt="" src={product?.preview_image} value={product?.id} onClick={() => handleProductDetail(product?.id)}></img>
              <div className="product-details">
                <p className="product-name" value={product?.id} onClick={() => handleProductDetail(product?.id)}>{product.product_name}</p>
                {product?.stock_quantity > 0 ? (
                  <p className="in-stock">In Stock</p>
                ): (
                  <p className="no-stock">Out of Stock</p>
                )}
                </div>
                  {sessionUser ? (
                    <button value={product?.id} onClick={() => handleCartButton(product?.id)}>Add to cart</button>
                  ): (
                    <button value={product?.id} onClick={throwError}>Add to cart</button>
                  )}
                </div>
            /* {ad?.reviews?.length == 0 ? (
                  <div>Be the first to review!</div>
                  ): (
                    <div>Review Count: {ad?.reviews?.length}</div>
              )} */
          )}
        </div>
      </div>
    </div>
  )
};

export default MainPage;
