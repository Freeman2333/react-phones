import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./comps/Navbar";
import ProductsList from "./comps/ProductsList";
import Details from "./comps/Details";
import Default from "./comps/Default";
import Cart from "./comps/cart/Cart";
import Product from "./comps/Product";
import Modal from "./comps/Modal";
function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ProductsList} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal></Modal>
    </>
  );
}

export default App;
