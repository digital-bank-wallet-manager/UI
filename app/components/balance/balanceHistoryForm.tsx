'use client'
import { AccountInterface } from "@/app/interface/account/accountInterface";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import BalanceWithLoanInterface from "@/app/interface/balanceWithLoan/balanceWithLoanInterface";
import BalanceHistoryFormInterface from "@/app/interface/balance/balanceHistoryForm";
import AccountDetails from "../accountComponets/accountDetails";

export interface BalanceHistoryProps {
    account: AccountInterface,
    formBalanceHistory: BalanceHistoryFormInterface
}

const BalanceHistoryForm: React.FC<BalanceHistoryProps> = ({ formBalanceHistory, account }) => {
    const [balanceAtDate, setBalanceAtDate] = useState<BalanceWithLoanInterface>();
    const [selectedDate, setSelectedDate] = useState('');
    const [showBalanceAtDate, setShowBalanceAtDate] = useState(false)


    const getAccountBalanceAtDate = 'http://localhost:8080/account/balance/'

    const handleSelectedDate = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(ev.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`${getAccountBalanceAtDate}${account.id}/${selectedDate}`)
            .then(res => res.json())
            .then((data: BalanceWithLoanInterface) => {
                setBalanceAtDate(data)
                console.log(data)
            })
        setShowBalanceAtDate(true);
        formBalanceHistory.setShowFormBalanceHsitory(false);

    }

    const handleButtonToCancelForm = () => {
        formBalanceHistory.setShowFormBalanceHsitory(false);
    }

    return (
        <div>
            {
                balanceAtDate ? (
                    <AccountDetails account={account} balance={balanceAtDate}></AccountDetails>
                ) : (
                    <div className="flex flex-col gap-5 bg-red-600 border-red-700 border-solid border-2 py-8 px-5 absolute top-14 rounded-2xl z-50 shadow-gray-700 shadow-2xl" style={{ left: '35vw' }}>
                        <button type="button" className="self-end text-2xl text-white duration-75 hover:scale-110" onClick={handleButtonToCancelForm}><MdCancel /></button>
                        <h1 className="text-2xl text-white border-solid border-b-2 border-white pb-2 w-full pl-5">Select date</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <p className="text-xl text-white">Date</p>
                                    <div className="border-solid border-2 border-white rounded p-1">
                                        <input type="date"  value={selectedDate} onChange={handleSelectedDate} className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" required />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="border-solid border-white border-2 rounded px-2 py-2 w-56 bg-white hover:bg-slate-200 hover:border-slate-200  transition duration-200 text-xl text-black ">
                                View balance
                            </button>
                        </form>
                    </div>
                )
            }

        </div>
    )
}
export default BalanceHistoryForm;