import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productsSlice";
import Item from "./Item";

const Items = () => {
  const { isLoading, products, error } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h3>Total Products: {products.length}</h3>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product, index) => <Item
              key={product._id}
              product={product}
              index = {index}
              ></Item>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Items;
