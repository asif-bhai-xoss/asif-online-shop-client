import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Users from './components/Admin/Users';
import CartItems from './components/Cart/CartItems';
import Footer from './components/HF/Footer';
import Header from './components/HF/Header';
import ToastMsg from './components/HF/ToastMsg';
import Home from './components/Home/Home';
import Page404 from './components/Home/Page404';
import AddItem from './components/Items/AddItem';
import ItemDetails from './components/Items/ItemDetails';
import Items from './components/Items/Items';
import UpdateItem from './components/Items/UpdateItem';
import CancelOrders from './components/Orders/CancelOrders';
import Checkout from './components/Orders/Checkout';
import CompleteOrders from './components/Orders/CompleteOrders';
import PackagingOrders from './components/Orders/PackagingOrders';
import ShippingOrders from './components/Orders/ShippingOrders';
import Products from './components/Products/Products';
import Email from './components/Profiles/Email';
import Login from './components/Profiles/Login';
import MyProfile from './components/Profiles/MyProfile';
import Register from './components/Profiles/Register';
import UpdateProfile from './components/Profiles/UpdateProfile';
import { fetchUser } from './features/userSlice';


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currUser, setCurrUser] = useState({});
  const { status, user, error } = useSelector(
    (state) => state.user
  );
  const {cartItems} = useSelector((state) => state.cartItems);

  useEffect(() => {
    const localName = localStorage.getItem("userName");
    const localToken = localStorage.getItem("activeToken");
    if (status === "succeeded" && localName && localToken) {
      //dispatch(fetchUser(localName));
      setCurrUser(user);
      //console.log("ff",status);
    }
    else if(status === "idle" && localName && localToken){
      dispatch(fetchUser(localName));
      setCurrUser(user);
    }
    else{
      //console.log(status);
      setCurrUser({});
    }
  }, [user, status, dispatch]);
  return (
    <div className="App">
      <Header currUser={currUser}
      cartItems={cartItems}
      ></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/home" element={<Home></Home>}/>
        <Route path="/register" element={<Register></Register>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/send-email" element={<Email></Email>}/>
        <Route path="/users/:userName" element={<MyProfile></MyProfile>}/>
        <Route path="/users/update/:userName" element={<UpdateProfile></UpdateProfile>}/>
        <Route path="/admin/products" element={<Items></Items>}/>
        <Route path="/products" element={<Products></Products>}/>
        <Route path="/cart" element={<CartItems></CartItems>}/>
        <Route path="/cart/checkout" element={<Checkout></Checkout>}/>
        <Route path="/users" element={<Users></Users>}/>
        <Route path="/:userName/orders/packaging" element={<PackagingOrders></PackagingOrders>}/>
        <Route path="/:userName/orders/shipping" element={<ShippingOrders></ShippingOrders>}/>
        <Route path="/:userName/orders/completed" element={<CompleteOrders></CompleteOrders>}/>
        <Route path="/:userName/orders/canceled" element={<CancelOrders></CancelOrders>}/>
        <Route path="/products/:pid" element={<ItemDetails></ItemDetails>}/>
        <Route path="/admin/products/:pid" element={<ItemDetails></ItemDetails>}/>
        <Route path="/admin/add-product" element={<AddItem></AddItem>}/>
        <Route path="/admin/products/update/:pid" element={<UpdateItem></UpdateItem>}/>
        <Route path="*" element={<Page404></Page404>}/>
      </Routes>
      <Footer></Footer>
      <ToastMsg />
    </div>
  );
}

export default App;
