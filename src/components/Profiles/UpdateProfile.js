import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ToastMsg from "../HF/ToastMsg";

const UpdateProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(location.state?.currUser?.fullName);
  const [address, setAddress] = useState(location.state?.currUser?.address);
  const [phone, setPhone] = useState(location.state?.currUser?.phone);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const user = { fullName, address, phone };
    const url = `https://asif-online-shop-server.herokuapp.com/api/users/update/${location.state?.currUser?.userName}`;
    await axios
      .patch(url, user)
      .then(function (response) {
        toast.success("Profile updated!!");
        navigate(`/users/${location.state?.currUser?.userName}`, {
          replace: true,
        });
      })
      .catch(function (error) {
        toast.error(error.message);
      });
  };
  return (
    <div className="container w-50 mx-auto text-start mt-3">
      <h2 className="text-success mt-3 mb-3 text-start">
        Update Profile Here!!
      </h2>
      <Form onSubmit={handleUpdateProfile}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            onChange={(e) => setFullName(e.target.value)}
            defaultValue={fullName}
            type="text"
            placeholder="Enter name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={location.state?.currUser?.userName}
            type="text"
            //placeholder="Enter phone number"
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Your address</Form.Label>
          <Form.Control
            onChange={(e) => setAddress(e.target.value)}
            defaultValue={address}
            as="textarea"
            placeholder="Enter address"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={location.state?.currUser?.email}
            //placeholder="Enter email"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="occp">
          <Form.Label>Your Phone number</Form.Label>
          <Form.Control
            onChange={(e) => setPhone(e.target.value)}
            defaultValue={phone}
            type="number"
            placeholder="Enter phone number"
            required
          />
        </Form.Group>

        {/* <Form.Text className="text-danger">{errorMessage}</Form.Text> */}
        <Button className="mb-3" variant="success" type="submit">
          Update
        </Button>
      </Form>
      <ToastMsg></ToastMsg>
    </div>
  );
};

export default UpdateProfile;
