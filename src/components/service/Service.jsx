import React from 'react'
import './Service.css'
import arrow_icon from '../../assets/arrow_icon.png'
import theme_patttern from '../../assets/theme-patten.png'
import { services } from '../../assets/data/services.json'

/**
 * @summary Service component
 * @description This component renders the services offered by the user.
 * It displays the services in a grid format with a title, description, 
 * and a link to read more.
 * 
 * Provide a picture for each service as a preview of the service.
 * Update the services.json file to include the picture.
 * @returns {JSX.Element}
 */

const Service = () => {
  return (
    <div>
        <div className="services">
            <div className="service-title">
                <h1>My Services</h1>
                <img src={theme_patttern} alt="" />
            </div>
            <div className="service-container">
                {services.map((service, index) => {
                    return (
                        <div key={index} className="services-format">
                            <h3>{service.id}</h3>
                            <h2>{service.name}</h2>
                            <h2>{service.price}</h2>
                            <p>{service.description}</p>
                            <div className="services-readmore">
                                <img src={arrow_icon} alt="arrow" />
                                <a href={service.link}>Read More</a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  )
}

export default Service
