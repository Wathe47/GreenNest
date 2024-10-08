import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteOrder, updateOrder } from "../../redux/actions/order";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const initialState = {
   quantity: null,
};

const EditOrder = ({ order, onClose }) => {
   const [newQuantity, setNewQuantity] = useState(initialState);
   const dispatch = useDispatch();

   const handleUpdate = () => {
      const updatedOrder = {
         ...order,
         quantity: newQuantity.quantity,
      };

      dispatch(updateOrder(order.id, updatedOrder));
      onClose();
   };

   const handleClose = () => {
      onClose();
   };

   const handleDelete = () => {
      const updatedOrder = {
         ...order,
         quantity: 0,
         cancelled: true,
      };

      // dispatch(updateOrder(order.id, updatedOrder));
      dispatch(deleteOrder(order.id));
      onClose();
      window.location.reload();
   };

   return (
      <Modal open={true} onClose={onClose}>
         <Box
            sx={{
               position: "absolute",
               width: 400,
               bgcolor: "background.paper",
               boxShadow: 24,
               p: 3,
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
            }}
         >
            <Typography variant="h6" style={{ marginBottom: "20px" }}>
               Edit Order
            </Typography>
            <TextField
               label="New Quantity"
               type="number"
               value={newQuantity.quantity}
               onChange={(e) =>
                  setNewQuantity({ ...newQuantity, quantity: e.target.value })
               }
               fullWidth
            />
            <Button
               variant="contained"
               color="primary"
               onClick={handleUpdate}
               style={{ marginTop: "16px",borderRadius: "12px" }}
            >
               Update
            </Button>
            <Button
               variant="contained"
               onClick={handleClose}
               style={{
                  marginTop: "16px",
                  marginLeft: "8px",
                  backgroundColor: "rgb(56, 138, 56)",
                  borderRadius: "12px"
               }}
            >
               Close
            </Button>
            <Button
               variant="contained"
               onClick={handleDelete}
               color="error"
               style={{
                  marginTop: "16px",
                  marginLeft: "32px",
                  borderRadius: "12px"
               }}
            >
               Delete
            </Button>
         </Box>
      </Modal>
   );
};

export default EditOrder;
