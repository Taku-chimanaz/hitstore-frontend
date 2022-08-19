/*  
    CSS for the form  is in the Products.css file
    It shares code between some buttons
*/

import {useState} from 'react';
import { backendUrl } from '../js/data';
import { handleResponse } from '../js/handleResponses';
import { ResponseMessage } from './Products';

const ProductOrderFormContainer = ({setShowOrderForm, productName}) => {

    const closeOrderForm = () => {
        setShowOrderForm(false)
    }

    const [statusMessageOpts,setStatusMessageOpts] = useState({
        show: false,
        message: 
        "Order Submission in process", 
        color: ""
    });

    // setting up controlled inputs
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [quantity, setQuantity] = useState("");

    const submitOrder = (e) => {
        e.preventDefault();
        setStatusMessageOpts({...statusMessageOpts, show: true});

        if(customerName === "" || phoneNumber === "" || quantity === ""){

            setStatusMessageOpts({
                show: true, 
                message: "All fields are required", 
                color: "error"
            })
        }

        const orderDetails = {
            nameOfCustomer: customerName,
            orderedProduct: productName,
            quantity,
            phoneNumber
        }

        // submitting order details
        fetch(`${backendUrl}/api/orders/create-order`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(result => { 
            console.log(result)
            handleResponse(result.message, null, statusMessageOpts, setStatusMessageOpts, null)
        })
        .catch(() =>{
            handleResponse("err", null, statusMessageOpts, setStatusMessageOpts, null);
        })
    }

    return (

        <form className="order-form">
            <button onClick={closeOrderForm}className="close-order-form-btn ">X</button> 
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}

            <div className="ordered-product-input-container">
                <input type="text" value={productName} placeholder="Order Product" readOnly/>
            </div>

            <div className="customer-name-input-container">
                <input type="text"  placeholder="Enter your name" value={customerName} onChange={e => setCustomerName(e.target.value)}/>
            </div>

            <div 
            className="customer-number-input-container">
                <input type="text" placeholder="Enter phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
            </div>

            <div className="quantity-container">
                <input type="number" placeholder="Enter quantity" value={quantity} onChange={e => setQuantity(e.target.value)}/>
            </div>

            <div className="place-order-btn-container">
                <button className="place-order-btn" onClick={submitOrder}>
                    Place Order
                </button>
            </div>
        </form>
    )
}

export default ProductOrderFormContainer