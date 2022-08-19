import './../css/Services.css';
import { Link } from 'react-router-dom';

const Services = () => {

    const desc = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam totam ut tempora numquam, odit fugiat."

    return (

        <section className="services">

            <h2 className="services-header">
                our services
            </h2>

            <div className="services-container">
                
                <Service serviceName={"phoshto"} desc={desc} callToActionText={"chilla paposhto"} img={"phoshto.png"}/>
                <Service serviceName={"products"} desc={desc} callToActionText={"hit the store"} img={"products.png"} extraMargin={"products-service"}/>
                <Service serviceName={"services"}callToActionText={"Explore More"} desc={desc} img={"contact.png"} extraMargin={'services-service'}/>
                </div>

        </section>
    )
}

const Service = ({serviceName, desc, callToActionText,img,extraMargin}) => {

    return (
        <article className="service">

                <div className={`img-container ${extraMargin && extraMargin}`}>
                    <img src={img} alt="" />
                </div>

                <h3 className={`service-header`}>
                    {serviceName}
                </h3>

                <p className="service-desc">
                    {desc}
                </p>

                <div className="link-to-service-container">
                    <Link to={serviceName} className="link-to-service">{callToActionText}</Link>
                </div>
        </article>
    )
}

export default Services;