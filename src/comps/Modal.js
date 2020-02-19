import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../Context";
import { ButtonContainer } from "./Buttons";
import { Link } from "react-router-dom";
export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          // console.log(value);
          const { modalOpen, closeModal } = value;
          const { img, title, price } = value.modalProduct;
          if (!modalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div
                      id="modal"
                      className="col-8 p-5 mx-auto col-md-6 col-lg-4 text-center text-capitalize"
                    >
                      <h5>item added to the cart</h5>
                      <img src={img} alt="product" className="img-fluid" />
                      <h5>{title}</h5>
                      <h5 className="text-muted">price: $ {price}</h5>
                      <Link to="/" onClick={() => closeModal()}>
                        <ButtonContainer>store</ButtonContainer>
                      </Link>
                      <Link to="/cart" onClick={() => closeModal()}>
                        <ButtonContainer cart>go to cart</ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
