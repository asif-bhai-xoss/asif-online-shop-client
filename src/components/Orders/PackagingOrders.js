import { MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrderItems, fetchOrderItems } from '../../features/orderSlice';
import DisplayOrders from './DisplayOrders';
  

const PackagingOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, user} = useSelector((state) => state.user);
    const { orderItemStatus, packagingItems} = useSelector((state) => state.orderItems);
    const [len, setLen] = useState();
    //const statuses = packagingItems.map(it =>it.orderStatus);
//console.log(user.order_id);
    
    useEffect(() => {
        if(user.role==="user"){
            const arr1 = [user.userName, user.order_id]
            //console.log(user.userName, user.order_id);
            dispatch(fetchOrderItems(arr1));
           }
        if(user.role==="admin"){
        dispatch(fetchAllOrderItems());
        }
       setLen({}) 
      },[dispatch, user.order_id, user.role, user.userName])

    return (
        <div>
            <h2>Packaging Orders: {packagingItems.length}</h2>
            <MDBRow>
                {
                    packagingItems.map(item => <DisplayOrders
                    key={item._id}
                    item={item}
                    user={user}
                    ></DisplayOrders>)
                }
            </MDBRow>

        </div>
    );
};

export default PackagingOrders;