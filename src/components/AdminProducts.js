import { useState, useEffect } from 'react';
import './../css/AdminProducts.css';
import AdminHeader from './AdminHeader';
import { SearchBar} from './SearchBar';
import {backendUrl} from './../js/data';
import {handleResponse} from './../js/handleResponses';
import { ResponseMessage } from './Products';
import ProductDetails from './ProductDetails';
import UpdateProduct from './UpdateProduct';

export const AdminProducts = () => {
 
    const [products, setProducts] =  useState([]);
    const [showAllItems, setShowAllItems] = useState(true)
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: true,
         message: "Fetching Products",
         color: ""
    });

    useEffect(()=>{
    
       
        fetch(`${backendUrl}/api/products/get-all-products`,{
            method: "GET",
        })
        .then(res => res.json())
        .then(result => {

            handleResponse(
                result.message,
                result.products,
                statusMessageOpts,
                setStatusMessageOpts, 
                setProducts
            );       
        })
        .catch(() => {
            handleResponse("err", 
            null, statusMessageOpts, 
            setStatusMessageOpts, 
            setProducts);
        })
       
    },[])

    return (
    
        <>
            <AdminHeader/>
            <AddProductSection products={products} setProducts ={setProducts}/>
            <SearchBar placeholderText={"Search for Product"} data={products} showAllItems={showAllItems} setShowAllItems={setShowAllItems} category={"products"}/>
            {showAllItems && <AvailableProducts statusMessageOpts={statusMessageOpts} setStatusMessageOpts={setStatusMessageOpts} setProducts={setProducts}  products={products}/>}
        </>
    )
}

const AddProductSection = ({products, setProducts}) => {


    const toggleForm = (e) => {
        const addForm  = document.querySelector(".add-product-form");
        const addProductBtn = document.querySelector(".add-product-btn");
        const closeFormBtn = document.querySelector(".close-add-product-btn");

        addForm.classList.toggle("show-form");
        addProductBtn.classList.toggle("hide-add-product-btn");
        closeFormBtn.classList.toggle("show-close-btn");
    }

    return(

        <section className="add-product-section">
            
            <div className="add-product-buttons">
                <button onClick={e => toggleForm(e)}className="add-product-btn">
                    Add Product
                </button>

                <button onClick={e => toggleForm(e)}className="close-add-product-btn">
                    Close
                </button>
            </div>

            <Form products={products} setProducts={setProducts}/>
        </section>

    )
}

const Form = ({products, setProducts}) => {
  
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [whatsappLink, setWhatsappLink] = useState("");
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false, 
        message: "Saving Product", 
        color: ""
    });
    let file;


    const submitProduct = (e) => {
        
        e.preventDefault();
        setStatusMessageOpts({...statusMessageOpts, show: true})
        const token = JSON.parse(localStorage.getItem("token"));
        

        const form = new FormData();
        form.append('image', file);
        form.append('productName', productName);
        form.append('productPrice', productPrice);
        form.append('productDesc', productDesc);
        form.append('whatsappLink', whatsappLink);


        const resetFields = () => {
            setProductDesc("");
            setProductPrice("");
            setProductName("");
        }
        
        
        fetch(`${backendUrl}/api/products/create-product`,{
            method: "POST",
            headers: {
                "Authorization": token
            },
            body: form
        })
        .then(res => res.json())
        .then(result => {
            
            handleResponse(
                result.message,
                result.product ? (products.length > 0 ? [...products, result.product] : [result.product] )
                : null,
                statusMessageOpts,
                setStatusMessageOpts,
                setProducts
            );
            resetFields();
        })
        .catch((err) => {
            console.log(err)
            handleResponse(
                "err",
                null,
                statusMessageOpts,
                setStatusMessageOpts,
                null
            )
            resetFields();
        })
        

    }


    return (

        
        <form className='add-product-form'>
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message}/>}<br/>
            <div className="product-name-input-container">
                <input value={productName}  onChange={e => setProductName(e.target.value)}type="text" placeholder='Enter product name'/>
            </div>

            <div className="product-owner-whatsapplink-input-container">
                <input value={whatsappLink}  onChange={e => setWhatsappLink(e.target.value)}type="text" placeholder='Enter whatsapp link'/>
            </div>

            <div className="product-price-input-container">
                <input value={productPrice} onChange={e => setProductPrice(e.target.value)} type="number" placeholder='Enter the price'/>
            </div>

            <div className="product-description">
                <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder='Enter description'></textarea>
            </div>

            <input type="file" className='file' onChange={e => file = e.target.files[0]}/>

            <button type='submit' onClick={e => submitProduct(e)} className="submit-product">
                Submit
            </button>
        </form>

    )
}

const AvailableProducts = ({statusMessageOpts, setStatusMessageOpts, setProducts, products}) => {
    
    return (
        <>
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message}/>}<br/>
            
            <section className="available-products">
            
                {   products.length > 0 &&

                    products.map(product => {

                        return(
                           <Article key={product._id} id={product._id}  productName={product.name} price={product.price} desc={product.desc} products={products} setProducts={setProducts} setStatusMessageOpts={setStatusMessageOpts} image={product.image}/>
                        )
                    })
                }
        
            </section>
        </>
    )
}

const Article = ({id, productName, price, desc, products, setProducts, setStatusMessageOpts, image}) => {

    const [showUpdateForm, setShowUpdateForm] = useState(false);

    return(
        <article key={id} className="product">

        {showUpdateForm ? <UpdateProduct setShowUpdateForm={setShowUpdateForm} id={id} productName={productName} price={price} desc={desc}/> :

        <ProductDetails id={id}  desc={desc} setShowOrderForm={null} productName={productName} price={price} image={image} component={"admin"} setShowUpdateForm={setShowUpdateForm} products={products} setProducts={setProducts} setStatusMessageOpts={setStatusMessageOpts}/>}

    </article>
    )
}
