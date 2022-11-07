import { MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrderItems, fetchOrderItems } from '../../features/orderSlice';
import DisplayOrders from './DisplayOrders';

const CancelOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, user} = useSelector((state) => state.user);
    const { orderItemStatus, canceledItems} = useSelector((state) => state.orderItems);
//console.log(user.order_id);

const statuses = canceledItems.map(it =>it.orderStatus);
    
    useEffect(() => {
        if(user.role==="user"){
            const arr1 = [user.userName, user.order_id]
            //console.log(user.userName, user.order_id);
            dispatch(fetchOrderItems(arr1));
           }
       if(user.role==="admin"){
        dispatch(fetchAllOrderItems());
        }
         
        
      },[dispatch, user.order_id, user.role, user.userName])

    return (
        <div>
            <h2>CancelOrders: {canceledItems.length}</h2>
            <MDBRow>
                {
                    canceledItems.map(item => <DisplayOrders
                    key={item._id}
                    item={item}
                    user={user}
                    ></DisplayOrders>)
                }
            </MDBRow>
        </div>
    );
};

export default CancelOrders;