import React, { useEffect } from "react";
import { AccountInterface } from "@/app/interface/account/accountInterface";
import { IoChevronBackSharp } from "react-icons/io5";
import { BalanceInterface } from "@/app/interface/balance/balanceInterface";
import { useState } from "react";
import Provisioning from "../provisioning/provisioningForm";
import Header from "../navgiationComponents/header";
import AccountUpdateForm from "./accountUpdateform";
import BalanceHistoryForm from "../balance/balanceHistoryForm";
import CategoryInterface from "@/app/interface/category/categoryInterface";
import BalanceWithLoanInterface from "@/app/interface/balanceWithLoan/balanceWithLoanInterface";
import BankLoanInterface from "@/app/interface/bankLoan/bankLoanInterface";
import LoanForm from "../loan/loanForm";

export interface AccountDetailsProps {
    account: AccountInterface;
    balance: BalanceWithLoanInterface;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account, balance }) => {
    const [showFormProvisioning, setShowFormProvisioning] = useState(false);
    const [balanceAtDate, setBalanceAtDate] = useState<BalanceWithLoanInterface[]>([]);
    const [showFormAccountUpdate, setShowFormAccountUpdate] = useState(false);
    const [showFormBalanceHistory, setShowFormBalanceHsitory] = useState(false);
    const [showLoanForm, setShowLoanForm] = useState(false);
    const [detailsPage, setDetailsPage] = useState(true);
    const [balanceHistoryPage, setBalanceHistoryPage] = useState(false);
    const [categoryCreditList, setCategoryCreditList] = useState<CategoryInterface[]>([]);
    const [accountLoanList, setAccountLoanList] = useState<BankLoanInterface[]>([]);

    const getCategoryType = 'http://localhost:8080/category';
    const getAccountBalance = 'http://localhost:8080/account/balance/';
    const getAccountLoanAuth = 'http://localhost:8080/account/loan/';
    const getAccountLoan = 'http://localhost:8080/loan/';

    const handleClickChoseDate = () => {
        fetch(`${getAccountBalance}${account.id}/${balance.balance.dateTime}`)
            .then(res => res.json())
            .then((data: BalanceWithLoanInterface[]) => {
                setBalanceAtDate(data)
                console.log(data)
            })
    }
    useEffect(() => {
        if (balance.balance.amount > 0) {
            fetch(`${getAccountLoanAuth}${account.id}`, {
                method: 'PUT'
            })
                .then(res => res.json())
        }
    }, [])

    const handleBackButton = () => {
        window.location.href = '/account';
    }


    const handleFormProvisioning = () => {
        setShowFormProvisioning(true);
        const credit = '/credit'
        fetch(`${getCategoryType}${credit}`)
            .then(res => res.json())
            .then((data: CategoryInterface[]) => {
                console.log(data)
                setCategoryCreditList(data)
            })
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
        fetch(`${getAccountLoan}${account.id}`)
            .then(res => res.json())
            .then((loan: BankLoanInterface[]) => {
                setAccountLoanList(loan)
                console.log(loan)
            })
    }

    const handleMakeLoanBtn = () => {
        setShowLoanForm(true)
    }

    const balanceDate = new Date(balance.balance.dateTime).toLocaleString();

    const behindForm = showFormProvisioning ? 'opacity-50 z-30 pointer-events-none' : '';
    const behindFormAccountUpdate = showFormAccountUpdate ? 'opacity-50 z-30 pointer-events-none' : '';
    const behinFormBalanceHistory = showFormBalanceHistory ? 'opacity-50 z-30 pointer-events-none' : '';
    const behindLoanForm = showLoanForm ? 'opacity-50 z-30 pointer-events-none' : '';
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
                    <Provisioning formProvisioning={{ showFormProvisioning, setShowFormProvisioning }} account={account} subCategory={categoryCreditList}></Provisioning>
                )
            }
            {
                showFormBalanceHistory && (
                    <BalanceHistoryForm formBalanceHistory={{ showFormBalanceHistory, setShowFormBalanceHsitory }}></BalanceHistoryForm>
                )
            }
            {
                showLoanForm && (
                    <LoanForm loanForm={{ showLoanForm, setShowLoanForm }} account={account} balance={balance}></LoanForm>
                )
            }
            <main className={`${behindForm}${behindFormAccountUpdate}${behinFormBalanceHistory}${behindLoanForm}`}>
                <Header />
                <div className={`flex flex-row pt-32 gap-24 bg-slate-200 h-screen pl-16 pr-16$`}>
                    <section>
                        <div className="flex flex-col rounded-2xl bg-red-600 items-center  justify-center py-10" style={{ width: "350px" }}>
                            <h1 className="text-2xl border-solid border-slate-200 border-b-8 w-full pl-5 text-white">Show / Actions</h1>
                            <p className={`actionsItem py-3  ${details}`} onClick={handleDetailsPage}>Details</p>
                            <p className={`actionsItem py-3 ${balanceHistory}`} onClick={handleBalanceHistoryPage}>Actual Balance</p>
                            <button type="button" onClick={handleMakeLoanBtn} className="border-solid border-white bg-white border-2 rounded py-2 mt-5  hover:bg-slate-200 hover:border-slate-200  transition duration-200 flex flex-row items-center gap-2  text-black  justify-center" style={{ width: "270px" }}>
                                Make Loan
                            </button>
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
                                        <p>Actual Balance: {balance.balance.amount} MGA</p>
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
                                    <h1 className="text-2xl border-solid border-slat-200 border-b-8 w-full pl-5 ">Actual Balance</h1>
                                    <div className=" flex flex-col gap-2 px-10">
                                        <table>
                                            <thead className="bg-slate-200 rounded">
                                                <tr>
                                                    <th>Date</th>
                                                    <th className="border-solid border-black border-l-2 border-r-2">Balance</th>
                                                    <th className="border-solid border-black border-l-2 border-r-2">Loan</th>
                                                    <th>Loan Interest</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{balanceDate}</td>
                                                    <td className="border-solid border-black border-l-2 border-r-2">{balance.balance.amount} MGA</td>
                                                    <td className="border-solid border-black border-l-2 border-r-2">
                                                        {
                                                            accountLoanList.length > 0 ? (
                                                                accountLoanList.map((aLoan) => (
                                                                    <div key={aLoan.id}>
                                                                        <p>{aLoan.amount}</p>
                                                                    </div>
                                                                ))
                                                            ) : 0
                                                        }</td>
                                                    <td>{balance.loanEvolution.totalInterest}</td>
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
