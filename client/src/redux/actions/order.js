import {
   FETCH_ORDERS,
   ADD_ORDER,
   DELETE_ORDER,
   UPDATE_ORDER,
} from "../constants/actionTypes";
import * as api from "../../api/index.js";

export const fetchOrders = () => async (dispatch) => {
   try {
      const { data } = await api.fetchOrders();

      dispatch({ type: FETCH_ORDERS, payload: data });

      return Promise.resolve(data);
   } catch (error) {
      console.log(error);

      return Promise.reject(error);
   }
};



export const deleteOrder = (id) => async (dispatch) => {
   try {
      await api.deleteOrder(id);

      dispatch({ type: DELETE_ORDER, payload: id });
   } catch (error) {
      console.log(error);
   }
};

export const addOrder = (orderData) => async (dispatch) => {
   try {
      const { data } = await api.addOrder(orderData);
      console.log(JSON.stringify(data).length);
      dispatch({ type: ADD_ORDER, payload: data });
   } catch (error) {
      console.log(error);
   }
};

export const updateOrder = (id, updatedOrderData) => async (dispatch) => {
   try {
      const { data } = await api.updateOrder(id, updatedOrderData);
      dispatch({ type: UPDATE_ORDER, payload: data });
   } catch (error) {
      console.log(error);
   }
};


