import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainPage from "./components/main";
import ProductDetailsPage from "./components/Products/ProductDetails";
import CreateProduct from "./components/Products/CreateProduct";
import Footer from "./components/Footer";
import UserStorePage from "./components/Products/UserStorePage";
import EditProduct from "./components/Products/EditProduct";
import ProductPicture from "./components/Products/ProductPictures";
import Cart from "./components/Cart/cart";
import CreateReview from "./components/Reviews/CreateReview";
import EditReview from "./components/Reviews/EditReview";
import AllProductsPage from "./components/Products/AllProductsPage";
import Error404Page from "./components/ErrorPages/Error404";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <MainPage />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/products/create">
            <CreateProduct />
          </Route>
          <Route exact path="/products/user-store">
            <UserStorePage />
          </Route>
          <Route exact path="/products/search/all">
            <AllProductsPage />
          </Route>
          <Route exact path="/products/:productId">
            <ProductDetailsPage />
          </Route>
          <Route exact path="/products/:productId/edit">
            <EditProduct />
          </Route>
          <Route exact path="/products/:productId/review">
            <CreateReview />
          </Route>
          <Route exact path="/reviews/:reviewId/product/:productId/edit">
            <EditReview />
          </Route>
          <Route exact path="/images/:productId">
            <ProductPicture />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path='*'>
            <Error404Page />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
