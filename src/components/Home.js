import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import Header from './Header';
import EventNotification from './EventNotification';
import Services from './Services';
import { ResponseMessage } from './Products';
import { backendUrl } from '../js/data';
import {Link} from 'react-router-dom'
import { handleResponse } from '../js/handleResponses';

const Home =  () =>{


    useEffect(() => {
        document.title = "Hitstore  | Home"
    })
  return (

     <>
        <Header active={"home"} home/>
        <Main/>
        <EventNotification/>
        <Services/>
        <Contact/>
        <Footer/>
     </>
    
  )
}


const Main = () => {

    return (

        <main>

            <div className="intro-header-container">
                <h1>
                    welcome to <span>hitstore</span>
                </h1>
            </div>

            <article className="intro-para-container">
                <p className="intro-para">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur tempore voluptatibus distinctio incidunt recusandae dignissimos optio pariatur amet architecto reprehenderit!
                </p>
            </article>

            <div className="store-link-container">
                <Link to="products" className="store-link">
                    hit the store
                </Link>
            </div>

        </main>
    )
}







const Contact = () => {

    const [senderEmail, setSenderEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Sending message",
        color: "",
    })

    const sendMessage = (e) => {

        e.preventDefault();
        
        setStatusMessageOpts({...statusMessageOpts, show: true})
        const messageDetails = {
            name,
            senderEmail,
            message
        }

        fetch(`${backendUrl}/general/contact-us`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageDetails)
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

        <article id="contact" className="contact-form-container">

            <h2 className="contact-form-container__header">
                contact us
            </h2>

           <section className="contact-section">
                
                <form>
                        {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}<br/>
                        <div className="name-input-container">
                            <label htmlFor="name"></label>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder='Enter your name'/>
                        </div>

                        <div className="email-input-container">
                            <label htmlFor="name"></label>
                            <input value={senderEmail} onChange={e => setSenderEmail(e.target.value)} type="email" placeholder='Enter your email'/>
                        </div>

                        <div className="message-input-container">
                            <label htmlFor="name"></label>
                            <textarea value={message} onChange={e => setMessage(e.target.value)} name="" id="" placeholder='Enter your message here...'></textarea>
                        </div>

                        <div className="submit-btn-container">
                            <button onClick={e => sendMessage(e)} className="submit-btn">Submit</button>
                        </div>
                </form>

                <div className="contact-img-container">
                    <img src="undraw_chatting_re_j55r.svg" alt="people chatting" />
                </div> 
           </section>
        </article>
    )
}

export const Footer = () => {

    return (

        <footer>
            <p>Hitstore &copy; 2022 | All rights reserved <br/>Powered by Code Upgrade Techonologies</p>
        </footer>
    )
}

export default Home