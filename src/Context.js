import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    // console.log(product);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubtotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    // console.log(tempProducts);

    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => this.addTotals()
    );
  };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  increment = id => {
    let tempCart = [...this.state.cart];
    let product = tempCart.find(product => product.id === id);
    product.count++;
    product.total += product.price;
    this.setState({ cart: [...tempCart] }, () => this.addTotals());
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    let product = tempCart.find(product => product.id === id);
    if (product.count > 1) {
      product.count--;
      product.total -= product.price;
      this.setState({ cart: [...tempCart] }, () => this.addTotals());
    } else {
      return false;
    }
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = false;
    product.count = 0;

    product.total = 0;
    let tempCart = this.state.cart.filter(product => product.id !== id);
    this.setState(
      () => {
        return { products: [...tempProducts], cart: [...tempCart] };
      },
      () => this.addTotals()
    );
  };
  clearCart = () => {
    let tempProducts = [...this.state.products];
    tempProducts.forEach(product => {
      product.inCart = false;
      product.count = 0;

      product.total = 0;
    });
    this.setState({ cart: [] }, () => {
      this.setProducts();
      this.addTotals();
    });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
