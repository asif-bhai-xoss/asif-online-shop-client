import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [cat, setCat] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [img, setImg] = useState("");
  const [madeIn, setMadeIn] = useState("");
 
  const navigate = useNavigate();



//https://i.ibb.co/nPRQR76/pic3.png

  const handleAddItem = (e) => {
    e.preventDefault();
    const product = {p_name: name, desc, price, category: cat, brand, quantity, discount, img, made_in: madeIn}


    const url = "https://asif-online-shop-server.herokuapp.com/api/products-save";
    axios.post(url, product)
    .then(function (response) {
      alert("Product added!!")
      navigate("/products", {replace: true})
      
    })
    .catch(function (error) {
      console.log(error.message);
    });
  };
  return (
    <div className="container w-50 mx-auto text-start">
      <h3>Add Item</h3>
      <Form onSubmit={handleAddItem}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter product name" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Product Description</Form.Label>
          <Form.Control onChange={(e) => setDesc(e.target.value)} as="textarea" placeholder="Enter product description" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Price</Form.Label>
          <Form.Control onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter product price" />
        </Form.Group>

        <Form.Select onChange={(e) => setCat(e.target.value)} aria-label="Default select example">
          <option>Select Category</option>
          <option value="1">Motorcycle</option>
          <option value="2">Mobile</option>
          <option value="3">Laptop</option>
          <option value="4">Food</option>
        </Form.Select>
        <br />
        <Form.Select onChange={(e) => setBrand(e.target.value)} aria-label="Default select example">
          <option>Select Brand</option>
          <option value="1">Samsung</option>
          <option value="2">Xiaomi</option>
          <option value="3">Apple</option>
          <option value="4">Oppo</option>
        </Form.Select>

        <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control onChange={(e) => setQuantity(e.target.value)} type="number" placeholder="Enter product quantity" />
        </Form.Group>

        <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
          <Form.Label>Product Discount</Form.Label>
          <Form.Control onChange={(e) => setDiscount(e.target.value)} type="number" placeholder="Enter product discount" />
        </Form.Group>

        <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
          <Form.Label>Image URL</Form.Label>
          <Form.Control onChange={(e) => setImg(e.target.value)} type="url" placeholder="Enter Image URL" />
        </Form.Group>

        <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
          <Form.Label>Made In</Form.Label>
          <Form.Control onChange={(e) => setMadeIn(e.target.value)} type="text" placeholder="Enter country" />
        </Form.Group>

        <Button variant="success" type="submit">
          Add product
        </Button>
      </Form>
    </div>
  );
};

export default AddItem;

/*

p_name
desc
price
category
sub_cat
brand
quantity
order_count
isAvailable
rating
made in
discount



*/
