import React from "react";
import { AccountInterface } from "@/app/interface/account/accountInterface";
import { IoChevronBackSharp } from "react-icons/io5";

export interface AccountDetailsProps {
    account: AccountInterface;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
    const handleBackButton = () => {
        window.location.href='/account';
    }

    return (
        <div className="flex flex-col gap-10 bg-white rounded-xl py-10" style={{width:'60vw'}}>
            <h1 className="text-2xl border-solid border-slat-200 border-b-8 w-full pl-5 ">Account Details</h1>
            <div className=" flex flex-col gap-2 text-lg px-10"> 
                <p>First Name: {account.firstName}</p>
                <p>Last Name: {account.lastName}</p>
                <p>Date of birth: {account.birthdate}</p>
                <p>Monthly Pay: {account.monthlyPay} MGA</p>
                <p>Account Reference: {account.accountRef}</p>
                <button type="button" className="self-end text-xl text-black duration-75 hover:scale-110 flex flex-row items-center" onClick={handleBackButton}><IoChevronBackSharp /> Back</button>
            </div>
        </div>
    );
};

export default AccountDetails;
