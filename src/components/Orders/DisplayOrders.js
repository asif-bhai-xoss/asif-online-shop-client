import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardText,
  MDBCardTitle,
  MDBCol
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UpdateOrder from "./UpdateOrder";

const DisplayOrders = (props) => {
  //const {orderStatus} = useSelector(state => state.orderItems);
  //const {userName} = useParams();
  const {invoice_no, userName, orderStatus, order_date, total_bill, payment_method} = props.item;
  const {order_id, role} = props.user;
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = useState(false);
  const [currStatus, setCurrStatus] = useState("");

  const handleUpdate = (data) => {
    setUpdateModal(data);
  }
  useEffect(() => {
    setCurrStatus(orderStatus);
  },[orderStatus])


  return (
    <MDBCol sm="6" >
      <MDBCard className="w-50 text-start m-5">
      <MDBCardHeader>Invoice no.: {invoice_no}</MDBCardHeader>
        <MDBCardBody className="mb-0">
          <MDBCardTitle>Username: {userName}</MDBCardTitle>
          <MDBCardText>
            Total Bill: ${total_bill}
          </MDBCardText>
          <MDBCardText>
            Payment: {payment_method}
          </MDBCardText>
          <MDBCardText>
            Status: {currStatus}
          </MDBCardText>
        </MDBCardBody>
        <MDBCardBody className="mt-0 d-flex justify-content-around align-items-center">
          <MDBBtn className="btn-secondary" href="#">See details </MDBBtn>
          {role==="admin" && <MDBBtn className="btn-success" onClick={handleUpdate}>Update </MDBBtn>}
        </MDBCardBody>
        <MDBCardFooter className='text-muted'>{order_date}</MDBCardFooter>
        {updateModal && <UpdateOrder
        handleUpdate={handleUpdate}
        invoice_no = {invoice_no}
        ></UpdateOrder>}
      </MDBCard>
    </MDBCol>
    
  );
};

export default DisplayOrders;
