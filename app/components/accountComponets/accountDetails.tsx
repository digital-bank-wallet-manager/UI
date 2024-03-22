import React from "react";
import { AccountInterface } from "@/app/interface/account/accountInterface";
import { IoChevronBackSharp } from "react-icons/io5";
import { BalanceInterface } from "@/app/interface/balance/balanceInterface";
import { useState } from "react";
import Provisioning from "../provisioning/provisioning";

export interface AccountDetailsProps {
    account: AccountInterface;
    balance: BalanceInterface;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account, balance }) => {
    const accountId = account.id
    const [showFormProvisioning, setShowFormProvisioning] = useState(false);

    const handleBackButton = () => {
        window.location.href='/account';
    }

    const handleFormProvisioning = () =>{
        setShowFormProvisioning(true);
    }

    const actualDate = new Date().toLocaleString();


    return (
        <div>
            {
                showFormProvisioning && (
                    <Provisioning formProvisioning={{ showFormProvisioning, setShowFormProvisioning }} account={account}></Provisioning>
                )
            }
            <div className="flex flex-col gap-10 bg-white rounded-xl py-10" style={{ width: '60vw' }}>
                <h1 className="text-2xl border-solid border-slat-200 border-b-8 w-full pl-5 ">Account Details</h1>
                <div className=" flex flex-col gap-2 text-lg px-10">
                    <p>First Name: {account.firstName}</p>
                    <p>Last Name: {account.lastName}</p>
                    <p>Date of birth: {account.birthdate}</p>
                    <p>Monthly Pay: {account.monthlyPay} MGA</p>
                    <p>Account Reference: {account.accountRef}</p>
                    <p>Actual Balance: {balance.amount} MGA  at {actualDate}</p>
                        <button type="button" onClick={handleFormProvisioning} className="border-solid border-red-600 bg-red-600 border-2 rounded py-2  hover:bg-red-700 hover:border-red-700  transition duration-200 text-white w-52 mt-3"> 
                            provide your balance
                        </button>
                    <button type="button" className="self-end text-xl text-black duration-75 hover:scale-110 flex flex-row items-center" onClick={handleBackButton}><IoChevronBackSharp /> Back</button>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
