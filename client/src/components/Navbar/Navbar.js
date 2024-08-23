import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/system/Box";
import { useDispatch } from "react-redux";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from '@mui/icons-material/Home';
import { getToken } from "../Auth/getToken";
import { useAuthContext } from "@asgardeo/auth-react";

import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";
import { Button } from "@mui/material";


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
   transition: "color 0.3s", // Add color transition
   "&:hover": {
      color: "#94ba20", // Change text color on hover
   },
}));

const IconItem = styled(Item)(({ theme }) => ({
   "&:hover": {
      opacity: 1,
      color: "#94ba20",
   },
   "&:hover svg": { // Add hover effect for the svg icon
      color: "#94ba20", // Change the color to green on hover
   },
}));



const DropdownContent = styled("div")(({ theme }) => ({
   display: "none",
   position: "absolute",
   backgroundColor: "#f5f5f5",
   borderRadius: "10px",
   minWidth: "250px",
   textAlign: "left",
   zIndex: 1,
   top: "100px",
   opacity: 0,
   "&.show": {
      opacity: 1,
      display: "block", // Display the content when shown
   },
}));

const DropdownItem = styled("div")(({ theme }) => ({
   padding: "6px 12px",
   textDecoration: "none",
   display: "block",
   borderRadius: "10px",
   fontSize: "13px",
   marginTop: "5px",

   color: "black",
   "&:hover": {
      backgroundColor: "#e1e1e1",
   },
}));

const ProfileContainer = styled("div")(({ theme }) => ({
   position: "relative", // Ensure the container is relatively positioned
}));




const Navbar = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();

   // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const { state, getBasicUserInfo, signOut } = useAuthContext();
   const [userDetails, setUserDetails] = useState();

   useEffect(() => {
      if (state?.isAuthenticated) {
         getBasicUserInfo()
            .then((response) => {
               setUserDetails(response);
               window.localStorage.setItem("user", JSON.stringify(response));
            })
            .catch((error) => {
               console.error("Failed to load response " + error);
            });
      }
   }, [getBasicUserInfo]);


   const handleSignOut = () => {
      if (state?.isAuthenticated) {
         signOut();
         window.localStorage.clear();
         navigate("/home");
      }
      window.location.reload();
   }

   const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };

   // const role = userDetails?.groups?.includes("ADMIN") ? "ADMIN" : "USER";
   let role;
   if (userDetails?.groups?.includes("ADMIN")) {
      role = "ADMIN";
   } else if (userDetails?.groups?.includes("MANUFACTURER")) {
      role = "MANUFACTURER";
   } else {
      role = "USER";
   }

   console.log(userDetails);
   console.log(role);

   const renderComponentOrder = () => {
      switch (role) {
         case "ADMIN":
            return "admin-orders";
         case "MANUFACTURER":
            return "seller-orders";
         default:
            return "user-orders";
      }
   };

   const componentToRenderOrder = renderComponentOrder();

   const renderComponentExplore = () => {
      switch (role) {
         case "ADMIN":
            return "explore";
         case "MANUFACTURER":
            return "addproductdetails";
         default:
            return "explore";
      }
   };

   const componentToRenderExplore = renderComponentExplore();


   const authNavItems = (
      <Grid
         width={{ xs: "100%", sm: "100%", md: "100%" }}
         container
         position="relative"
         spacing={{ xs: 2, md: 3 }}
         columns={{ xs: 12, sm: 16, md: 24 }}
      >
         <Grid
            xs={4} sm={8} md={14}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
         >
            <Link to='/'>
               <img
                  src="https://res.cloudinary.com/dl8dikngu/image/upload/v1716972002/Screenshot_from_2024-05-29_14-09-50_hzcjje.png"

                  alt="iTeaLogo"
                  width="160px"

                  style={{
                     marginTop: "15%",
                     marginBottom: "10%",
                     marginLeft: "100%",
                     objectFit: "cover",
                     position: "relative",
                     top: "0px",
                  }}
               />
            </Link>
         </Grid>
         <Grid
            xs={4} sm={8} md={9}
            container
            columns={{ xs: 3, sm: 6, md: 9 }}
         >
            <Grid
               xs={1} sm={2} md={2}
               container
               direction="row"
               justifyContent="flex-end"
               alignItems="center"

            >
               <Item to='/' style={{ marginLeft: "10%" }}>
                  <HomeIcon
                     style={{ marginRight: "5px", color: "black", fontSize: "25px" }}
                  />
                  
                  <span className="icon-text">
                     HOME
                  </span>
               </Item>
            </Grid>
            <Grid
               xs={1} sm={2} md={2}
               container
               direction="row"
               justifyContent="flex-end"
               alignItems="center"

            >
               <Item to={componentToRenderExplore} style={{ marginLeft: "10%" }}>
                  <ExploreIcon
                     style={{ marginRight: "5px", color: "black", fontSize: "25px" }}
                  />
                  <span className="icon-text">
                     PRODUCTS
                  </span>
               </Item>
            </Grid>
            <Grid
               xs={1} sm={2} md={2}
               container
               direction="row"
               justifyContent="center"
               alignItems="center"
            >
               <Item to={componentToRenderOrder}>
                  <ShoppingCartIcon
                     style={{ marginRight: "5px", color: "black", fontSize: "25px" }}
                  />
                  <span className="icon-text">
                     ORDERS
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
         {authNavItems}
      </Box>
   );
};

export default Navbar;

