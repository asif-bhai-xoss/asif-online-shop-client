import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const dispatch = useDispatch();
  
  const {p_name, pro_id, price, quantity, productPrice} = props.cartItem;
  const currUser = props.currUser;

  const [currProductPrice, setCurrProductPrice] = useState(0);

  const [currQ, setCurrQ] = useState(1);

useEffect(()=> {
  setCurrProductPrice(productPrice);
  setCurrQ(quantity);
},[productPrice, quantity])

 // const [currProduct, setCurrProduct] = useState({});
  
  //const [currPrice, setCurrPrice] = useState(currProduct.price * q);
  const [total, setTotal] = useState({});
  

  const handleAddItem = async (e, pid) => {
    e.preventDefault();
    const url = `https://asif-online-shop-server.herokuapp.com/api/users/${currUser.userName}/cartItems/${pid}/add`;
    await axios
      .patch(url, { pid })
      .then(function (response) {
       // dispatch(fetchCartItems(currUser.userName));
        //dispatch(cartCalc());
        //console.log(response.data.msg);
      })
      .catch(function (error) {
        alert(error.message);
        console.log(error.message);
      });
  };
  const handleSubItem = async (pid) => {
    const url = `https://asif-online-shop-server.herokuapp.com/api/users/${currUser.userName}/cartItems/${pid}/sub`;
    await axios
      .patch(url, { pid })
      .then(function (response) {
        //dispatch(fetchCartItems(currUser.userName));
       // dispatch(cartCalc());
        //console.log(response.data.msg);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const handleRemoveProduct = async (pid) => {
    const ok = window.confirm(
      `Are you sure you want to remove ${p_name}?`
    );
    if (ok) {
      console.log(currUser.userName);
      const url = `https://asif-online-shop-server.herokuapp.com/api/users/${currUser.userName}/cartItems/${pid}/remove`;
      await axios
        .delete(url)
        .then(function (response) {
          alert(response.data.msg);
       // dispatch(fetchCartItems(currUser.userName));
       // dispatch(cartCalc());
        })
        .catch(function (error) {
          alert(error.message);
          console.log(error.message);
        });
    }
  };
  return (
    <MDBCard className="rounded-3 mb-4">
      <MDBCardBody className="p-4">
        <MDBRow className="justify-content-between align-items-center">
          <MDBCol md="2" lg="2" xl="2">
            <MDBCardImage
              className="rounded-3"
              fluid
              src="https://i.ibb.co/nPRQR76/pic3.png"
              alt="Cotton T-shirt"
            />
          </MDBCol>
          <MDBCol md="3" lg="3" xl="3">
            <p className="lead fw-normal mb-2">{p_name}</p>
            <p>
              <span className="text-muted">Made In: </span>
              {"Bangladesh"}
            </p>
          </MDBCol>
          <MDBCol
            md="3"
            lg="3"
            xl="2"
            className="d-flex align-items-center justify-content-around"
          >
            <MDBBtn
              color="link"
              onClick={() => handleSubItem(pro_id)}
              disabled={quantity === 1 ? true : false}
              className="px-2"
            >
              <MDBIcon fas icon="minus" />
            </MDBBtn>
            &nbsp;&nbsp;&nbsp;
            <MDBInput
              min={1}
              disabled
              value={currQ ? currQ : 1}
              type="number"
              size="sm"
            />
            &nbsp;
            <MDBBtn
              color="link"
              onClick={(e) => handleAddItem(e,pro_id)}
              className="px-2"
            >
              <MDBIcon fas icon="plus" />
            </MDBBtn>
          </MDBCol>
          <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
            <MDBTypography tag="h5" className="mb-0">
              ${currProductPrice}
            </MDBTypography>
          </MDBCol>
          <MDBCol md="1" lg="1" xl="1" className="text-end">
            <a
              onClick={() => handleRemoveProduct(pro_id)}
              href="#!"
              className="text-danger"
            >
              <MDBIcon fas icon="trash text-danger" size="lg" />
            </a>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
};

export default CartItem;
