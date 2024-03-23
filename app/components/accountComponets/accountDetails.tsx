import React from "react";
import { AccountInterface } from "@/app/interface/account/accountInterface";
import { IoChevronBackSharp } from "react-icons/io5";
import { BalanceInterface } from "@/app/interface/balance/balanceInterface";
import { useState } from "react";
import Provisioning from "../provisioning/provisioningForm";
import Header from "../navgiationComponents/header";
import AccountUpdateForm from "./accountUpdateform";
import BalanceHistoryForm from "../balance/balanceHistoryForm";

export interface AccountDetailsProps {
    account: AccountInterface;
    balance: BalanceInterface;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account, balance }) => {
    const [showFormProvisioning, setShowFormProvisioning] = useState(false);
    const [showFormAccountUpdate, setShowFormAccountUpdate] = useState(false);
    const [showFormBalanceHistory, setShowFormBalanceHsitory] = useState(false);
    const [detailsPage, setDetailsPage] = useState(true);
    const [balanceHistoryPage, setBalanceHistoryPage] = useState(false);



    const handleBackButton = () => {
        window.location.href = '/account';
    }

    const handleFormProvisioning = () => {
        setShowFormProvisioning(true);
    }

    const handleFormBalanceHistory = () => {
        setShowFormBalanceHsitory(true)
    }

    const handleFormAccountUpdate = () => {
        setShowFormAccountUpdate(true);
    }

    const handleDetailsPage = () => {
        setDetailsPage(true);
        setBalanceHistoryPage(false);
        setBalanceHistoryPage(false);
    }

    const handleBalanceHistoryPage = () => {
        setBalanceHistoryPage(true);
        setDetailsPage(false);
    }


    const actualDate = new Date().toLocaleString();

    const behindForm = showFormProvisioning ? 'opacity-50 z-30 pointer-events-none' : '';
    const behindFormAccountUpdate = showFormAccountUpdate ? 'opacity-50 z-30 pointer-events-none' : '';
    const behinFormBalanceHistory = showFormBalanceHistory ? 'opacity-50 z-30 pointer-events-none' : '';
    const details = detailsPage ? 'bg-red-800 text-white' : '';
    const balanceHistory = balanceHistoryPage ? 'bg-red-800 text-white' : '';

    return (
        <div>
            {
                showFormAccountUpdate && (
                    <AccountUpdateForm formAccountUpdate={{ showFormAccountUpdate, setShowFormAccountUpdate }} account={account}></AccountUpdateForm>
                )
            }
            {
                showFormProvisioning && (
                    <Provisioning formProvisioning={{ showFormProvisioning, setShowFormProvisioning }} account={account}></Provisioning>
                )
            }
            {
                showFormBalanceHistory && (
                    <BalanceHistoryForm formBalanceHistory={{ showFormBalanceHistory, setShowFormBalanceHsitory }}></BalanceHistoryForm>
                )
            }
            <main className={`${behindForm}${behindFormAccountUpdate}${behinFormBalanceHistory}`}>
                <Header />
                <div className={`flex flex-row pt-32 gap-24 bg-slate-200 h-screen pl-16 pr-16$`}>
                    <section>
                        <div className="flex flex-col rounded-2xl bg-red-600 items-center  justify-center py-10" style={{ width: "350px" }}>
                            <h1 className="text-2xl border-solid border-slate-200 border-b-8 w-full pl-5 text-white">Show / Actions</h1>
                            <p className={`actionsItem py-3  ${details}`} onClick={handleDetailsPage}>Details</p>
                            <p className={`actionsItem py-3 ${balanceHistory}`} onClick={handleBalanceHistoryPage}>Balance History</p>
                            <button type="button" className="text-white duration-75 hover:scale-110 flex flex-row items-center mt-8" onClick={handleBackButton}><IoChevronBackSharp /> Back</button>
                        </div>
                    </section>
                    {
                        details && (
                            <div>
                                <div className="flex flex-col gap-10 bg-white rounded-xl py-10" style={{ width: '60vw' }}>
                                    <h1 className="text-2xl border-solid border-slat-200 border-b-8 w-full pl-5 ">Account Details</h1>
                                    <div className=" flex flex-col gap-2 px-10">
                                        <p>First Name: {account.firstName}</p>
                                        <p>Last Name: {account.lastName}</p>
                                        <p>Date of birth: {account.birthdate}</p>
                                        <p>Monthly Pay: {account.monthlyPay} MGA</p>
                                        <p>Account Reference: {account.accountRef}</p>
                                        <p>Actual Balance: {balance.amount} MGA</p>
                                        <div className="flex flex-row gap-3 self-end">
                                            <button type="button" onClick={handleFormProvisioning} className="border-solid border-red-600 bg-red-600 border-2 rounded py-2  hover:bg-red-700 hover:border-red-700  transition duration-200 text-white w-52 mt-3">
                                                Provide your balance
                                            </button>
                                            <button type="button" onClick={handleFormAccountUpdate} className="border-solid border-red-600 bg-white border-2 rounded py-2  hover:bg-red-100   transition duration-200 text-red-700 w-52 mt-3">
                                                Update account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        balanceHistory && (
                            <div>
                                <div className="flex flex-col gap-10 bg-white rounded-xl py-10" style={{ width: '60vw' }}>
                                    <h1 className="text-2xl border-solid border-slat-200 border-b-8 w-full pl-5 ">Balance history</h1>
                                    <div className=" flex flex-col gap-2 px-10">
                                        <table>
                                            <thead className="bg-slate-200 rounded">
                                                <tr>
                                                    <th>End date</th>
                                                    <th className="border-solid border-black border-l-2 border-r-2">Start date</th>
                                                    <th>Balance</th>
                                                    <th  className="border-solid border-black border-l-2 border-r-2">Loan</th>
                                                    <th>Loan Interest</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>2024-03-05</td>
                                                    <td className="border-solid border-black border-l-2 border-r-2">2024-03-10</td>
                                                    <td>{balance.amount} MGA</td>
                                                    <td  className="border-solid border-black border-l-2 border-r-2"> 1200 MGA</td>
                                                    <td>1%</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="flex flex-row gap-3 self-end">
                                            <button type="button" onClick={handleFormBalanceHistory} className="border-solid border-red-600 bg-red-600 border-2 rounded py-2  hover:bg-red-700 hover:border-red-700  transition duration-200 text-white w-52 mt-3">
                                                Select date
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </main>
        </div>
    );
};

export default AccountDetails;
