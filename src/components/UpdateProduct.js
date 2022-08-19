import React, {useState} from 'react';
import { backendUrl } from '../js/data';
import './../css/UpdateProduct.css';
import { handleResponse } from '../js/handleResponses';
import { ResponseMessage } from './Products';

const UpdateProduct = ({setShowUpdateForm, id, productName, price, desc}) => {

    const [nameUpdate, setNameUpdate] = useState(productName);
    const [priceUpdate, setPriceUpdate] = useState(price);
    const [descUpdate, setDescUpdate] = useState(desc)
    let file;
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Updating product",
        color: ""
    })


    const submitUpdateDetails = (e) => {
        e.preventDefault();
        setStatusMessageOpts({...statusMessageOpts, show: true})
        const token = JSON.parse(localStorage.getItem('token'));

        const form = new FormData();

        form.append('id', id);
        form.append('image', file)
        form.append('name', nameUpdate);
        form.append('price', priceUpdate);
        form.append('description', nameUpdate);


        fetch(`${backendUrl}/api/products/update-product`, {
            method: "PUT",
            headers: {
                "Authorization": token
            },
            body: form
        })
        .then(res => res.json())
        .then(result => {

            handleResponse(
                result.message,
                null,
                statusMessageOpts,
                setStatusMessageOpts,
                null
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
    <form className="update-product-form">
            <button onClick={() => setShowUpdateForm(false)} className="close-product-form-btn ">X</button> 
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}

            <div className="product-update-name-input-container">
                <input type="text" value={nameUpdate} onChange={e => setNameUpdate(e.target.value)}/>
            </div>

            <div className="price-input-container">
                <input type="number"  value={priceUpdate} onChange={e => setPriceUpdate(e.target.value)}/>
            </div>

            <div 
            className="description-input-container">
                <textarea value={descUpdate} onChange={e => setDescUpdate(e.target.value)}></textarea>
            </div>

            <input type="file" value={file} className="update-image" onChange={e => file = e.target.files[0]}/>

            <div className="update-product-btn-container">
                <button onClick={e => submitUpdateDetails(e)} className="submit-update-btn">
                    Submit Update
                </button>
            </div>
        </form>
  )
}

export default UpdateProduct