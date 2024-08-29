import Box from "@mui/system/Box";
import React, { useEffect } from "react";

import ExploreIcon from "@mui/icons-material/Explore";
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";
import { Link } from "react-router-dom";

import { Badge } from "@mui/material";
import "./styles.css";
import logo1 from '../../resources/logo1.png'
import logo4 from '../../resources/logo4.png'
import { useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/actions/order";


const mode = "light"; // Replace with your desired mode (either "dark" or "light")

const Item = styled(Link)(({ theme }) => ({
   border: "0px solid",
   borderColor: mode === "dark" ? "#444d58" : "#ced7e0",
   borderRadius: "0px",
   textAlign: "center",
   letterSpacing: "1px",
   color: "#3D3B3A",
   textDecoration: "none",
   fontWeight: "500",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   transition: "color 0.3s", // Add color transition for text
   "&:hover": {
      color: "#007F12 ", // Change text color on hover
      "& svg": { // Target the icon class from MUI
         color: "#007F12", // Change icon color on hover
         transition: "color 0.3s", // Add color transition for icons
      },
   },
}));



const Navbar = () => {

   const dispatch = useDispatch();
   const [orderCount, setOrderCount] = React.useState(0);

   useEffect(() => {
      dispatch(fetchOrders())
      .then((result) => {
         setOrderCount(result.length);
      }).catch((err) => {
         console.log(err);
      });
   }, [dispatch]);


   const navItems = (
      <Grid
         width={{ xs: "100%", sm: "100%", md: "100%" }}
         container
         position="relative"
         spacing={{ xs: 2, md: 3 }}
         columns={{ xs: 12, sm: 16, md: 24 }}
      >
         <Grid
            xs={4} sm={8} md={4}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
         >
            <Link to='/'>
               <img
                  src={logo4}
                  alt="GreenNest"
                  height="45px"

                  style={{
                     marginTop: "9%",
                     marginBottom: "7%",
                     objectFit: "cover",
                     position: "relative",
                     top: "0px",
                  }}
               />
            </Link>
         </Grid>
         <Grid
            xs={4} sm={8} md={12}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
         >
            <Link to='/'>
               <img
                  src={logo1}
                  alt="GreenNest"
                  height="45px"

                  style={{
                     marginTop: "9%",
                     marginBottom: "7%",
                     objectFit: "cover",
                     position: "relative",
                     top: "0px",
                  }}
               />
            </Link>
         </Grid>
         <Grid
            xs={4} sm={8} md={7}
            container
            columns={{ xs: 3, sm: 6, md: 10 }}
         >

            <Grid
               xs={1} sm={2} md={3}
               container
               direction="row"
               justifyContent="flex-start"
               alignItems="center"

            >
               <Item to={'/explore'} style={{ marginLeft: "10%" }}>
                  <ExploreIcon
                     style={{ marginRight: "5px", fontSize: "25px" }}
                  />
                  <span className="icon-text">
                     EXPLORE
                  </span>
               </Item>
            </Grid>
            <Grid
               xs={1} sm={2} md={3}
               container
               direction="row"
               justifyContent="center"
               alignItems="center"

            >
               <Item to='/products' style={{ marginLeft: "10%" }}>
                  <InventoryIcon
                     style={{ marginRight: "5px", fontSize: "25px" }}
                  />

                  <span className="icon-text">
                     PRODUCTS
                  </span>
               </Item>
            </Grid>
            <Grid
               container
               direction="row"
               justifyContent="center"
               alignItems="center"
               xs={1} sm={2} md={3}
            >
               <Item to='/user-orders'>
                  <Badge badgeContent={orderCount} color="success">
                     <ShoppingCartIcon
                        style={{ marginRight: "5px", fontSize: "25px" }}
                     />
                  </Badge>
                  <span className="icon-text" style={{ marginLeft: '10px' }}>
                     CART
                  </span>
               </Item>
            </Grid>
         </Grid>

      </Grid>)


   return (
      <Box
         sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column", // Change to column layout
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
         }}
         style={{ width: "100%", }} // Add width: "100%" to stretch across the screen
         className="navbar"
      >
         <div className="navBack"></div>
         {navItems}
      </Box>
   );
};

export default Navbar;

