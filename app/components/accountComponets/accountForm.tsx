"use client"
import Currency from "./currency";
import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { AccountFormInterface } from "@/app/interface/account/accountFormHomeInterface";
import { AccountInterface } from "@/app/interface/account/accountInterface";

const AccountForm: React.FC<AccountFormInterface> = ({ showForm, setShowForm }) => {

    const [lName, setLName] = useState<string>('');
    const [fName, setFName] = useState<string>('');
    const [bDate, setBDate] = useState<string>('');
    const [monthlySalary, setMonthlySalary] = useState<string>();
    const [currency, setCurrency] = useState<string>('MGA');
    const [account, setAccount] = useState<AccountInterface[]>([]);

    const insertAccount = 'http://localhost:8080/accounts/save';


    const handleInputHChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target;
        setAccount(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleButtonToCancelForm = () => {
        setShowForm(false)
    }


    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        if (!lName || !fName || !bDate || !monthlySalary || !currency) {
            alert('remplis otut le formulaire svp');
            e.preventDefault();
        } else {
            alert('success')
            fetch(insertAccount, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                }
            })
                .then(res => res.json())
                .then((data: AccountInterface[]) => {
                    setAccount(data)
                    console.log(account)
                })
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-5 bg-red-600 border-red-700 border-solid border-2 py-8 px-5 absolute top-14 rounded-2xl z-50 shadow-gray-700 shadow-2xl" style={{ left: '35vw' }}>
                <button type="button" className="self-end text-2xl text-white duration-75 hover:scale-110" onClick={handleButtonToCancelForm}><MdCancel /></button>
                <h1 className="text-2xl text-white border-solid border-b-2 border-white pb-2 w-full pl-5">Add new account</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">Last Name</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="text" placeholder="Last name" value={lName} onChange={handleInputHChange} className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">First Name</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="text" placeholder="First name" value={fName} onChange={(ev) => { setFName(ev.target.value) }} className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">Birth date</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="date" value={bDate} onChange={(ev) => { setBDate(ev.target.value) }} className="w-96 outline-none text-xl bg-red-600 rounded pl-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 ">
                            <div className="flex flex-col gap-2">
                                <p className="text-xl text-white">Monthly salary</p>
                                <div className="border-solid border-2 border-white rounded p-1">
                                    <input type="number" placeholder="0" value={monthlySalary} onChange={(ev) => { setMonthlySalary(ev.target.value) }} className=" outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xl text-white">Currency</p>
                                <div className="border-solid border-2 border-white rounded p-1">
                                    <input type="text" maxLength={3} value={currency} onChange={(ev) => { setCurrency(ev.target.value) }} className=" w-32 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-center text-white uppercase" defaultValue={'MGA'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="border-solid border-white border-2 rounded px-2 py-2 w-56 bg-white hover:bg-slate-200 hover:border-slate-200  transition duration-200 text-xl text-black ">
                        Add account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AccountForm;