
import { useState } from "react";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { MdCancel } from "react-icons/md";
import { AccountInterface } from "@/app/interface/account/accountInterface";


export interface LoanAuthProps {
    account: AccountInterface,
}

const LoanAuth: React.FC<LoanAuthProps> = ({ account }) => {

    const [loan, setLoan] = useState(false)
    const getAccountLoanAuth = 'http://localhost:8080/account/loan/';

    const yesAuth = () => {
        setLoan(true)
    }

    const noAuth = () => {
        setLoan(false)
        window.location.href='/account'
    }

    if (loan) {
        fetch(`${getAccountLoanAuth}${account.id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
        window.location.href = '/account'
    } 

    return (
        <div>
            <div className="flex flex-col gap-5 bg-slate-300  py-8 px-5 absolute top-14 rounded-2xl z-50 shadow-gray-700 shadow-lg" style={{ left: '35vw', top: '30vh' }}>
                <h1 className="text-2xl text-black border-solid border-b-2 border-red-600 pb-2 w-full pl-5">Give loan authorization</h1>
                <div className='flex flex-row gap-4 justify-center items-center py-5'>
                    <button onClick={yesAuth} type='button'>
                        <p className=" text-xl text-black hover:text-red-600">
                            yes
                        </p>
                    </button>
                    <p className="text-red-600">/</p>
                    <button onClick={noAuth} type="button">
                        <p className=" text-xl text-rblack hover:text-red-600">
                            no
                        </p>
                    </button>
                    <p>?</p>
                </div>
            </div>
        </div>
    )
}

export default LoanAuth;