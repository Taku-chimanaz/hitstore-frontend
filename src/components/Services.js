import './../css/Services.css';
import { Link } from 'react-router-dom';

const Services = () => {

    const productsDesc = "Browse through all the available products and see what tinkles your fancy";
    const servicesDesc = "Click through to view all upcoming events and also take a look at available off campus accomodation";
    const phoshtoDesc = "Get to witness all the crazy stuff going on around the campus"

    return (

        <section className="services">

            <h2 className="services-header">
                our services
            </h2>

            <div className="services-container">
                
                <Service serviceName={"phoshto"} desc={phoshtoDesc} callToActionText={"chilla paposhto"} img={"phoshto.png"}/>
                <Service serviceName={"products"} desc={productsDesc} callToActionText={"hit the store"} img={"products.png"} extraMargin={"products-service"}/>
                <Service serviceName={"services"}callToActionText={"Explore More"} desc={servicesDesc} img={"contact.png"} extraMargin={'services-service'}/>
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