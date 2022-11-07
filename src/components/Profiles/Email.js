import axios from "axios";
import { MDBBtn } from "mdb-react-ui-kit";
import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Email = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  
  const handleEmailSend = async (e) => {
    e.preventDefault();
    const url = `https://asif-online-shop-server.herokuapp.com/api/users/${user?.userName}/send-email`;
    const userMail = {
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
    };
    const response = await axios.post(url, userMail);
    if (response.data.status === 200 || response.data.status === 201) {
      alert(response.data.msg);
      navigate("/home", { replace: true });
    } else {
      alert(response.data.msg);
      navigate("/send-email", { replace: true });
    }
  };

  const handleActiveEmail = async (e) => {
    e.preventDefault();
    const url = `https://asif-online-shop-server.herokuapp.com/api/users/${user.userName}/active/${user._id}`;
    const response = await axios.get(url);
    if (response.data.status === 200 || response.data.status === 201) {
      alert(response.data.msg);
      navigate("/home", { replace: true });
    } else {
      alert(response.data.msg);
      navigate("/send-email", { replace: true });
    }
  }



  return (
    <div className="container w-50 mx-auto text-start mt-3">
      <h2 className="text-warning">Please confirm your email first!!</h2>
      <Button className="btn btn-info" onClick={handleEmailSend}>
        Send email
      </Button>
      <hr />
      <div className="d-flex justify-content-center align-items-center">
        <hr />
        <h4> Or </h4>
        <hr />
      </div>
      <hr />
      <div className="d-grid">
      <MDBBtn size='lg' onClick={handleActiveEmail} color='success'>Active Email</MDBBtn>
      </div>
    </div>
  );
};

export default Email;
