import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productsSlice";
import Product from "./Product";
import "./Products.css";

const Products = () => {
    const { isLoading, products, error } = useSelector((state) => state.products);

    const { status, user} = useSelector((state) => state.user);
    //const getCartId = useSelector(getCartId);
    //const getCart = useSelector(getCart);
    //const getCartStatus = useSelector(getCartStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    
  }, [dispatch]);
    return (
        <div className="container-fluid mx-auto">
            <h3>Total Products: {products.length}</h3>
            <div className="container-fluid mt-5 products">
            {
              products.map((product, index) => <Product
              key={product._id}
              product={product}
              index = {index}
              ></Product>)
            }
            </div>
        </div>
    );
};

export default Products;