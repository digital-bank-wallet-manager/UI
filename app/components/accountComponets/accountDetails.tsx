import React from "react";
import { AccountInterface } from "@/app/interface/account/accountInterface";

export interface AccountDetailsProps {
    account: AccountInterface;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
    return (
        <div>
            <h1 className="text-2xl">Account Details</h1>
            <p>First Name: {account.firstName}</p>
            <p>Last Name: {account.lastName}</p>
            <p>Birthdate: {account.birthdate}</p>
            <p>Loan Authorization: {account.loanAuthorization ? 'Yes' : 'No'}</p>
            <p>Monthly Pay: {account.monthlyPay} MGA</p>
            <p>Account Reference: {account.accountRef}</p>
        </div>
    );
};

export default AccountDetails;
