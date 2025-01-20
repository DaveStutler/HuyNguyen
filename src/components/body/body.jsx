import React from 'react'
import './body.css'
import theme_patttern from '../../assets/theme-patten.png'
import profile_pic from '../../assets/profile.png'


const body = () => {
  return (
    <div className='about'>
      <div className="about-title">
        <h1>About Me</h1>
        <img src={theme_patttern} alt="" />
      </div>
      <div className="about-sections">
        <div className="about-left">
          <img src={profile_pic} alt="" />
        </div>
        <div className="about-right">
          <div className="about-para">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ac ante mollis, fermentum felis nec, tincidunt purus. Donec
            </p>
          </div>
          <div className="about-skills">
            <div className="about-skill"><p>HTML & CSS</p><hr style={{width:"50%"}}/></div>
            <div className="about-skill"><p>React JS</p><hr style={{width:"70%"}}/></div>
            <div className="about-skill"><p>Python</p><hr style={{width:"60%"}}/></div>
            <div className="about-skill"><p>C & C++</p><hr style={{width:"50%"}}/></div>
          </div>
        </div>
      </div>
      <div className="about-achievements">
        <div className="about-achievement">
          <h1>10+</h1>
          <p>YEARS OF EXPERIENCE</p>
        </div>
        <hr />
        <div className="about-achievement">
          <h1>10+</h1>
          <p>PROJECTS COMPLETED</p>
        </div>
        <hr />
        <div className="about-achievement">
          <h1>15+</h1>
          <p>CLIENTS</p>
        </div>
      </div>
    </div>
  )
}

export default body
