import {useState, useEffect} from 'react';
import { backendUrl } from '../js/data';
import { handleResponse } from '../js/handleResponses';
import './../css/AdminGossip.css';
import AdminHeader from './AdminHeader';
import {SearchBar} from './SearchBar'
import { ResponseMessage } from './Products';
import { Gossip } from './Phoshto';

export const AdminGossips = () => {

    const [gossips, setUpdateGossip] = useState(false);
    const [availableGossips, setAvailableGossips] = useState([]);
    const [showAllItems, setShowAllItems] = useState(true)
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Fetching the gossips",
        color: ""
    })

    useEffect(() => {

        fetch(`${backendUrl}/api/gossips/get-all-gossips`, {method: "GET"})
        .then(res => res.json())
        .then(result => {
            
            handleResponse(
                result.message,
                result.gossips,
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

    },[])

  return (
    <> 
        <AdminHeader/>
        <AddGossipBtns/>
        <AddGossipSection availableGossips={availableGossips} setAvailableGossips={setAvailableGossips}/>
        <SearchBar placeholderText={"Search For Gossip"} data={availableGossips} showAllItems={showAllItems} setShowAllItems={setShowAllItems} category={"gossips"}/>
        {showAllItems &&  <AvailableGossips setUpdateGossip={setUpdateGossip} availableGossips={availableGossips} statusMessageOpts={statusMessageOpts} setAvailableGossips={setAvailableGossips}/>}
    </>
  )
}

const AvailableGossips = ({showUpdateGossip, availableGossips, statusMessageOpts, setAvailableGossips}) => {


    return(

        <section className="available-gossips">
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}<br></br>

            {
                availableGossips.length > 0 &&

                availableGossips.map(gossip => {

                    return <Gossip key={gossip._id} gossip={gossip} component={"admin"} availableGossips={availableGossips} setAvailableGossips={setAvailableGossips}/>
                })
            }
        </section>
    )
}

const AddGossipBtns = () => {


    const showForm = () => {

        const addGossipSection = document.querySelector(".add-gossip-section");
        const openBtn = document.querySelector(".open-add-gossip-form");
        const closeBtn = document.querySelector(".close-add-gossip-form");

        addGossipSection.classList.toggle("show-add-gossip-form");
        openBtn.classList.toggle("hide-add-add-gossip-form-btn");
        closeBtn.classList.toggle("show-close-add-gossip-form-btn");
    }


    return(
        <div className="add-gossip-btns">

            <button onClick={showForm} className="open-add-gossip-form">
                Add Gossip
            </button>

            <button onClick={showForm} className="close-add-gossip-form">
                Close
            </button>
        </div>

    )
}

const AddGossipSection = ({availableGossips, setAvailableGossips}) => {

    const [gossipName, setGossipName] = useState("");
    const [gossipBody, setGossipBody] = useState("");
    let file;
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Submiting Gossip",
        color: ""
    });


    const submitGossip = e => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("token"));

        const form = new FormData();

        form.append('image', file);
        form.append('gossipName', gossipName);
        form.append('gossipBody', gossipBody);


        fetch(`${backendUrl}/api/gossips/create-gossip`, {
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
                result.gossip ? (availableGossips.length > 0 ? [...availableGossips, result.gossip] : [result.gossip] )
                : null,
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

    return(

        <section className="add-gossip-section">
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message}/>}<br></br>
            <form  className="add-gossip-form">

                <div className="gossip-name-input-container">
                    <input value={gossipName} onChange={e => setGossipName(e.target.value)} type="text" placeholder='Enter name of gossip'/>
                </div>

                <div className="gossip-body-input-container">
                    <textarea value={gossipBody} onChange={e => setGossipBody(e.target.value)} placeholder='Enter the story here' className='gossip-body'></textarea>
                </div>

                <input type="file" value={file} onChange={e => file = e.target.files[0]} className="gossip-image" />

                <button onClick={submitGossip} className="submit-gossip">Submit</button>
            </form>
        </section>
    )
}
