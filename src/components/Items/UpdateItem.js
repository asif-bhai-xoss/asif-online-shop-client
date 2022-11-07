import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateItem = () => {
  const {pid} = useParams()
  const {products} = useSelector(state => state.products);
  const navigate = useNavigate();
  const foundProduct = products.find(product => product._id === pid)

  const [name, setName] = useState(foundProduct.p_name);
  const [desc, setDesc] = useState(foundProduct.desc);
  const [price, setPrice] = useState(foundProduct.price);
  const [cat, setCat] = useState(foundProduct.category);
  const [brand, setBrand] = useState(foundProduct.brand);
  const [quantity, setQuantity] = useState(foundProduct.quantity);
  const [discount, setDiscount] = useState(foundProduct.discount);
  const [img, setImg] = useState(foundProduct.img);
  const [madeIn, setMadeIn] = useState(foundProduct.made_in);
//   
  const handleUpdateItem = (e) => {
    e.preventDefault();
    const product = {p_name: name, desc, price, category: cat, brand, quantity, discount, img, made_in: madeIn}

    const url = `http://localhost:5000/api/products/${pid}`;
    axios.patch(url, product)
    .then(function (response) {
      alert("Product updated!!")
      navigate("/products", {replace: true})
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.message);
    });
  };
  
    return (
        <div className="container w-50 mx-auto text-start">
      <h3 className="text-success mb-3 mt-3">Update Item: {foundProduct.p_name}</h3>
      <Form onSubmit={handleUpdateItem}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} type="text"
          defaultValue={name}
           placeholder="Enter product name" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Product Description</Form.Label>
          <Form.Control onChange={(e) => setDesc(e.target.value)} as="textarea" 
          defaultValue={desc}
          placeholder="Enter product description" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Product Price</Form.Label>
          <Form.Control onChange={(e) => setPrice(e.target.value)} type="number"
          defaultValue={price}
          placeholder="Enter product price" />
        </Form.Group>

        <Form.Select onChange={(e) => setCat(e.target.value)} 
        defaultValue={cat}
        aria-label="Default select example">
          <option>Select Category</option>
          <option value="1">Motorcycle</option>
          <option value="2">Mobile</option>
          <option value="3">Laptop</option>
          <option value="4">Food</option>
        </Form.Select>
        <br />
        <Form.Select onChange={(e) => setBrand(e.target.value)} 
        defaultValue={brand}
        aria-label="Default select example">
          <option>Select Brand</option>
          <option value="1">Samsung</option>
          <option value="2">Xiaomi</option>
          <option value="3">Apple</option>
          <option value="4">Oppo</option>
        </Form.Select>

        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control onChange={(e) => setQuantity(e.target.value)} type="number"
          defaultValue={quantity}
          placeholder="Enter product quantity" />
        </Form.Group>

        <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
          <Form.Label>Product Discount</Form.Label>
          <Form.Control onChange={(e) => setDiscount(e.target.value)} type="number"
          defaultValue={discount}
          placeholder="Enter product discount" />
        </Form.Group>

        <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
          <Form.Label>Image URL</Form.Label>
          <Form.Control onChange={(e) => setImg(e.target.value)} type="url" 
          defaultValue={img}
          placeholder="Enter Image URL" />
        </Form.Group>

        <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
          <Form.Label>Made In</Form.Label>
          <Form.Control onChange={(e) => setMadeIn(e.target.value)} type="text"
          defaultValue={madeIn}
          placeholder="Enter country" />
        </Form.Group>

        <Button variant="success" type="submit">
          Update product
        </Button>
      </Form>
    </div>
    );
};

export default UpdateItem;