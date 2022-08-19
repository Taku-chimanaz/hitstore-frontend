import {useState} from 'react'
import './../css/UpdateEventAccomodation.css';
import { handleResponse } from '../js/handleResponses';
import { backendUrl } from '../js/data';
import { ResponseMessage } from './Products';

export const UpdateEvent = ({id, title, date, setShowUpdateForm}) => {

    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Deleting Event",
        color: ""
    });

    const [titleUpdate, setTitleUpdate] = useState(title);
    const [dateUpdate, setDateUpdate] = useState(date);
    let file;


    const submitUpdateDetails = (e) => {

        e.preventDefault();

        const token = JSON.parse(localStorage.getItem("token"));

        const form = new FormData();
        form.append('id', id);
        titleUpdate !== title && titleUpdate !== "" && form.append('title', titleUpdate);
        dateUpdate !== date && dateUpdate !== "" && form.append('date', dateUpdate);
        form.append('image', file)

        fetch(`${backendUrl}/api/events/update-event`, {
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
     <>
        <section className="event-update-overlay">
            
            <button onClick={() => setShowUpdateForm(false)} className="close-event-update-form">X</button>
            <form className="event-update-form">
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}
                <div className="event-update-title-container">
                    <input type="text" value={titleUpdate} onChange={e => setTitleUpdate(e.target.value)}/>
                </div>

                <div className="event-update-date-container">
                    <input type="date" value={dateUpdate} onChange={e => setDateUpdate(e.target.value)}/>
                </div>

                <div className="event-update-image-container">
                    <input type="file" onChange={e => file = e.target.files[0]}/>
                </div>

                <div className="submit-event-update-container">
                    <button onClick={e => submitUpdateDetails(e)} className="submit-event-update-btn">
                        Submit
                    </button>
                </div>

            </form>
        </section>
     </>
  )
}

export const UpdateAccomodation = ({id, address, conditions, available, setShowUpdateForm}) => {
    
    const [updateAddress, setAddress] = useState(address)
    const [updateConditions, setUpdateConditions] = useState(conditions);
    const [updateAvailable, setAvailable] = useState(available);
    let file;

    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Deleting Event",
        color: ""
    });
    
    // update accomodation function

    const submitUpdateDetails = (e) => {

        e.preventDefault();

        const token = JSON.parse(localStorage.getItem("token"));

        const form = new FormData();

        // appending changed data only

        form.append("id", id);
        updateAddress !== address && updateAddress !== "" && form.append("address", updateAddress);
        updateConditions !== conditions &&  updateConditions !== "" && form.append("conditions", updateConditions);
        updateAvailable !== available && updateAvailable !== "" && form.append("available", updateAddress);
        file !== undefined && form.append('image',  file)


        fetch(`${backendUrl}/api/accomodations/update-accomodation`, {
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

        <section className="accomodation-update-overlay">
            <form className="update-accomodation-form">

            
                    <button onClick={() => setShowUpdateForm(false)} className="close-accomodation-update-form">X</button>

                    <h3 className="update-accomodation__header">
                        Update Accomodation
                    </h3>

                    {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}

                    <div className="update-address-input-container">
                        <input type="text" placeholder='Enter the address' value={updateAddress} onChange={e => setAddress(e.target.value)}/>
                    </div>

                    <div className="update-conditions-input-container">
                        <input type="text" placeholder='Price Condtion 2 Condition 3' value={updateConditions} onChange={e => setUpdateConditions(e.target.value)}/>
                    </div>

                    <div className="update-available-input-container">
                    
                    <select value={updateAvailable}  onChange={e => setAvailable(e.target.value)}>
                            <option value="default">Available?</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                    </select>
                    </div>

                    <div className="update-image-input-container">
                        <input type="file" onChange={e => file = e.target.files[0]}/>
                    </div>

                    <div className="update-submit-accomodation-container">
                        <button onClick={e => submitUpdateDetails(e)} className='update-submit-accomodation'>
                            Submit
                        </button>
                    </div>
            </form>
        </section>
    )
}
