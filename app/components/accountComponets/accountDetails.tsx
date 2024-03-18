import React from "react";
import { AccountInterface } from "@/app/interface/account/accountInterface";

export interface AccountDetailsProps {
    account: AccountInterface;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
    return (
        <div className="flex flex-col gap-10 bg-white rounded-xl py-10" style={{width:'60vw'}}>
            <h1 className="text-2xl border-solid border-black border-b-2 w-full pl-5 ">Account Details</h1>
            <div className=" flex flex-col gap-2 text-lg px-10"> 
                <p>First Name: {account.firstName}</p>
                <p>Last Name: {account.lastName}</p>
                <p>Birthdate: {account.birthdate}</p>
                <p>Monthly Pay: {account.monthlyPay} MGA</p>
                <p>Account Reference: {account.accountRef}</p>
            </div>
        </div>
    );
};

export default AccountDetails;
