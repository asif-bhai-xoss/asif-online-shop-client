import axios from 'axios';
import {
  MDBBtn,
  MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader,
  MDBModalTitle,
  MDBRadio
} from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAllOrderItems } from '../../features/orderSlice';
import ToastMsg from '../HF/ToastMsg';

const UpdateOrder = (props) => {
    const [updateModal, setUpdateModal] = useState(true);
    props.handleUpdate(updateModal);
    const invoice_no = props.invoice_no;

    const { status, user, error } = useSelector(
      (state) => state.user
    );

    const [updateStatus, setUpdateStatus] = useState("");
    const dispatch = useDispatch();

    const handleSaveChanges = async () => {
        //console.log(updateStatus)
        const url = `http://localhost:5000/api/orderItems/${invoice_no}`;
        const newStatus = {orderStatus: updateStatus};
        await axios.patch(url, newStatus).then(result => {
          toast.success(result.data.msg);
        dispatch(fetchAllOrderItems());
        setUpdateModal(false);
        }).catch(error => {
          toast.error(error.message);
        })
    }

    // useEffect(()=> {
    //     setUpdateModal(props.showStatus);
    // },[props.showStatus])

    return (
        <div>
            {/* <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn> */}
      {/* <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'> */}
      <MDBModal show={updateModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update order status of Invoice no: {invoice_no}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>setUpdateModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

           
      <MDBRadio name='inlineRadio' id='packaging' value="Packaging" label='Packaging' inline onChange={(e)=> setUpdateStatus(e.currentTarget.value)} />
      <MDBRadio name='inlineRadio' id='shipping' value='Shipping' label='Shipping'  inline onChange={(e)=> setUpdateStatus(e.currentTarget.value)} />
      <MDBRadio name='inlineRadio' id='completed' value='Completed' label='Completed' inline onChange={(e)=> setUpdateStatus(e.currentTarget.value)} />
      <MDBRadio name='inlineRadio' id='canceled' value="Canceled" label='Canceled' inline onChange={(e)=> setUpdateStatus(e.currentTarget.value)} />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={()=>setUpdateModal(false)}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSaveChanges} 
              disabled = {updateStatus ? false : true}
              color='success'>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <ToastMsg></ToastMsg>
        </div>
    );
};

export default UpdateOrder;