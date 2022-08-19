import { handleResponse } from "./handleResponses";
import { backendUrl } from "./data";

export const cancelOrder = (id, statusMessageOpts, setStatusMessageOpts, setOrderStatus) => {

    const token = JSON.parse(localStorage.getItem("token"))
    
    setStatusMessageOpts({
       show: true,
       message: "Cancelling Order",
       color: ""
    });

    fetch(`${backendUrl}/api/orders//cancel-order/${id}`, {
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