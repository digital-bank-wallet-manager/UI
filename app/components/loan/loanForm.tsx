

import { useState } from "react";
import { MdCancel } from "react-icons/md";
import LoanFormInterface from "@/app/interface/bankLoan/loanFormInterface";
import BankLoanInterface from "@/app/interface/bankLoan/bankLoanInterface";
import { AccountInterface } from "@/app/interface/account/accountInterface";
import BalanceWithLoanInterface from "@/app/interface/balanceWithLoan/balanceWithLoanInterface";



export interface LoanFormProps {
    loanForm: LoanFormInterface,
    account: AccountInterface,
    balance: BalanceWithLoanInterface
}

const LoanForm: React.FC<LoanFormProps> = ({ loanForm, account, balance }) => {

    const [amount, setAmount] = useState(0);
    const [loanDate, setLoanDate] = useState('');
    const [accountLoan, setAccountLoan] = useState<BankLoanInterface>();

    const loanOperation = 'http://localhost:8080/loan';


    const handleAmount = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(ev.target.value)
        setAmount(val)
    }

    const handleLoanDate = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(ev.target.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const selectedTimestamp = selectedDate.getTime();
        const currentTimestamp = currentDate.getTime();

        if (selectedTimestamp >= currentTimestamp) {
            setLoanDate(ev.target.value);
        } else {
            alert('date must be after today');
            setLoanDate('');
        }
    }

    const handleCancelBtn = () => {
        loanForm.setShowLoanForm(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loanObject = {
            accountId: account.id,
            amount: amount,
            loanDate: loanDate,
            interestSevenDay: 1,
            interestAboveSevenDay: 2
        }
        if (balance.balance.amount <= 0) {
            alert('you can not make loan because your balance is not enough')
            loanForm.setShowLoanForm(false)
        } else {
            fetch(loanOperation, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(loanObject)
            })
                .then(res => res.json())
                .then((data:BankLoanInterface) => {
                    setAccountLoan(data)
                    console.log(data)
                })
                window.location.href='/account'
        }
    }

    return (
        <div>
            <div>
                <div className="flex flex-col gap-5 bg-red-600 border-red-700 border-solid border-2 py-8 px-5 absolute top-14 rounded-2xl z-50 shadow-gray-700 shadow-2xl" style={{ left: '35vw' }}>
                    <button type="button" className="self-end text-2xl text-white duration-75 hover:scale-110" onClick={handleCancelBtn}><MdCancel /></button>
                    <h1 className="text-2xl text-white border-solid border-b-2 border-white pb-2 w-full pl-5">Make Loan</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <p className="text-xl text-white">Amount</p>
                                <div className="border-solid border-2 border-white rounded p-1">
                                    <input type="number" placeholder="0" value={amount} onChange={handleAmount} className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" required />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xl text-white">Effective Date</p>
                                <div className="border-solid border-2 border-white rounded p-1">
                                    <input type="date" onChange={handleLoanDate} value={loanDate} placeholder="0" className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" required />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="border-solid border-white border-2 rounded px-2 py-2 w-56 bg-white hover:bg-slate-200 hover:border-slate-200  transition duration-200 text-xl text-black ">
                            Make loan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoanForm;