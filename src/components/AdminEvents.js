import React, { useEffect, useState } from 'react'
import './../css/AdminEvents.css'
import { backendUrl } from '../js/data';
import { handleResponse } from '../js/handleResponses';
import AdminHeader from './AdminHeader'
import { SearchBar } from './SearchBar'
import { Event } from './ServiceAndAccomodation';
import { ResponseMessage } from './Products';

const AdminEvents = () => {

    const [events, setEvents] = useState([]);
   
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Fetching the events",
        color: ""
    })

    useEffect(()=>{

        fetch(`${backendUrl}/api/events/get-all-events`)
        .then(res => res.json())
        .then(result => {
            
            handleResponse(
                result.message,
                result.events,
                statusMessageOpts,
                setStatusMessageOpts,
                setEvents
            )
        })
        .catch(() => {
            handleResponse(
                "err",
                null,
                statusMessageOpts,
                setStatusMessageOpts,
                setEvents
            )
        })
    },[])


  return (
    
    <>
        
        <AdminHeader/>
        <AddEventSection events={events} setEvents={setEvents}/>
        <SearchBar placeholderText={"Search For Event"}/>
        <AvailableEvents events={events} statusMessageOpts={statusMessageOpts} setEvents={setEvents}/>
    </>
  )
}


const AvailableEvents = ({events, statusMessageOpts, setEvents}) => {

    

    return (

        <section className="available-events">
            
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}

            {
                events.length > 0 &&
                
                events.map(event => {

                    return <Event key={event._id} id={event._id} title = {event.title}  date = {event.date} imagePath={event.imagePath} component={"admin"} events={events} setEvents={setEvents}/>
                })
            }
        </section>
    )
}

const AddEventSection = ({events, setEvents}) => {

    const [buttonText, setButtonText] = useState("Add Event");
    const [showForm, setShowForm] = useState(false);

    const toggleAddForm = () => {

        setShowForm(!showForm);

        if(buttonText === "Add Event"){
            setButtonText("Close")
        }else {
            setButtonText("Add Event")
        }
    }
    return (

        <section className="add-event-section">

            <button onClick={toggleAddForm} className="add-close-event-form">
                {buttonText}
            </button>

            {showForm && <AddEventForm events={events} setEvents={setEvents}/>}
        
        </section>
    )
}

const AddEventForm = ({events, setEvents}) => {

    const [eventTitle, setEventTitle] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Submitting event",
        color: ""
    });
    let file;

    const submitEvent = (e) => {

        e.preventDefault();
        setStatusMessageOpts({
            ...statusMessageOpts,
            show: true
        });
        
        const token = JSON.parse(localStorage.getItem("token"));

        const form = new FormData();

        form.append('image', file);
        form.append('title', eventTitle);
        form.append('date', eventDate)

        fetch(`${backendUrl}/api/events/create-event`, {
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
                result.event ? (events.length > 0 ? [...events, result.event] : [result.event] )
                : null,
                statusMessageOpts,
                setStatusMessageOpts,
                setEvents
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
        <form className="add-event-form">

            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}
            <div className="event-name-input-container">
                <input value={eventTitle} onChange={e => setEventTitle(e.target.value)} type="text" placeholder='Enter the event title'/>
            </div>

            <div className="event-date-input-container">
                <input value={eventDate} onChange={e => setEventDate(e.target.value)} type="date" placeholder='Enter the event date'/>
            </div>

            <div className="event-image-input-container">
                <input type="file" onChange={e => file = e.target.files[0]}/>
            </div>

            <div className="event-submit-btn-container">
                <button onClick={e => submitEvent(e)} className="submit-event-btn">
                    Submit
                </button>
            </div>
    </form>
    )
}

export default AdminEvents