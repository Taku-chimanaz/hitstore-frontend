import React from 'react'
import {Link} from 'react-router-dom';
import '../css/Header.css';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
//import ForumIcon from '@mui/icons-material/Forum';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

const Header = ({active,home}) => {
    
  return (
    <>
        <header>

            <h3 className="logo">
                HITSTORE
            </h3>
            <TopNavbar active={active} home={home}></TopNavbar>
            <Burger active={active}/>
        </header>

        <SideNavbar active={active} home={home}/>
    </>
  )
}


const SideNavbar = ({active,home}) => {

    return(

        <div className="side-navbar-container">

            <nav >
                <Link className={`${active === "home" && "active"}`} to="/"><HomeIcon/>Home</Link>
                <Link className={`${active === "products" && "active"}`} to="/products"><StoreIcon/>Products</Link>
                <Link className={`${active === "phoshto" && "active"}`} to="/phoshto"><AutoStoriesIcon/>Phoshto</Link>
                <Link className={`${active === "services" && "active"}`} to="/services"><HomeRepairServiceIcon/>Services</Link>
            </nav>

           {
              home && 
              <section className="contact-link-container">
                <a href="#contact">Contact Us</a>
              </section>
           }
        </div>
    )
}

const TopNavbar = ({active,home}) => {


    return(
        <div className="top-navbar-container">

            <nav className={!home && 'spread-links'}>
                <Link className={`${active === "home" && "active"}`} to="/"><HomeIcon/>Home</Link>
                <Link className={`${active === "products" && "active"}`} to="/products"><StoreIcon/>Products</Link>
                <Link className={`${active === "phoshto" && "active"}`} to="/phoshto"><AutoStoriesIcon/>Phoshto</Link>
                <Link className={`${active === "services" && "active"}`} to="/services"><HomeRepairServiceIcon/>Services</Link>
            </nav>

            {
                home &&
                <section className="top-navbar-contact-link-container">
                    <a href="#contact">Contact Us</a>
                </section>
            }
        </div>
    )

}

const  Burger = () => {

    const showNavbarContainer = () => {

        const navbarContainer = document.querySelector(".side-navbar-container");
        const burger = document.querySelector(".burger");

        navbarContainer.classList.toggle("show-side-navbar-container");
        burger.classList.toggle("burger-activated");
        toggleBurgerDivs();
    }

    const toggleBurgerDivs = () => {

        const burgerDiv0 = document.querySelector(".burger-divs1");
        const burgerDiv1 = document.querySelector(".burger-divs2");
        const burgerDiv2 = document.querySelector(".burger-divs3");

        burgerDiv0.classList.toggle("hide-burger-divs");
        burgerDiv1.classList.toggle("hide-burger-divs");
        burgerDiv2.classList.toggle("hide-burger-divs");
    }

    return (

        <div className="burger" onClick={showNavbarContainer}>
            <div className='burger-divs1'></div>
            <div className='burger-divs2'></div>
            <div className='burger-divs3'></div>
        </div>
    )
}

export default Header