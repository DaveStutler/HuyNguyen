import React, { useState } from 'react'
import { Icon, Github, SmilePlus, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom'

/**
 * 
 * @require update the icons, emails
 */

const email = "huy38456@gmail.com";


const handleCopyEmail = () => {
  navigator.clipboard.writeText(email);
  setTooltipText("Copied!");

  setTimeout(() => {
    setTooltipText("Gmail");
  }, 2000); // Reset tooltip after 2 seconds
};

const Footer = () => {
  const [tooltipText, setTooltipText] = useState("Gmail, Copy Me");
  const [appText, setAppText] = useState("");

  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <aside>
        <SmilePlus
          width="50"
          height="50"
          viewBox='0 0 24 24' />
        <p>
          Huy Nguyen
          <br />
          Idling since 2002
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <div className="relative group cursor-pointer">
            <Link to="https://github.com/DaveStutler">
              <Github className="hover:text-primary transition" />
            </Link>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              GitHub
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <Link to="https://www.linkedin.com/in/huynguyen2002/">
              <Linkedin className="hover:text-primary transition" />
            </Link>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              LinkedIn
            </div>
          </div>
          <div className='relative group cursor-pointer' onClick={handleCopyEmail}>
            <Mail className='hover:text-primary transition' />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {tooltipText}
            </div>
          </div>
        </div>
      </nav>
    </footer>
  )
}

export default Footer;
