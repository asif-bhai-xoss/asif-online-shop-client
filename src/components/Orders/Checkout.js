import axios from "axios";
import { MDBBtn, MDBRadio, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCartItems } from "../../features/cartSlice";
import ToastMsg from "../HF/ToastMsg";

const Checkout = () => {
  const {
    cartStatus,
    cartItems,
    cartError,
    total_price,
    discount,
    shipping,
    total_bill,
  } = useSelector((state) => state.cartItems);

  const { status, user} = useSelector((state) => state.user);

const [payment, setPayment] = useState("");
const navigate = useNavigate();
const dispatch = useDispatch();

useEffect(() => {
  if(total_price===0){
    navigate("/cart");
  }
},[navigate, total_price])


const handleConfirmOrder = async () => {
 // console.log(user.userName, user.order_id);
  const url = `https://asif-online-shop-server.herokuapp.com/api/users/${user.userName}/order/${user.order_id}`;

  
  const invoice_no = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today  = new Date();

const products = cartItems.map(item => ({pro_id: item.pro_id, p_name: item.p_name, price: item.price, quantity: item.quantity, productPrice: item.productPrice}));

//console.log(products);
  const order_date = today.toLocaleDateString("en-US", options);
  const newOrder = {invoice_no: invoice_no, userName: user.userName, order_id: user.order_id, orderStatus: "Packaging", order_date: order_date, products: products, productPrice: total_price, discount: discount, shipping: shipping, total_bill: total_bill, payment_method: payment}

  //console.log(newOrder);


  await axios.post(url, newOrder).then(result => {
    toast.success(result.data.msg);
    const arr1 = [user.userName, user.cart_id];
    dispatch(deleteCartItems(arr1));
    navigate(`/${user.userName}/orders/packaging`);
  })
  .catch(error => {
    toast.error(error.message);
  })
}
const handleBackToCart = () => {
    navigate("/cart");
}



  return (
    <div>
      <h2>Please confirm your order</h2>
      <div>

      </div>
      <MDBTable bordered borderColor="info" hover >
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Price</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          
          {
                cartItems.map((cartItem, index) => <tr> 
                    <th scope="row">{index+1}</th>
            <td>{cartItem.p_name}</td>
            <td>{cartItem.price}</td>
            <td>{cartItem.quantity}</td>
            <td>{cartItem.productPrice}</td>
            </tr>)
           }
          <tr >
            <th scope="row"></th>
            <td className="text-end" colSpan={3}>Product Price</td>
          <td>${total_price}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td className="text-end" colSpan={3}>Discount</td>
          <td>${discount}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td className="text-end" colSpan={3}>Shipping Price</td>
          <td>${shipping}</td>
          </tr>
          <tr >
            <th scope="row"></th>
            <td className="text-end" colSpan={3}><strong>Total Bill</strong></td>
          <td><strong>${total_bill}</strong></td>
          </tr>
        </MDBTableBody>
      </MDBTable>
      <br />
      <div className="container mx-auto d-flex justify-content-end align-items-center sticky-bottom">
        <h4>Select payment method: </h4>&nbsp;&nbsp;&nbsp;&nbsp;
      <MDBRadio name='inlineRadio' id='cc' value="Credit card" label='Credit card' inline onChange={(e)=> setPayment(e.currentTarget.value)} />
      <MDBRadio name='inlineRadio' id='bk' value="Bkash" label='Bkash' inline onChange={(e)=> setPayment(e.currentTarget.value)} />
      <MDBRadio name='inlineRadio' id='ng' value='Nagad' label='Nagad' inline onChange={(e)=> setPayment(e.currentTarget.value)} />
      <MDBRadio name='inlineRadio' id='cod' value='Cash on delivery' label='Cash on delivery'  inline onChange={(e)=> setPayment(e.currentTarget.value)} />&nbsp;&nbsp;&nbsp;&nbsp;
      <MDBBtn disabled={payment ? false : true} onClick={handleConfirmOrder} color='success'>Confirm Order</MDBBtn>&nbsp;&nbsp;&nbsp;&nbsp;
      <MDBBtn onClick={handleBackToCart} color='dark'>Back to cart</MDBBtn>
      </div>
      <ToastMsg></ToastMsg>
    </div>
  );
};

export default Checkout;
