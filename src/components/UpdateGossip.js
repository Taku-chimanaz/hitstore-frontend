import './../css/UpdateGossip.css';
import AdminHeader from './AdminHeader';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { backendUrl } from '../js/data';
import { handleResponse } from '../js/handleResponses';
import { ResponseMessage } from './Products';


export const UpdateGossip = () => {


    const gossipDetails =  JSON.parse(useParams().gossip);

  return (
    <>
        <AdminHeader/>
        <GossipUpdateForm gossipDetails = {gossipDetails}/>
    </>
  )
}

const GossipUpdateForm = ({gossipDetails}) => {
    

    const [gossipUpdateName, setGossipUpdateName] = useState(gossipDetails.gossipName);
    const [gossipUpdateBody, setGossipUpdateBody] = useState(gossipDetails.gossipBody);
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Updating The Gossip",
        color: ""
    });
    let file;

    const submitUpdate = (e) => {

        e.preventDefault();

        const token = JSON.parse(localStorage.getItem("token"));

        const form = new FormData();

        form.append('image', file);
        gossipUpdateName !== gossipDetails.gossipName && gossipUpdateName !== "" && form.append("gossipName", gossipUpdateName);
        gossipUpdateBody !== gossipDetails.gossipBody && gossipUpdateBody !== "" && form.append("gossipBody", gossipUpdateBody);
        form.append('id', gossipDetails._id);


        fetch(`${backendUrl}/api/gossips/update-gossip`, {
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

        <section className="gossip-update-form-container">

            <form className='gossip-update-form'>
                
                {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}
                <br /><br />
                <div className="gossip-update-name">
                    <input type="text" value={gossipUpdateName} onChange={e => setGossipUpdateName(e.target.value)}/>
                </div>

                <div className="gossip-update-body">
                    <textarea value={gossipUpdateBody} onChange={e => setGossipUpdateBody(e.target.value)}></textarea>
                </div>

                <div className="image-input-container">
                    <input type="file" onChange={e => file = e.target.files[0]}/>
                </div>

                <div className="submit-gossip-update-container">
                    <button onClick={e => submitUpdate(e)} className="submit-gossip-update-btn">
                        Submit
                    </button>
                </div>
                
            </form>
        </section>
    )
}
