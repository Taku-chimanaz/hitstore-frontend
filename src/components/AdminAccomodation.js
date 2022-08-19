import {useState, useEffect} from 'react'
import { backendUrl } from '../js/data';
import './../css/AdminAccomodation.css';
import AdminHeader from './AdminHeader';
import { SearchBar } from './SearchBar';
import {ResponseMessage} from './Products';
import { handleResponse } from '../js/handleResponses';
import { Accomodation } from './ServiceAndAccomodation';

export const AdminAccomodation = () => {

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
            
            console.log(accomodations)
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

  return (
    <>
        <AdminHeader/>
        <AddAccomodationSection accomodations={accomodations} setAccomodations={setAccomodations}/>
        <SearchBar placeholderText={"Search For Accomodation"}/>
        <AvailableAccomodations accomodations={accomodations} statusMessageOpts={statusMessageOpts}/>
        
    </>
  )
}

const AddAccomodationSection = ({accomodations, setAccomodations}) => {

    const [showForm, setShowForm] = useState(false);
    const [buttonText, setButtonText] = useState("Add Accomodation");


    const toggleForm = () => {

        setShowForm(!showForm);

        if(buttonText === "Add Accomodation"){
            setButtonText("Close")
        }else {
            setButtonText("Add Accomodation");
        }
    }

    return(

        <section className="add-accomodation">

            <div className="add-accomodation__btn-container">
                <button onClick={toggleForm} className='add-accomodation-btn'>
                    {buttonText}
                </button>
            </div>

            {showForm && <Form accomodations={accomodations} setAccomodations={setAccomodations}/>}
        </section>
    )
}

const Form = ({accomodations, setAccomodations}) => {

    const [address, setAddress] = useState("");
    const [conditions, setConditions] = useState("");
    const [available, setAvailable] = useState("")
    let file;
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Submitting Accomodation",
        color: ""
    });


    const resetFields = () => {
        setAddress("");
        setConditions("");
        setAvailable("");
        file = undefined
    }

    const submitAccomodation = (e) => {

        e.preventDefault();
        setStatusMessageOpts({...statusMessageOpts, show: true});

        if(address === "" ||
        conditions === "" || 
        available === "" ||
        file === undefined){
            
            setStatusMessageOpts({
                show: true,
                message: "All field are required",
                color: "error"
            });
            resetFields();
        }

        const token = JSON.parse(localStorage.getItem("token"));



        const form = new FormData();

        form.append('image', file);
        form.append('address', address);
        form.append('conditions', conditions);
        form.append('available', available)


        fetch(`${backendUrl}/api/accomodations/create-accomodation`, {
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
                result.accomodation ? (accomodations.length > 0 ? [...accomodations, result.accomodation] : [result.accomodation] )
                : null,
                statusMessageOpts,
                setStatusMessageOpts,
                setAccomodations

            )

            resetFields();

        })
        .catch((err) => {
            
            handleResponse(
                "err",
                null,
                statusMessageOpts,
                setStatusMessageOpts,
                null
            )

            resetFields()
        })


    }

    return (

        <form className="add-accomodation-form">

            <h3 className="add-accomodation__header">
                Add Accomodation
            </h3>

            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}

            <div className="address-input-container">
                <input type="text" placeholder='Enter the address' value={address} onChange={e => setAddress(e.target.value)}/>
            </div>

            <div className="conditions-input-container">
                <input type="text" placeholder='Price Condtion 2 Condition 3' value={conditions} onChange={e => setConditions(e.target.value)}/>
            </div>

            <div className="available-input-container">
               
               <select value={available} onChange={e => setAvailable(e.target.value)}>
                    <option value="default">Available?</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
               </select>
            </div>

            <div className="image-input-container">
                <input type="file" onChange={e => file = e.target.files[0]}/>
            </div>

            <div className="submit-accomodation-container">
                <button onClick={e => submitAccomodation(e)} className='submit-accomodation'>
                    Submit
                </button>
            </div>
        </form>
    )
}

const AvailableAccomodations = ({accomodations ,statusMessageOpts}) => {
    
    return (

        <section className="available-accomodations">
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}

            {
                accomodations.length > 0 &&

                accomodations.map(accomodation => {

                    return <Accomodation key={accomodation._id} accomodation={accomodation} component={"admin"}/>
                })
            }

        </section>
    )
}
