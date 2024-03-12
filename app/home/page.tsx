"use client"
import Link from "next/link";
import Header from "../components/header";
import { FaPlus } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import { useState } from "react";
import AddAccountForm from "../components/addaccountform";
import logo1 from "../image/logo1-bank.gif";
import logo2 from "../image/logo2-bank.gif";
import logo3 from "../image/logo3-bank.gif";
import Image from "next/image";
export default function HomePage() {

    return (
        <div>
            <Header />
            <main>
                <div className="flex  items-center flex-row  gap-28 bg-slate-100 h-screen py-40">
                    <div className="bg-red-600 h-screen flex justify-center flex-col relative"  style={{ width: '65vw', boxShadow: '0px 0px 10px 0px black' }}>
                        <div className="flex flex-col gap-10  justify-center pl-32">
                            <p className="text-4xl text-white" style={{ width: '500px' }}>
                                Welcome to the future of banking,we offer personalized, secure, and efficient online banking services.
                            </p>
                            <button type="button" className="border-solid border-white border-2 rounded px-2 py-2 w-56 hover:bg-white  transition duration-200 flex flex-row items-center gap-2 text-xl text-white hover:text-black mr-64">
                                <FaPlus /> New account
                            </button>
                        </div>
                        <div className="flex flex-row gap-8 text-2xl text-white justify-end  absolute bottom-8 right-8">
                            <FaFacebook />
                            <RiInstagramFill />
                            <IoLogoWhatsapp />
                            <FaTelegram />
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl mr-2 border-b-2 border-red-700 pb-2">
                            What we manage?
                        </h1>
                        <div className="flex flex-col gap-20 items-center my-16">
                            <div className="flex flex-col gap-2  items-center ">
                                <p className="text-xl text-red-700">
                                    Wallet management
                                </p>
                                <Image src={logo1} alt="logo1" width={100} height={100} />
                            </div>
                            <div className="flex flex-row gap-32">
                                <div className="flex flex-col gap-5  items-center">
                                    <Image src={logo2} alt="logo2" width={100} height={100} />
                                    <p className="text-xl text-red-600">
                                        Statistics
                                    </p>
                                </div>
                                <div className="flex flex-col gap-5  items-center">
                                    <Image src={logo3} alt="logo3" width={125} height={100} />
                                    <p className="text-xl text-red-600">
                                        Transactions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}