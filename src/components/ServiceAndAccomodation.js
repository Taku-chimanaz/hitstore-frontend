import React, { useState, useEffect} from 'react'
import Header from './Header';
import { Link } from 'react-router-dom';
import './../css/ServiceandAccomodation.css';
import img from "./../imgs/background.jpg";
import { backendUrl } from "../js/data";
import { handleResponse } from "./../js/handleResponses";
import {ResponseMessage} from './Products';
import { UpdateEvent, UpdateAccomodation } from './UpdateEventAccomodation';

function ServiceAndAccomodation() {

    useEffect(() => {
        document.title = "Hitstore  | Services"
    })
  return (
    
    <>
        <Header active={"services"}/>
        <AccomodationsSection/>
        <EventsSection/>
    </>
  )
}


const AccomodationsSection = () => {

    const [buttonText, setText] = useState("view all")
    const [accomodations, setAccomodations] = useState([]);
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: true,
        message: "Fetching Accomodations",
        color: ""
    })

    useEffect(() => {

        fetch(`${backendUrl}/api/accomodations/get-all-accomodations`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(result => {
            
            handleResponse(
                result.message,
                result.accomodations,
                statusMessageOpts,
                setStatusMessageOpts,
                setAccomodations
            )
        })
        .catch(err => {
            handleResponse(
                "err",
                null,
                statusMessageOpts,
                setStatusMessageOpts,
                setAccomodations
            )
        })
    },[])


    return(

        <section className="accomodations-section">

            <h3 className="accomodations-container__header">
                accomodations
            </h3>
            
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message}/>}
            <section className={`accomodations-container ${accomodations.length === 0 && "empty-container"}`}>
                   {
                      accomodations.length > 0 &&

                      accomodations.map(accomodation => {

                        return (

                            <Accomodation key={accomodation._id} accomodation={accomodation}/>
                        )
                      })
                      
                   }
            </section>

            <div className={`buttons-container ${accomodations.length === 0  && "no-buttons"}`}>
                <button onClick={(e) => viewAllItem(e, setText, buttonText)}className='view-all-btn'>
                    {buttonText}
                </button>
            </div>

        </section>
    )
}


export  const Accomodation = ({accomodation, component}) => {


    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Deleting accomodation",
        color: ""
    })


    const deleteAccomodation = () => {

        setStatusMessageOpts({...statusMessageOpts, show: true});

        const token = JSON.parse(localStorage.getItem("token"));

        fetch(`${backendUrl}/api/accomodations/delete-accomodation/${accomodation._id}`, {
            method: "DELETE",
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

        <article className='accomodation'>

            {showUpdateForm && <UpdateAccomodation id={accomodation._id} address={accomodation.address} conditions={accomodation.conditions} available={accomodation.available} setShowUpdateForm={setShowUpdateForm}/>}
            
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}

            
            <div className="room-img-container">
                <img src={`${backendUrl}/general/get-image/${accomodation.imagePath}`} alt="" />
            </div>

            <div className="room-details">
                <p className='address'>{accomodation.address}</p>

               {    <ul>

                            {
                                accomodation.conditions.map((condition,index) => {

                                    return(
                                        <li>{index === 0 ? `$${condition}`: condition} </ li>
                                    )
                                })
                            }
                    </ul>
                }

                <div className="availability">
                    
                    <div className={`dot ${accomodation.available ? "green-circle": "red-circle"}`}></div>
                    <p>{accomodation.available ? "Available" : "Full"}</p>
                </div>
                

                {
                    component  === "admin" && 

                    <div className="delete-update-btns">

                        <button onClick={deleteAccomodation} className="delete">
                            Delete
                        </button>
                        <button onClick={() => setShowUpdateForm(!showUpdateForm)} className="update">Update</button>
                    </div>
                }
            </div>
        </article>
    )
}


const EventsSection = () => {

    const [buttonText, setText] = useState("view all");

    const [events, setEvents] = useState([]);
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: true,
        message: "Fetching Events",
        color: ""
    })

    useEffect(() => {

        fetch(`${backendUrl}/api/events/get-all-events`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            handleResponse(
                result.message,
                result.events,
                statusMessageOpts,
                setStatusMessageOpts,
                setEvents
            )
        })
        .catch(err => {
            handleResponse(
                "err",
                null,
                statusMessageOpts,
                setStatusMessageOpts,
                setEvents
            )
        })
    },[]);

    return (

        <section className="events-section">

            <h3 className="events-container__header">
                events
            </h3>

            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message}/>}

            <section className={`events-container ${events.length === 0 && "empty-container"}`}>

                {
                    events.length > 0 &&

                    events.map(event => {

                        return(
                            <Event key={event._id}  title={event.title} date={event.date} imagePath={event.imagePath}/>
                        )
                    })
                }

            </section>

            <div className={`events-buttons-container`}>
                <a href="https://wa.me/message/RIOHYZJ7MRLBE1" target={"_blank"} className='book-event-btn'>
                    Book An Event
                </a>
                <button onClick={e => viewAllItem(e, setText, buttonText)}className='events-view-all-btn'>
                    {buttonText}
                </button>
           </div>

        </section>
    )
}


export const Event = ({id, title, date, imagePath, component, events, setEvents}) => {

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Deleting Event",
        color: ""
    });

    const deleteEvent = () => {

        const token = JSON.parse(localStorage.getItem("token"));

        fetch(`${backendUrl}/api/events/delete-event/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        .then(res => res.json())
        .then(result => {

            const remainingEvents  = result.message === "Event deleted successfully" && events.filter(event => event._id !== id);

            handleResponse(
                result.message,
                remainingEvents,
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

        <article className='event'>

            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}
            {showUpdateForm && <UpdateEvent id={id} title={title} date={date} setShowUpdateForm={setShowUpdateForm} update={"event"}/>}
            <div className="event-img-container">
                <img src={`${backendUrl}/general/get-image/${imagePath}`} alt="" />
            </div>

            <div className="event-details">
                <p className='event-status'>Upcoming</p>
                <p className='event-name'>{title}</p>
                <p className="event-date">{date}</p>
            </div>

           {
             component === "admin" && 

                <div className="delete-update-btns">

                    <button onClick={deleteEvent} className="delete">
                        Delete
                    </button>
                    <button onClick={() => setShowUpdateForm(!showUpdateForm)} className="update">Update</button>
                </div>
           }
        </article>
    )
}



// view all function

const viewAllItem = (e, setText, buttonText) => {

    const targetedBtn = e.target.className;
    const container = document.querySelector(".accomodations-container");
    const accomodation = document.querySelectorAll(".accomodation");
    const eventsContainer = document.querySelector(".events-container");
    const events = document.querySelectorAll(".event");

    if(targetedBtn === "view-all-btn"){

        container.classList.toggle("view-all-items");
        accomodation.forEach(accomo => accomo.classList.toggle("view-all-mode"));

    }else if(targetedBtn === "events-view-all-btn"){
        eventsContainer.classList.toggle("view-all-items");
        events.forEach(event => event.classList.toggle("view-all-mode"))
    }
    
    if(buttonText === "view all"){
        setText("collapse")
    }else{
        setText("view all")
    }
}

export default ServiceAndAccomodation