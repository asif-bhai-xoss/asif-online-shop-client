import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../features/productsSlice";

const Item = (props) => {
  const { _id, p_name, price, quantity } = props.product;
  let index = props.index;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   let index = 0;
  //   index = index + 1;

  const handleDetails = (pid) => {
    navigate(`/admin/products/${pid}`);
  };
  const handleUpdate = (pid) => {
    navigate(`/admin/products/update/${pid}`);
  };
  const handleDelete = async (pid) => {
    const res = window.confirm("Are you sure you want to delete this?");
    if (res) {
      const result = await axios.delete(
        `https://asif-online-shop-server.herokuapp.com/api/products/${pid}`
      );
      if (result.statusText === "OK") {
        alert("Product deleted!!");
        dispatch(fetchProducts());
      }
    }
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{p_name}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>
        <Button
          className="btn btn-info me-2"
          onClick={() => handleDetails(_id)}
        >
          Details
        </Button>
        <Button
          className="btn btn-warning me-2"
          onClick={() => handleUpdate(_id)}
        >
          Edit
        </Button>
        <Button className="btn btn-danger" onClick={() => handleDelete(_id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default Item;
