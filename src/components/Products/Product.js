import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchCartItems } from "../../features/cartSlice";
import ToastMsg from '../HF/ToastMsg';

const Product = (props) => {
    const {_id, p_name, price, img, made_in} = props.product;
    const [currUser, setCurrUser] = useState({});
    const navigate = useNavigate();
  const { isLoading, user, isLogin, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

useEffect(() => {
  setCurrUser(user);
},[user])

const handleProductDetails = (pid) => {
  navigate(`/products/${pid}`);
}

const handleAddToCart = async (pid) => {
  if(Object.keys(user).length === 0 && user.constructor === Object){
    navigate(`/login`);
  }
  else{
    const url = `https://asif-online-shop-server.herokuapp.com/api/users/${currUser?.userName}/cart/${currUser?.cart_id}`;
  
  await axios
      .post(url, {cart_id: currUser.cart_id, pro_id: pid, p_name: p_name, price: price, quantity: 1, productPrice: price})
      .then(function (response) {
        dispatch(fetchCartItems(currUser.userName));
        //dispatch(cartCalc());
        toast.success(response.data.msg);
      })
      .catch(function (error) {
        toast.error(error.message);
      });
  }
  
}


    return (
        <Card className="mb-5" style={{ width: '18rem' }}>
      <Card.Img style={{ cursor: 'pointer'}} variant="top" src="https://i.ibb.co/nPRQR76/pic3.png" onClick={()=>handleProductDetails(_id)} />
      <Card.Body>
        <Card.Title style={{ cursor: 'pointer'}} onClick={()=>handleProductDetails(_id)}>{p_name}</Card.Title>
      </Card.Body>
      <ListGroup className="text-start list-group-flush">
        <ListGroup.Item>Price: ${price}</ListGroup.Item>
        <ListGroup.Item>Made in: {made_in}</ListGroup.Item>
        <ListGroup.Item><Button onClick={() => handleAddToCart(_id)} className="w-100" variant="dark">Add to cart</Button></ListGroup.Item>
      </ListGroup>
      <ToastMsg></ToastMsg>
    </Card>

    );
};

export default Product;