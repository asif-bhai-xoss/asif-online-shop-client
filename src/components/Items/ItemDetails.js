import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../features/productsSlice';

const ItemDetails = () => {
    const {pid} = useParams();
    const {isLoading, products, error} = useSelector(state => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
      }, [dispatch]);

    const product = products.find(product => product._id === pid);

    return (
        <div>
            <h2>Product: {product?.p_name}</h2>
            <h5>Price: ${product?.price}</h5>
        </div>
    );
};

export default ItemDetails;