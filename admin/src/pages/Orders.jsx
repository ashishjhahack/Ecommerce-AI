import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      console.log("No token found");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      console.log("Full API response:", response.data);

      if (response.data.success) {
        // ✅ Convert to array if it's a single object
        const data = response.data.orders.reverse();
        const ordersArray = Array.isArray(data) ? data : [data];
        console.log("Orders received:", ordersArray);
        setOrders(ordersArray);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const res = await axios.post(`${backendUrl}/api/order/status`, {orderId, status: event.target.value}, {headers: {token}})
      if(res.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order._id || index} className='border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start text-xs sm:text-sm text-gray-700'>
              <img className='w-12' src={assets.parcel_icon} alt="parcel" />
              <div>
                <div>
                  {Array.isArray(order.items) && order.items.map((item, i) => (
                    <p className='py-0.5' key={i}>{item.name} x {item.quantity} <span>({item.size})</span>,</p>
                  ))}
                </div>

                <p className='mt-3 mb-2 font-medium'>{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.city}, {order.address.street}, {order.address.country}, {order.address.zipcode}</p>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px] '><strong>{currency}{order.amount}</strong></p>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 fornt-semibold'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>

    </div>
  );
};

export default Orders;
