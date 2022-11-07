import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const {status, user, isLogin, error} = useSelector(state => state.user);
    const [currUser, setCurrUser] = useState({});
    const navigate = useNavigate();

    const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(fetchUser(user.userName));
    if(status ==="succeeded"){
      setCurrUser(user);
    }
    
  },[dispatch, status, user])
  
    const { _id, fullName, address, phone, email, orders, userName} = currUser;
   
    const handleProfileUpdate = () => {

        navigate(`/users/update/${userName}`, {state: {currUser}});
    }
    return (
        <div className="container w-50 mx-auto text-start bg-dark text-warning p-3 mt-3">
            <h2 className="text-info">This is my profile    <span><Button onClick={handleProfileUpdate} className="btn btn-success ms-3">Update Profile</Button></span></h2>
            <h3>{fullName}</h3>
            <h5>Username: <span className="text-muted">{userName}</span></h5>
            <h5>Address: <span className="text-muted">{address ? address : "Please update address"}</span></h5>
            <h5>Email: <span className="text-muted">{email}</span></h5>
            <h5>Phone: <span className="text-muted">{phone ? phone : "Please add phone number"}</span></h5>
            <h5>Total orders: <span className="text-muted">{orders?.length}</span></h5>
        </div>
    );
};

export default MyProfile;