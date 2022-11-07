import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (pass !== cpass) {
      setErr("Password does not match");
    } else if (pass?.length < 5) {
      setErr(`Password must be at least 5 characters`);
    } else {
      const user = { fullName, userName, email, password: pass };

      const url = "https://asif-online-shop-server.herokuapp.com/api/users/register";
      const response = await axios.post(url, user);
      console.log(response);
      //console.log(response.data.msg);
      if (response.data.status === 200 || response.data.status === 201) {
        alert(response.data.msg);
        const url = `https://asif-online-shop-server.herokuapp.com/api/users/${userName}/cart`;
        const url2 = `https://asif-online-shop-server.herokuapp.com/api/users/${userName}/order`;
  await axios
      .post(url, {userName: userName})
      .then(async function (response) {
        alert(response.data.msg);
        await axios
        .post(url2, {userName: userName, num_of_orders: 0, total_pay: 0})
        .then(async function (response) {
          alert(response.data.msg);})
          .catch(function (error) {
            alert(error.message);
            console.log(error.message);
          });
      })
      .catch(function (error) {
        alert(error.message);
        console.log(error.message);
      });
      //updating cart id...

      
        navigate("/login", {replace: true})
      } else {
        setErr(response.data.status+": "+response.data.msg);
      }
      // alert("Registration is successful")
      //navigate("/home", {replace: true})
    }
  };

  return (
    <div className="container w-50 mx-auto text-start mt-3">
      <h2 className="text-success">Please Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter fullname"
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Confirm password"
            onChange={(e) => setCpass(e.target.value)}
          />

        {err && <Form.Text className="text-danger">Error {err}</Form.Text>}
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
