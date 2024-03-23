'use client'
import { AccountInterface } from "@/app/interface/account/accountInterface";
import { useState } from "react";
import BalanceHistoryFormInterface from "@/app/interface/balance/balanceHistoryForm";
import { MdCancel } from "react-icons/md";

export interface BalanceHistoryProps {
    formBalanceHistory: BalanceHistoryFormInterface,
}

const BalanceHistoryForm: React.FC<BalanceHistoryProps> = ({formBalanceHistory}) => {
    const [endDate, setEndDate] = useState('');
    const [startDate,setStartDate] = useState('');

   const handleStartDate = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const selectedDate = ev.target.value
      if (selectedDate < endDate){
        alert('invalid Date');
        setStartDate('')
      }else{
        setStartDate(ev.target.value)
      }
   }

   const handleEndDate = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const selectedDate = ev.target.value
      if (selectedDate > startDate){
        alert('invalid Date');
        setEndDate('')
      }else{
        setEndDate(ev.target.value)
      }
   }
   

    const handleButtonToCancelForm = () => {
       formBalanceHistory.setShowFormBalanceHsitory(false);
    }

    return (
        <div>
            <div className="flex flex-col gap-5 bg-red-600 border-red-700 border-solid border-2 py-8 px-5 absolute top-14 rounded-2xl z-50 shadow-gray-700 shadow-2xl" style={{ left: '35vw' }}>
                <button type="button" className="self-end text-2xl text-white duration-75 hover:scale-110" onClick={handleButtonToCancelForm}><MdCancel /></button>
                <h1 className="text-2xl text-white border-solid border-b-2 border-white pb-2 w-full pl-5">Select between end/start date</h1>
                <form className="flex flex-col gap-8 items-center">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">Start date</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="date" placeholder="0" value={startDate} onChange={handleStartDate} className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">End date</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="date" placeholder="true/false" value={endDate} onChange={handleEndDate} className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="border-solid border-white border-2 rounded px-2 py-2 w-56 bg-white hover:bg-slate-200 hover:border-slate-200  transition duration-200 text-xl text-black ">
                        View balance
                    </button>
                </form>
            </div>
        </div>
    )
}
export default BalanceHistoryForm;