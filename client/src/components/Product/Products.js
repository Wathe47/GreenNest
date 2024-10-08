import React, { useState, useEffect } from "react";
import {
   TextField,
   Button,
   Typography,
   Paper,
   Container,
   Box,
   Card,
   CardMedia,
   CardContent,
   Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
   fetchProducts,
   updateDetails,
   deleteProduct,
} from "../../redux/actions/product"; // Make sure to import `updateDetails`
import { Link } from "react-router-dom";

import "./styles.css";

const Products = () => {
   const [errors, setErrors] = useState({});
   const products = useSelector((state) => state.products);
   const [showAlert, setShowAlert] = useState(false);

   const [productData, setProductData] = useState({
      name: "",
      price: "",
      description: "",
      imageUrls: [],
      quantity: "",
      addQuantity: "",
   });

   const [currentId, setCurrentId] = useState(null);
   const [showForm, setShowForm] = useState(false);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchProducts());
   }, [dispatch]);

   const handleSubmit = (e) => {
      e.preventDefault();

      const formErrors = [];

      if (!productData.name) {
         formErrors.push("Product Name is required");
      }
      if (!productData.description) {
         formErrors.push("Description is required");
      }
      if (!productData.price) {
         formErrors.push("Price is required");
      }
      if (!productData.addQuantity) {
         productData.addQuantity = 0;
      }

      if (formErrors.length > 0) {
         setErrors(formErrors);
         return;
      }

      const newQuantity =
         parseInt(productData.quantity) + parseInt(productData.addQuantity);

      dispatch(
         updateDetails(currentId, { ...productData, quantity: newQuantity })
      );
      clear();

   };

   const clear = () => {
      setProductData({
         name: "",
         price: "",
         description: "",
         imageUrls: [],
         quantity: "",
         addQuantity: "",
      });

      setShowAlert(true);
   };

   const handleCardClick = (clickedProduct) => {
      setProductData({
         name: clickedProduct.name,
         price: clickedProduct.price,
         description: clickedProduct.description,
         imageUrls: clickedProduct.imageUrls,
         quantity: clickedProduct.quantity,
      });

      setCurrentId(clickedProduct.id);
      setShowForm(true);

      window.scrollTo({
         top: document.body.scrollHeight,
         behavior: "smooth",
      });
   };


   useEffect(() => {
      if (showAlert) {
         const timer = setTimeout(() => {
            setShowAlert(false);
         }, 5000);
         return () => clearTimeout(timer);
      }
   }, [showAlert]);

   console.log(showAlert);

   return (
      <Container maxWidth>

         <Box>
            <Typography
               variant="h4"
               style={{
                  fontFamily: "Poppins",
                  marginTop: "50px",
                  fontWeight: "bold",
                  color:'#3C2E19'
               }}
            >
               MY PRODUCTS
            </Typography>
            {errors.length > 0 && (
               <Paper
                  elevation={3}
                  style={{
                     padding: "10px",
                     color: "red",
                     marginBottom: "10px",
                  }}
               >
                  {errors.join(", ")}
               </Paper>
            )}
            {products.length === 0 && (
               <Typography
                  variant="h6"
                  style={{
                     fontFamily: "Poppins",
                     marginTop: "50px",
                     marginBottom: "30px",
                  }}
               >
                  No products found.
               </Typography>
            )}

         </Box>
         <Link to="/addproduct" style={{ color: "whitbacle" }}>
            <Button
               sx={{ my: 0 }}
               variant="filled"
               color="secondary"
               onClick={clear}
               style={{
                  background: "#005A0E",
                  borderRadius: "20px",
                  marginTop: "-30px",
                  marginBottom: "-120px",
                  marginLeft: "70%",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
               }}
            >
               ADD PRODUCTS

            </Button>
         </Link>
         {showAlert && (<Box sx={{ width: '100%', marginTop: '40px' }}>
            <Alert sx={{ mb: 2, width: '40%', margin: 'auto', padding: '0', marginTop: '20px', fontSize: '18px', }}>
               Product has been Updated successfully!
            </Alert>
         </Box>)}
         <Box
            sx={{
               display: 'grid',
               gridTemplateColumns: 'repeat(4, 1fr)',
               gap: '80px',
               width: '90%',
               padding: '50px',
               paddingLeft: '80px',
               margin: 'auto',
               mt: 10,
               background: '#D6D5CA',
               borderRadius: '10px',   
            }}
         >
            {products.map((product) => (
               <Card
                  key={product.id}
                  style={{
                     maxWidth: '300px',
                     borderRadius: '10px',
                     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                  }}
               >
                  <CardMedia
                     component="img"
                     alt={product.name}
                     height="200px"
                     image={product.imageUrls[0]}
                  />
                  <CardContent>
                     <Typography gutterBottom variant="h6" component="div" fontWeight={'bold'}>
                        {product.name}
                     </Typography>
                     <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{
                           whiteSpace: 'nowrap',
                           overflow: 'hidden',
                           textOverflow: 'ellipsis',
                           maxWidth: '100%',
                        }}
                     >
                        {product.description}
                     </Typography>
                     <Typography
                        variant="h6"
                        color="text.primary"
                        style={{
                           whiteSpace: 'nowrap',
                           overflow: 'hidden',
                           textOverflow: 'ellipsis',
                           fontWeight: '600',
                        }}
                     >
                        LKR {product.price}.00
                     </Typography>
                     <Typography
                        variant="body2"
                        color="text.primary"
                        style={{
                           whiteSpace: 'nowrap',
                           overflow: 'hidden',
                           textOverflow: 'ellipsis',
                           fontWeight: '500',
                        }}
                     >
                        Available Quantity: {product.quantity}
                     </Typography>
                  </CardContent>
                  <Button
                     onClick={() => handleCardClick(product)}
                     size="small"
                     style={{
                        background: '#005A0E',
                        marginBottom: '0px',
                        color: 'white',
                        fontSize: 'small',
                        borderRadius: '0',
                        position: 'relative',
                        width: '50%',
                        height: '50px',
                     }}
                  >
                     Edit
                  </Button>
                  <Button
                     onClick={() => dispatch(deleteProduct(product.id))}
                     size="small"
                     style={{
                        position: 'relative',
                        width: '50%',
                        marginBottom: '0px',
                        borderRadius: '0',
                        color: 'white',
                        background: 'black',
                        fontSize: 'small',
                        height: '50px',
                     }}
                  >
                     Delete
                  </Button>
               </Card>
            ))}
         </Box>

         {showForm && (
            <Paper
               className="paper"
               style={{
                  position: "relative",
                  maxWidth: "25%",
                  maxHeight: "4000px",
                  margin: "170px 0 0 50%",
                  transform: "translate(-50%, 0)",
               }}
               elevation={0}
            >
               <Typography
                  variant="h6"
                  style={{
                     marginBottom: "20px",
                     fontWeight: "600",
                     fontSize: "30px",
                  }}
               >
                  {currentId ? "Add Details" : "Edit Products"}
               </Typography>
               <Paper
                  className="paper"
                  fullWidth
                  style={{
                     position: "relative",
                     display: "flex",
                     maxWidth: "100%",

                  }}
                  elevation={0}
               >
                  <form
                     autoComplete="off"
                     noValidate
                     className="form"
                     onSubmit={handleSubmit}
                  >
                     <TextField
                        sx={{ my: 0.5 }}
                        name="product_name"
                        variant="outlined"
                        label="Product Name"
                        fullWidth
                        required
                        value={productData.name}
                        onChange={(e) =>
                           setProductData({ ...productData, name: e.target.value })
                        }
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        onFocus={() => {
                           setErrors({ ...errors, name: "" });
                        }}
                     />

                     <TextField
                        sx={{ my: 0.5 }}
                        multiline
                        name="description"
                        variant="outlined"
                        label="Description"
                        fullWidth
                        required
                        value={productData.description}
                        onChange={(e) =>
                           setProductData({ ...productData, description: e.target.value })
                        }
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        onFocus={() => {
                           setErrors({ ...errors, description: "" });
                        }}
                     />
                     <TextField
                        sx={{ my: 0.5 }}
                        name="imageUrls"
                        variant="outlined"
                        label="ImageUrls"
                        fullWidth
                        required
                        value={productData.imageUrls.join(", ")}
                        onChange={(e) =>
                           setProductData({
                              ...productData,
                              imageUrls: e.target.value
                                 .split(", ")
                                 .filter((url) => url.trim() !== ""),
                           })
                        }

                     />


                     <TextField
                        sx={{ my: 0.5 }}
                        name="price"
                        variant="outlined"
                        label="Price"
                        fullWidth
                        required
                        value={productData.price}
                        onChange={(e) =>
                           setProductData({ ...productData, price: e.target.value })
                        }
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                        onFocus={() => {
                           setErrors({ ...errors, price: "" });
                        }}
                     />

                     <TextField
                        sx={{ my: 0.5 }}
                        name="quantity"
                        variant="outlined"
                        label="Quantity"
                        fullWidth
                        required
                        value={productData.quantity}
                        onChange={(e) =>
                           setProductData({ ...productData, quantity: e.target.value })
                        }
                        error={Boolean(errors.quantity)}
                        helperText={errors.quantity}
                        onFocus={() => {
                           setErrors({ ...errors, quantity: "" });
                        }}
                     />
                     <TextField
                        sx={{ my: 3 }}
                        name="addQuantity"
                        variant="outlined"
                        label="addQuantity"
                        fullWidth
                        value={productData.addQuantity}
                        onChange={(e) =>
                           setProductData({ ...productData, addQuantity: e.target.value })
                        }
                        error={Boolean(errors.addQuantity)}
                        helperText={errors.addQuantity}
                        onFocus={() => {
                           setErrors({ ...errors, addQuantity: "" });
                        }}
                        style={{ marginTop: "0px" }}
                     />
                  </form>
               </Paper>
               <Button
                  sx={{ my: 0.5 }}
                  className="buttonSubmit"
                  variant="outlined"
                  size="large"
                  onClick={handleSubmit}
                  type="submit"
                  style={{
                     background: "#005A0E",
                     borderRadius: "20px",
                     border: "none",
                     marginTop: "-10px",
                     color: "white",
                     fontSize: "small",
                  }}
               >
                  {currentId ? "Update" : "Select"}
               </Button>
               <Button
                  sx={{ my: 0 }}
                  variant="filled"
                  color="secondary"
                  size="small"
                  onClick={clear}
                  style={{
                     background: "white",
                     borderRadius: "20px",
                     marginTop: "-5px",
                     color: "#005A0E",
                     fontSize: "13px",
                  }}
                  fullWidth
               >
                  Clear
               </Button>

            </Paper>
         )}
      </Container>
   );
};

export default Products;
