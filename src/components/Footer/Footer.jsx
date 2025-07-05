import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { HiOutlineMail } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

function Footer() {
    return (
        <section className="overflow-hidden py-10 bg-teal-500">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="flex flex-wrap -mx-4">

                    {/* Logo and copyright */}
                    <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-0">
                        <div className="flex h-full flex-col justify-between">

                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>

                           <div className="hidden lg:block">
                                <p className="text-sm text-white">
                                    &copy; Copyright 2025. All Rights Reserved by DevUI.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Company */}
                    <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/6 px-4 mb-8 lg:mb-0">
                        <div className="h-full">

                            <h3 className="tracking-px mb-4 text-xs font-bold uppercase text-[#134e4a]">
                                Company
                            </h3>

                            <ul>
                                <li className="mb-2">
                                    <Link className="text-base font-medium text-white hover:text-[#e2c9a0]" to="/">Features</Link>
                                </li>

                                <li className="mb-2">
                                    <Link className="text-base font-medium text-white hover:text-[#e2c9a0]" to="/">Pricing</Link>
                                </li>

                                <li className="mb-2">
                                    <Link className="text-base font-medium text-white hover:text-[#e2c9a0]" to="/">Affiliate Program</Link>
                                </li>

                                <li>
                                    <Link className="text-base font-medium text-white hover:text-[#e2c9a0]" to="/">Press Kit</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/6 px-4 mb-8 lg:mb-0">
                        <div className="h-full">

                            <h3 className="tracking-px mb-4 text-xs font-bold uppercase text-[#134e4a]">
                                Support
                            </h3>

                            <ul>
                                <li className="mb-2">
                                    <Link className="text-base font-medium text-white hover:text-[#e2c9a0]" to="/">Account</Link>
                                </li>

                                <li className="mb-2">
                                    <Link className="text-base font-medium text-white hover:text-[#e2c9a0]" to="/">Help</Link>
                                </li>

                                <li className="mb-2">
                                    <Link className="text-base font-medium text-white hover:text-[#e2c9a0]" to="/">Contact Us</Link>
                                </li>

                                <li>
                                    <Link className="text-base font-medium text-white hover:text-[#e2c9a0]" to="/">Customer Support</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Legals */}
                    <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/6 px-4 mb-8 lg:mb-0">
                        <div className="h-full">

                            <h3 className="tracking-px mb-4 text-xs font-bold uppercase text-[#134e4a]">
                                Legals
                            </h3>

                            <ul>
                                <li className="mb-2">
                                    <Link className="text-base font-medium text-white hover:text-[#e2c9a0]" to="/">Terms &amp; Conditions</Link>
                                </li>

                                <li className="mb-2">
                                    <Link className="text-base font-medium text-white hover:text-[#e2c9a0]" to="/">Privacy Policy</Link>
                                </li>

                                <li>
                                    <Link className="text-base font-medium text-white hover:text-[#e2c9a0]" to="/">Licensing</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Contacts */}
                    <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/6 px-4">
                        <div className="h-full">

                            <h3 className="tracking-px mb-4 text-xs font-bold uppercase text-[#134e4a]">
                                Contacts
                            </h3>

                            <ul className="space-y-2">

                                <li className="flex items-center space-x-2">
                                    <HiOutlineMail className="text-white text-xl" />
                                    <a href="mailto:as5374329@gmail.com" className="text-base font-medium text-white hover:text-[#e2c9a0]">
                                        Gmail
                                    </a>
                                </li>

                                <li className="flex items-center space-x-2">
                                    <FaGithub className="text-white text-xl" />
                                    <a href="https://github.com/codeAryan21" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-white hover:text-[#e2c9a0]">
                                        GitHub
                                    </a>
                                </li>

                                <li className="flex items-center space-x-2">
                                    <FaLinkedin className="text-white text-xl" />
                                    <a href="https://linkedin.com/in/aryan-singh-3405a8351" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-white hover:text-[#e2c9a0]">
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full mt-6 block lg:hidden">
                        <p className="text-sm text-white text-center">
                            &copy; Copyright 2025. All Rights Reserved by DevUI.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Footer