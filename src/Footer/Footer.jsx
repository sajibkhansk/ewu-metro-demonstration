import React from 'react';
import dmtcl from '../../public/dmtcl-logo.png';
import fb from '../../public/fb.png';
import twitter from '../../public/twitter.png';
import youtube from '../../public/youtube.png';
import help from '../../public/help_1.jpg';
import gmail from '../../public/google.jpg';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
    const showToastMessage = () => {
        toast.success('Submitted!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const handleSignUp = event => {
        event.preventDefault();
        emailjs.sendForm('service_d6q1lyf', 'template_bgmqfwb', event.target, 'NFrzbzI_vzjzLamqX')
            .then(() => {
                
                toast.success('Email sent successfully'); // Show success toast
                event.target.reset(); // Clear form fields
                console.log("Send");
                
            })
            .catch(error => {
                console.error('Error sending email:', error);
                // Handle error if needed
            });
    };

    return (
        <div className="mt-5">
            <footer className="footer p-10 bg-neutral text-neutral-content">
                <div>
                    <img className='w-48' src={dmtcl} alt="DMTCL Logo" />
                    <p>Dhaka Mass Transit Company Limited (DMTCL)<br />Providing mass transit facility since 2013</p>
                    <p className='mt-8 text-bold'>Copyright DMTCL (2023), All rights received.</p>
                </div>
                <div className=''>
                    <div>
                        <span className="footer-title">Contact Us</span>
                        <div className='flex items-center mt-5'>
                            <img className='rounded-full h-10 w-10' src={help} alt="Help Icon" />
                            <p className='ml-3'>01234567</p>
                        </div>
                        <div className='flex items-center mt-5 mb-8'>
                            <img className='rounded-full h-10 w-10' src={gmail} alt="Gmail Icon" />
                            <p className='ml-3'>support@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <span className="footer-title">Follow Us</span>
                        <div className="flex space-x-8 mt-5">
                            <img src={fb} alt="Facebook Icon" height="40px" width="40px" />
                            <img src={twitter} alt="Twitter Icon" height="40px" width="40px" />
                            <img src={youtube} alt="YouTube Icon" height="40px" width="40px" />
                        </div>
                    </div>
                </div>
                <div>
                    <span className="footer-title">Report a problem</span>
                    <form onSubmit={handleSignUp}>
                        <label className="block mb-2 text-sm font-medium text-white  ">Your Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                            </div>
                            <input type="email" name="email_from" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 " placeholder="name@gmail.com" />
                        </div>

                        <label className="mt-2 mb-2 block text-sm font-medium text-white  ">Your message</label>
                        <textarea name="message" id="message" rows="3" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700    dark:placeholder-gray-400   dark:focus:ring-blue-500  dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>

                        <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3" />
                    </form>
                </div>
            </footer>
            <ToastContainer />
        </div>
    );
};

export default Footer;
