import { backendUrl } from "../js/data";
import { handleResponse } from "../js/handleResponses";

const ProductDetails = ({id, desc, productName, price, image, whatsappLink, component, setShowUpdateForm, products, setProducts, setStatusMessageOpts}) => {

    return(

        <>
             <div className="img-container">
                    <img src={`${backendUrl}/general/get-image/${image}`} alt="product image" />
                </div>

                <h2 className="product-header">
                    {productName}
                </h2>

                <h3 className="product-price">
                    ${price}
                </h3>

                <p className="product-desc">
                    {desc}
                </p>

                {
                    component === "admin" ?
                     
                    <UpdateDeleteBtnContainer 
                        id={id} 
                        setShowUpdateForm={setShowUpdateForm} 
                        products={products} 
                        setProducts={setProducts} 
                        setStatusMessageOpts={setStatusMessageOpts}
                    /> : 
                    
                    <OrderBtnContainer whatsappLink={whatsappLink}/>
                }
               

        </>
    )
}

const OrderBtnContainer = ({whatsappLink}) => {

    return(

        <div className="order-btn-container">
            <a href={whatsappLink} target={"_blank"} className="order-link">
                Order
            </a>
        </div>
    )
}

const UpdateDeleteBtnContainer = ({id, setShowUpdateForm, products, setProducts, setStatusMessageOpts}) => {
    console.log(products)
    const token = JSON.parse(localStorage.getItem("token"));

    const deleteProduct = () => {

        fetch(`${backendUrl}/api/products/delete-product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        .then(res => res.json())
        .then(result => {
            
            const newProducts = result.message === "Product was deleted successfully" && products.filter(product => product._id !== id);

            handleResponse(
                result.message,
                result.message === "Product was deleted successfully" ? newProducts : null,
                null,
                setStatusMessageOpts,
                setProducts
            )
        })
        .catch((err) => {
            console.log(err)
             handleResponse(
               "err",
                null,
                null,
                setStatusMessageOpts,
                null
             )
        })
    }
    return(

        <div className="update-delete-btn-container">
            <button onClick={() => setShowUpdateForm(true)} className="update-product-btn">
                Update
            </button>

            <button onClick={deleteProduct} className="delete-product-btn">
                Delete
            </button>
        </div>
    )
}

export default ProductDetails;