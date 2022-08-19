import { useEffect } from 'react'
import AdminHeader from './AdminHeader';
import './../css/AdminDashboard.css'
import {Link} from 'react-router-dom'
import products from "./../imgs/products.jpg";
import events from "./../imgs/events.jpg";
import gossips from "./../imgs/gossip.jpg";


const AdminDashboard = () => {

  useEffect(() => {

    const token = localStorage.getItem("token");

    if(!token){
      window.location = "/admins/login"
    }
  },[])
  return (
     
    <>
      <AdminHeader/>  
      <DashBoardElements/>
    </>
  )
}

const DashBoardElements = () => {

  return(

    <section className="dashboard-elements">
      <Element img={products} text={"products"} link={"/admins/products"}/>
      <Element img={events} text={"events"} link={"/admins/events"}/>
      <Element img={gossips} text={"gossips"} link={"/admins/gossips"}/>
      <Element img={gossips} text={"accomodations"} link={"/admins/accomodations"}/>
      <Element img={products} text={"orders"} link={"/admins/orders"}/>
      <Element img={products} text={"statistics"} link={"/admins/orders"}/>
    </section>
  )
  
}

const Element = ({img, text, link}) => {

  return(

    <div className="element">
      <img src={img} alt="products" />
      <div className="overlay"></div>
      <div className="link-container">
        <Link to={link}>{text}</Link>
      </div>
    </div>
  )
}

export default AdminDashboard