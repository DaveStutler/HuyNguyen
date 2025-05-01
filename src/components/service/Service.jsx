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
        <div className="services">
            <div className="service-title">
                <h1>Our Projects & Services</h1>
                {/* You can include a header image if desired */}
                <img src= {theme_patttern} alt="Projects Preview" />
            </div>
            <div className="service-container">
                {services.map((services) => (
                    <div className="services-format" key={services.id}>
                        <img
                            src={services.image}
                            alt={services.name}
                            className="service-image"
                        />
                        <h2>{services.name}</h2>
                        <p>{services.description}</p>
                        <p><strong>Status:</strong> {services.status}</p>
                        <div className="services-readmore">
                            <img
                                src={arrow_icon}
                                alt="arrow"
                                className="arrow-icon"
                            />
                            <a
                                href={services.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                See More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Service
