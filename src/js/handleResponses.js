

export const handleResponse = (message, data, statusMessageOpts,setStatusMessageOpts, setData) => {

    switch(message){

        case "products fetched successfully":
            if(data.length === 0){

                setStatusMessageOpts({
                    show: true, 
                    message: "No products available", 
                    color:""
                });

                break;
            }
            setStatusMessageOpts({...statusMessageOpts, show: false})
            setData([...data]);
            break;

        case "Orders fetched successfully":
            if(data.length === 0){
                setStatusMessageOpts({
                    show: true, 
                    message: "No orders available", 
                    color:""
                });

                break;
            }
            setStatusMessageOpts({...statusMessageOpts, show: false})
            setData([...data]);
            break;
            
        case "Comments fetched successfully":
            if(data.length === 0){

                setStatusMessageOpts({
                    show: true, 
                    message: "No comments available", 
                    color:""
                });

                break;
            }
            setStatusMessageOpts({...statusMessageOpts, show: false})
            setData([...data]);
            break;
        
        case "Product saved successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            })
            setData(data);
            break;
        
        case "Gossip updated Successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            })
            break;
        
        case "Message sent":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            })
            break;
            
        case "Order canceled successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            });
            setData("canceled");
            break;
        
        case "Order marked delivered successfully":
            setStatusMessageOpts({
                show: true,
                message: "Order delivered",
                color: "success"
            });
            setData("Delivered");
            break;
        
        case "Update was successful":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            });
            break;

        case "Accomodation added successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            })
            setData(data)
            break;
        
        case "Event updated successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            });
            break;
            
        case  "Comment posted successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            })
            setData(data)
            break;

        case "Event added successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            })
            setData(data);
            break;
            
        case "Gossip saved successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            })
            setData(data)
            break;

        case  "Product updated successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            })
            break;
        
        case "Product was deleted successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            });
            setData(data)
            break;

        case "Accomodation deleted successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            });
            break;
        
        case "Event deleted successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            });
            setData(data);
            break
        
        case "Gossip deleted successfully":
            setStatusMessageOpts({
                show: true,
                message,
                color: "success"
            });
            setData(data)
             break;

        case "Could not upload images":
            setStatusMessageOpts({
                show: true,
                message,
                color: "error"
            });
            break;
        
        case "Something went wrong":

            setStatusMessageOpts({
                show: true,
                message: "Something went wrong,try again later", 
                color: "error"
            });

            break;
        
        case "Order was created Successfully":
            setStatusMessageOpts({
                show: true,
                message: "Order was place successfully,will be in touch soon.",
                color: "success"
            });
            break;

        case "err":
            setStatusMessageOpts({
                show: true, 
                message: "An error occured", 
                color: "error"
            });

            setTimeout(() =>{
                setStatusMessageOpts({
                    show: false,
                    message: "",
                    color: ""
                })
            },2000)
            break;
        
        // handling  gossips errors

        case "Gossips fetched successfully":
            if(data.length === 0){
                setStatusMessageOpts({
                    show: true,
                    message: "No Gossips Available",
                    color:  ""
                });
                break
            }
            setStatusMessageOpts({...setStatusMessageOpts, show: false});
            setData([...data]);
            break;

        case "Accomodations fetched successfully":
            if(data.length === 0){
                setStatusMessageOpts({
                    show: true,
                    message: "No accomodations available",
                    color: ""
                })
                break;
            }
            setStatusMessageOpts({...setStatusMessageOpts, show: false});
            setData([...data])
            break

        case "Events fetched successfully":
            if(data.length === 0){
                setStatusMessageOpts({
                    show: true,
                    message: "No events available",
                    color: ""
                })
                break;
            }
            setStatusMessageOpts({...setStatusMessageOpts, show: false});
            setData([...data])
            break
        
        case "User does not exist":
            setStatusMessageOpts({
                show: true,
                message,
                color: "error"
            })
            break;
        
        case "Wrong password":
            setStatusMessageOpts({
                show: true,
                message,
                color: "error"
            })
            break;
        case "You are not authorised":
            setStatusMessageOpts({
                show: true,
                message: message + ".Try to login again",
                color: "error"
            })
            break;
        default:
            setStatusMessageOpts({show: true, message:"Something went wrong,try again later", color: "error"});
            break;
    }
}