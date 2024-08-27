import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";
import { useAuthContext } from "@asgardeo/auth-react";

import "./styles.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Loading from "../Loading/Loading";
import { fetchOrders } from "../../redux/actions/order";
import OrderCard from "./OrderCard";
import { Link } from "react-router-dom";

const UserOrder = () => {
   const dispatch = useDispatch();
   const ordersData = useSelector((state) => state.order.orders);

   useEffect(() => {
      dispatch(fetchOrders());
   }, [dispatch]);


   if (!ordersData[0]) {
      return <Loading />;
   }


   return (
      <div
         style={{
            marginTop: "80px",
            alignItems: "center",
            justifyContent: "center",
         }}
      >
         <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-the-candy-shop-at-gordon-s-wizarding-world-image_2536653.jpg"
            alt="background"
            className="product--background"
         />
         <Grid container spacing={2}>
            <Grid
               item
               md={4}
               container
               alignItems="center"
               justifyContent="center"
            >
               <Typography variant="h4" gutterBottom>
                Orders count : {ordersData.length}
               </Typography>
            </Grid>
            <Grid
               item
               md={4}
               container
               alignItems="center"
               justifyContent="center"
            >
               <Typography variant="h4" gutterBottom>
               Total : $ {ordersData.reduce((acc, order) => acc + order.totalPrice, 0)}
               </Typography>           
                </Grid>
            <Grid
               item
               md={4}
               container
               alignItems="center"
               justifyContent="center"
            >
                        <Link to="/explore" style={{ color: "whitbacle" }}>
            <Button
               sx={{ my: 0 }}
               variant="filled"
               color="secondary"
               style={{
                  background: "#005A0E",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
               }}
            >
              Continue Shopping

            </Button>
         </Link>
            </Grid>

         </Grid>
         <div style={{ marginTop: "100px" }}>
            <Grid container spacing={2}>
               <Grid
                  item
                  xs={11}
                  container
               // alignItems="center"
               // justifyContent="center"
               >
                  {console.log(ordersData)}
                  {ordersData.map((order) => (
                     <Grid item xs={12}>
                        <OrderCard
                           id={order.id}
                           productId={order.productId}
                           productName={order.productName}
                           unitPrice={order.unitPrice}
                           totalPrice={order.totalPrice}
                           quantity={order.quantity}
                        />
                     </Grid>
                  ))}
               </Grid>
            </Grid>
         </div>
      </div>
   );
};

export default UserOrder;
