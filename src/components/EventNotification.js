import { useEffect, useState } from 'react'
import './../css/EventNotification.css';
import {backendUrl} from './../js/data';
import { timeCountDown } from '../js/timeCountDown';


const EventNotification = () => {

    const [upcomingEvent, setUpcommingEvent] = useState({});
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {

        fetch(`${backendUrl}/api/events/get-all-events`)
        .then(res => res.json())
        .then(result => {
            
            if(result.events){

                const todayDate = new Date().getTime();
                console.log(todayDate)
                result.events.forEach(event => {
                    
                    const eventDate = new Date(event.date).getTime();
                    console.log(eventDate)
                    if(eventDate > todayDate){
                        setUpcommingEvent(event)
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    },[])


    

    setInterval(() => {
        timeCountDown(upcomingEvent, setHours, setMinutes, setSeconds, setDays)
    }, 1000);


    return (

        <article className='event-notification'>

            <h3 className="event-notification__heading">
                what's coming up?
            </h3>

            <h2 className='event-name'>{upcomingEvent.title ? upcomingEvent.title : "Nothing To Be Excited"}</h2>

           <div className="countDown-section">
               <CountDown classForCountDown={"days"} number={days}/>
               <p className='dots'>:</p>
               <CountDown classForCountDown={"hrs"} number={hours}/>
               <p className='dots'>:</p>
               <CountDown classForCountDown={"mins"} number={minutes}/>
               <p className='dots'>:</p>
               <CountDown classForCountDown={"secs"} number={seconds}/>
           </div>

        </article>
    )
}

const CountDown = ({classForCountDown, number}) => {

    return (

        <div className={classForCountDown}>
        <p>{classForCountDown}</p>
        <div className="count">
            <p>{number < 10 ? `0${number}` : number}</p>
        </div>
    </div>
    )
}

export default EventNotification;