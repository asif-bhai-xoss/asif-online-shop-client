import React from 'react';
import { ToastContainer } from 'react-toastify';

const ToastMsg = () => {
    return (
        <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    );
};

export default ToastMsg;