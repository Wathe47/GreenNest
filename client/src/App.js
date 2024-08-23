import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Explore from "./components/Explore/Explore";
import AddProductForm from "./components/AddProduct/AddProduct";
import AddProductInfoForm from "./components/AddProductDetails/AddProductDetails";
import ExploreProduct from "./components/Explore/ExploreProduct";
import UserOrder from "./components/Order/UserOrder";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/explore" element={<Explore />} />
          <Route path="/addProduct" element={<AddProductForm />} />
          <Route path="/explore/:id" element={<ExploreProduct />} />
          <Route path="/addProductDetails" element={<AddProductInfoForm />} />
          <Route path="/user-orders" element={<UserOrder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
