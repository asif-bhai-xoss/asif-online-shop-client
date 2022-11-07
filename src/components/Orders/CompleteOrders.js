import { MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrderItems, fetchOrderItems } from '../../features/orderSlice';
import DisplayOrders from './DisplayOrders';

const CompleteOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, user} = useSelector((state) => state.user);
    const { orderItemStatus, completedItems} = useSelector((state) => state.orderItems);
//console.log(user.order_id);
const statuses = completedItems.map(it =>it.orderStatus);

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
            <h2>CompleteOrders: {completedItems.length}</h2>
            <MDBRow>
                {
                    completedItems.map(item => <DisplayOrders
                    key={item._id}
                    item={item}
                    user={user}
                    ></DisplayOrders>)
                }
            </MDBRow>
        </div>
    );
};

export default CompleteOrders;