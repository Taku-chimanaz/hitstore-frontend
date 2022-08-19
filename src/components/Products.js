import Header from "./Header";
import './../css/Products.css';
import { useEffect, useState } from "react";
import { backendUrl } from "../js/data";
import ProductDetails from "./ProductDetails";
import { SearchBar } from "./SearchBar";
import { handleResponse } from "../js/handleResponses";


const Products = () => {


    const [products, setProducts] = useState([]);
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: true,
        message: "Fetching Products",
        color: ""
    });
    const [showAllProducts, setShowAllProducts] = useState(true);
    

    useEffect(()=>{
    
        
        document.title = "Hitstore  | Products"
        

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
            handleResponse(
                "err", null, 
                statusMessageOpts, 
                setStatusMessageOpts, 
                setProducts
            );
        })
       
    },[])


    return (
        <>
            <Header  active={"products"}/>
            <SearchBar placeholderText={"Search for product or service"} data={products} showAllItems={showAllProducts} setShowAllItems={setShowAllProducts} category={"products"}/>
            {showAllProducts && <ProductContainer products={products} statusMessageOpts={statusMessageOpts}/>}
        </>
    )
}


const ProductContainer = ({products, statusMessageOpts}) => {
 
    // rendering products if available

    return (
        
        <section className="products">

           {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message}/>}

            <div className="products-container">
                 
               {  
                   products.length > 0 &&

                   products.map(product => {
                       return(

                           <Product 
                                key={product._id} 
                                productName={product.name} 
                                image={product.image} 
                                price={product.price}
                                desc={product.description}
                                whatsappLink={product.whatsappLink}
                            />
                       )
                   })
               }
            </div>

        </section>
    )
}


export const Product = ({productName, price, desc, image, whatsappLink}) => {

    // rendering the product or order form based on above state value
    // the order form and products details are all in one container

    return (
        <article className="product">

               <ProductDetails 
                    desc={desc} 
                    image={image}
                    productName={productName} 
                    price={price}
                    whatsappLink={whatsappLink}
                />

        </article>
    )
}

export const ResponseMessage  = ({message, color}) => {

    return (
        <p className={`statusMessage ${color}`}>{message}</p>
    )
}



export default Products;