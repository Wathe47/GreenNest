import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Button, TextField } from "@mui/material";
import Loading from "../Loading/Loading";
import ProductList from "./Explore"; // Ensure this import path matches your file structure
import { addOrder } from "../../redux/actions/order";
import { fetchProductById } from "../../redux/actions/product";

import "./styles.css";

const initialState = {
   quantity: null,
   productId: null,
   unitPrice: null,
   totalPrice: null,
   productName: "",
   address: "",
};

const ImageCarousel = () => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const product = useSelector((state) => state.singleProduct);
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [formData, setFormData] = useState(initialState);

   useEffect(() => {
      dispatch(fetchProductById(id));
   }, [dispatch, id]);

   if (!product.id) {
      return <Loading />;
   }

   const handleChange = (e) => {
      const quantity = parseInt(e.target.value, 10);
      setFormData({
         ...formData,
         productId: product.id,
         unitPrice: product.price,
         totalPrice: product.price * quantity,
         productName: product.name,
         quantity: quantity,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      dispatch(addOrder(formData));
      window.location.reload();
   };

   const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrls.length);
   };

   const prevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.imageUrls.length) % product.imageUrls.length);
   };

   return (
      <div style={{ marginTop: "80px" }}>
         <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
               <div className="image-carousel-container">
                  <img
                     src={product.imageUrls[currentImageIndex]}
                     alt={product.name}
                     className="product-image"
                     style={{ width: "100%", height: "100%", marginLeft: "10%" }}
                  />
                  <Button onClick={prevImage}>Prev</Button>
                  <Button onClick={nextImage}>Next</Button>
               </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
               <div style={{ marginTop: "-10%", textAlign: "left", marginLeft: "25%" }}>
                  <Typography variant="h3">{product.name}</Typography>
                  <Typography variant="body1">{product.description}</Typography>
                  <div style={{ height: "80px" }}></div>
                  <Typography variant="h6">LKR {product.price}.00</Typography>
                  <Typography variant="body2">Available Quantity: {product.quantity}</Typography>

               </div>

               <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                  <>
                     <TextField
                        name="quantity"
                        placeholder="Quantity"
                        type="number"
                        onChange={handleChange}
                        variant="outlined"
                        required
                        InputProps={{
                           style: { height: "40px", width: "120px" } // Adjust the height as needed
                        }}
                     />
                     <Button type="submit" variant="contained" color="primary" style={{ marginLeft: "5%", backgroundColor: "#005A0E" }}>
                        Add to Cart
                     </Button>
                  </>
               </form>
            </Grid>
         </Grid>

         <ProductList />
      </div>
   );
};

export default ImageCarousel;
