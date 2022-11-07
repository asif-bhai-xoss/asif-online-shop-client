import axios from "axios";
import {
  MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCol,
  MDBContainer, MDBInput, MDBListGroup,
  MDBListGroupItem, MDBRow,
  MDBTypography
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cartCalc, deleteCartItems, fetchCartItems } from "../../features/cartSlice";
import ToastMsg from "../HF/ToastMsg";
import CartItem from './CartItem';

const CartItems = () => {
    const { status, user} = useSelector((state) => state.user);
    const {cartStatus, cartItems, cartError, total_price, total_bill} = useSelector((state) => state.cartItems);

    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const [currUser, setCurrUser] = useState({});
    const [currProduct, setCurrProduct] = useState({});
    const [currCart, setCurrCart] = useState({});
    useEffect(() => {
      dispatch(fetchCartItems(user.userName)); 
      setCurrUser(user);
      dispatch(cartCalc(cartItems));
    },[cartItems, dispatch, user])

    const handleRemoveAll = async () => {
      const ok = window.confirm(
        `Are you sure you want to remove all items in the cart?`
      );
      if (ok) {
        const arr1 = [currUser.userName, currUser.cart_id];
        const url = `https://asif-online-shop-server.herokuapp.com/api/${currUser.userName}/cartItems/${currUser.cart_id}`;
        await axios
          .delete(url)
          .then(function (response) {
            toast.success(response.data.msg);
         dispatch(deleteCartItems(arr1));
         // dispatch(cartCalc());
          })
          .catch(function (error) {
            toast.error(error.message);
           
          });
      }
    }
    const handleCheckout = () => {
      navigate("/cart/checkout");
    }



    return (
        <div className="h-100 container-fluid" style={{ backgroundColor: "#eee" }}>
           <h2 className="pt-3">Total item: {cartItems.length}</h2> 
           <MDBContainer className="py-5 h-100 pt-0">
    <MDBRow className="justify-content-center align-items-center h-100">
      <MDBCol md="10">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
            Shopping Cart
          </MDBTypography>
          <MDBBtn onClick={handleRemoveAll} className="mt-2" color="danger" outline size="md">
              Remove All
            </MDBBtn>
          <div>
            <p className="mb-0">
              <span className="text-muted">Sort by: </span>
              <a href="#!" className="text-body">
                price <i className="fas fa-angle-down mt-1"></i>
              </a>
            </p>
          </div>
        </div>

           {
                cartItems.map(cartItem => <CartItem 
                key={cartItem._id}
                cartItem = {cartItem}
                currUser = {currUser}
            ></CartItem>)
           }
           <MDBCard className="mb-4">
          <MDBCardBody className="p-4 d-flex flex-row">
            <MDBInput label="Discount code" wrapperClass="flex-fill" size="lg" />
            <MDBBtn className="ms-3" color="warning" outline size="lg">
              Apply
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4">
          <MDBCardHeader>
            <MDBTypography tag="h5" className="mb-0">
              Summary
            </MDBTypography>
          </MDBCardHeader>
          <MDBCardBody>
            <MDBListGroup flush>
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 ps-2">
                Products
                <span>${total_price}</span>
              </MDBListGroupItem>
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 ps-2">
                Discount
                <span>$0</span>
              </MDBListGroupItem>
              <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 ps-2">
                Shipping
                <span>$0</span>
              </MDBListGroupItem>
              <hr />
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  <strong>
                    <p className="mb-0">(including VAT)</p>
                  </strong>
                </div>
                <span>
                  <strong>${total_bill}</strong>
                </span>
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardBody>
            <MDBBtn onClick={handleCheckout} className="ms-3" color="warning" block size="lg">
              Checkout
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
<ToastMsg></ToastMsg>
           </MDBCol>
    </MDBRow>
  </MDBContainer>
        </div>
    );
};

export default CartItems;