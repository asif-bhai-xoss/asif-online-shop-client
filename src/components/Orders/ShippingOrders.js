import { MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrderItems, fetchOrderItems } from '../../features/orderSlice';
import DisplayOrders from './DisplayOrders';

const ShippingOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, user} = useSelector((state) => state.user);
    const { orderItemStatus, orderItems, shippingItems} = useSelector((state) => state.orderItems);
//console.log(user.order_id);
//const statuses = shippingItems.map(it =>it.orderStatus);
const [len, setLen] = useState();
    
    useEffect(() => {
      
        if(user.role==="user"){
            const arr1 = [user.userName, user.order_id]
            //console.log(user.userName, user.order_id);
            dispatch(fetchOrderItems(arr1));
           }
        if(user.role==="admin"){
            dispatch(fetchAllOrderItems());
            }
       
       setLen({});
      },[dispatch, user.order_id, user.role, user.userName])
    return (
        <div>
            <h2>Shipping : {shippingItems.length}</h2>
            <MDBRow>
                {
                    shippingItems.map(item => <DisplayOrders
                    key={item._id}
                    item={item}
                    user={user}
                    ></DisplayOrders>)
                }
            </MDBRow>
        </div>
    );
};

export default ShippingOrders;