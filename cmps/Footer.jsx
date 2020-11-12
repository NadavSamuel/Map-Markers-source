import React from 'react'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CopyrightIcon from '@material-ui/icons/Copyright';
import GitHubIcon from '@material-ui/icons/GitHub';
import {LinkedinShareButton} from "react-share";
import { Link } from 'react-router-dom';


export function Footer() {


    return (


        <footer className='flex justify-between align-center '>
            <section className="footer-content-container flex full-width space-between">
            <div className="social-btns-container flex">
                  <a href={'https://github.com/NadavSamuel'} className="cursor-pointer"><span> <GitHubIcon /></span></a> 
                <LinkedinShareButton url='https://www.linkedin.com/in/nadav-samuel-0b51291b9/'>
                <span> <LinkedInIcon /></span>
                </LinkedinShareButton>
            </div>
            <p className='flex align-center'><CopyrightIcon /> <span> Nadav Samuel 2020 </span>  </p>
            </section>
        </footer>

    )
}