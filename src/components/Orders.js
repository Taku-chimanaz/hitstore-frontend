import { useEffect, useState } from 'react'
import './../css/Orders.css'
import AdminHeader from './AdminHeader'
import { SearchBar } from './SearchBar'
import {backendUrl} from './../js/data'
import { handleResponse } from '../js/handleResponses'
import { ResponseMessage } from './Products'
import { cancelOrder } from '../js/cancelOrder'

const Orders = () => {
  return (
    
    <>
        <AdminHeader/>
        <SearchBar placeholderText={"Search For Order"}/>
        <AllOrders/>
    </>
  )
}

const AllOrders = () => {

  const [allOrders, setAllOrders]  = useState([]);


  const [statusMessageOpts, setStatusMessageOpts] = useState({
    show: false,
    message: "Fetching the gossips",
    color: ""
  })

  useEffect(() => {

    fetch(`${backendUrl}/api/orders/get-all-orders`)
    .then(res => res.json())
    .then(result => {

        handleResponse(
          result.message,
          result.orders,
          statusMessageOpts,
          setStatusMessageOpts,
          setAllOrders  
        )
    })
    .catch((err) => {
        
       handleResponse(
          "err",
          null,
          statusMessageOpts,
          setStatusMessageOpts,
          null
       )
    })

  },[])

  return (

    <section className="all-orders">
      {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}
      
      {
        allOrders.length > 0 &&

        allOrders.map(order => {
          
           return <Order key={order._id} order={order}/>
         })
      }
    </section>
  )
}

const Order = ({order}) => {

  const [orderStatus, setOrderStatus] = useState(order.orderStatus)
  const [statusMessageOpts, setStatusMessageOpts] = useState({
    show: false,
    message: "",
    color: ""
  })


  const markOrderDelivered = () => {

    const token = JSON.parse(localStorage.getItem("token"));

    fetch(`${backendUrl}/api/orders/mark-order-delivered/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    .then(res => res.json())
    .then(result => {

       handleResponse(
         result.message,
         null,
         statusMessageOpts,
         setStatusMessageOpts,
         setOrderStatus
       )
    })
    .catch(() => {
      handleResponse(
        "err",
        null,
        statusMessageOpts,
        setStatusMessageOpts,
        null
      )
    })
  }
  
  return (
    <article className="order">

        {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}<br/><br/>
        <div className="customer-details">

          <div className="name-container">
            <h4>name of customer</h4>
            <p>{order.nameOfCustomer}</p>
          </div>

          <div className="phone-number-container">
            <h4>mobile number</h4>
            <p>{order.phoneNumber}</p>
          </div>

        </div>

        <div className="order-details">

          <div className="ordered-product-container">
            <h4>ordered product</h4>
            <p>{order.orderedProduct}</p>
          </div>

          <div className="order-quantity">
            <h4>order quantity</h4>
            <p>{order.quantity}</p>
          </div>

        </div>

        <div className="order-status-container">
           <h4>Order Status</h4>
           <p>{orderStatus}</p>
        </div>

        <div className="cancel-delivered-btn">
          <button onClick={() => cancelOrder(order._id, statusMessageOpts, setStatusMessageOpts, setOrderStatus)} className="cancel-order-btn">
            cancel
          </button>

          <button onClick={markOrderDelivered} className="mark-delivered-btn">
            delivered
          </button>
        </div>

      </article>

  )
}

export default Orders