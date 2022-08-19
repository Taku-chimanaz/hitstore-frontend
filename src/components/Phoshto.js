import Header from "./Header";
import { SearchBar } from "./SearchBar";
import './../css/Phoshto.css';
import React, {useEffect, useState } from 'react'
import { backendUrl } from "../js/data";
import { handleResponse } from "../js/handleResponses";
import { ResponseMessage } from "./Products";
import { Link } from 'react-router-dom';


function Phoshto() {

    const [gossips, setGossips] = useState([]);
    const [showAllItems, setShowAllItems] = useState(true)
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: true, 
        message: "Fetching Gossips", 
        color: ""
    })

    useEffect(() => {

        document.title = "Hitstore  | Poshto"
        // fetching all gossips

        fetch(`${backendUrl}/api/gossips/get-all-gossips`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(result =>  {

            handleResponse(
                result.message,
                result.gossips,
                statusMessageOpts,
                setStatusMessageOpts,
                setGossips
            )
        })
        .catch(() => {
            handleResponse(
                "err",
                null,
                statusMessageOpts,
                setStatusMessageOpts,
                setGossips
            )
        })
    },[])

  return (
    <>
        <Header active={"phoshto"}/>
        <SearchBar placeholderText={"Search For A Gossip"} data={gossips} showAllItems={showAllItems} setShowAllItems={setShowAllItems} category={"gossips"}/>
        {showAllItems && <Gossips gossips={gossips} statusMessageOpts={statusMessageOpts}/>}
    </>
  )

}

const Gossips = ({gossips, statusMessageOpts}) => {

    
    
   
    
    return(

        <section className="gossips-container">
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message}/>}

            {   gossips.length > 0 &&

                gossips.map(gossip => {
                    
                    return(
                        <Gossip key={gossip._id} gossip={gossip}/>
                    )
                })
            }
        </section>
    )
}

export const Gossip = ({gossip,component, setAvailableGossips, availableGossips}) => {

    const data = JSON.stringify(gossip);
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Deleting Gossip",
        color: ""
    });
    
    const gossipParaArray = gossip.gossipBody.split(" ");
    let splitedGossipBody = "";

    gossipParaArray.forEach((word,index) => {

        if(index <= 20){
            splitedGossipBody += ` ${word}`
        }
    })

    return(

        <article className="gossip">
             {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}
            <div className="image-container">
                <img src={`${backendUrl}/general/get-image/${gossip.image}`} alt="article heading pic" />
            </div>

            <div className="article-content">

                <h4 className="article-heading">
                    {gossip.gossipName}
                </h4>

                <p className="article-para">
                    {splitedGossipBody}
                </p>

                {
                    component === "admin" ? <DeleteOrUpdateBtn data={data} availableGossips= {availableGossips} setAvailableGossips={setAvailableGossips} statusMessageOpts={statusMessageOpts} setStatusMessageOpts={setStatusMessageOpts}/>  :  <Link to={`/phoshto/${data}`} className="full-article-link">chilla pano</Link>
                }
            </div>

        </article>
    )
}

const DeleteOrUpdateBtn = ({data, availableGossips, setAvailableGossips, statusMessageOpts, setStatusMessageOpts}) => {

    const id = JSON.parse(data)._id
    const  token = JSON.parse(localStorage.getItem("token"));

    const deleteGossip = () => {

        setStatusMessageOpts({
            ...statusMessageOpts,
            show: true
        })

        fetch(`${backendUrl}/api/gossips/delete-gossip/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        })
        .then(res => res.json())
        .then(result => {

            const remainningGossips = result.message === "Gossip deleted successfully" && availableGossips.filter(gossip => gossip._id !== id);

            handleResponse(
                result.message,
                remainningGossips,
                statusMessageOpts,
                setStatusMessageOpts,
                setAvailableGossips

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

        <div className="gossip-delete-update-btns">

            <button onClick={deleteGossip} className="delete">
                Delete
            </button>

            <Link to={`/admins/gossips/update-gossip/${data}`} className="update">
                Update
            </Link>
        </div>
    )
}

export default Phoshto