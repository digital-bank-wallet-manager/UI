"use client"
import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { ProvisioningInterface } from "@/app/interface/provisioning/provisioningInterface";
import { ProvisioningFormInterface } from "@/app/interface/provisioning/provisioningFormInterface";
import { AccountInterface } from "@/app/interface/account/accountInterface";

export interface provisioningProps{
    formProvisioning: ProvisioningFormInterface;
    account: AccountInterface;
}

const Provisioning: React.FC<provisioningProps> = ({ formProvisioning ,account}) => {

    const [amount, setAmount] = useState(0);
    const [reason, setReason] = useState<string>('');
    const [effectiveDate, setEffectiveDate] = useState<string>('');
    const [accountId, setAccountId] = useState<string>('');
    const [provisioning, setProvisioning] = useState<ProvisioningInterface[]>([])

    const toProviseAccount = 'http://localhost:8080/provising/save';

    const handleAmount = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(ev.target.value);
        setAmount(val);
    };
    const handleReason = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setReason(ev.target.value);
    };
    const handleEffectiveDate = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(ev.target.value);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            alert('the effective date must be after today');
            setEffectiveDate('');
        } else {
            setEffectiveDate(ev.target.value);
        }
    };

    const handleButtonToCancelForm = () => {
        formProvisioning.setShowFormProvisioning(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!amount || !reason || !effectiveDate) {
            alert('Please complet the entire form');
        } else {
            const provisioningObject = {
                amount: amount,
                reason: reason,
                effectiveDate: effectiveDate,
                accountId: account.id,
            }
            fetch(toProviseAccount, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(provisioningObject),
            })
                .then(res => res.json())
                .then((data: ProvisioningInterface[]) => {
                    setProvisioning(data);
                    window.location.href='/account'
                })
                .catch(error => console.error('Erreur:', error));
        }
    };




    return (
        <div>
            <div className="flex flex-col gap-5 bg-red-600 border-red-700 border-solid border-2 py-8 px-5 absolute top-14 rounded-2xl z-50 shadow-gray-700 shadow-2xl" style={{ left: '35vw' }}>
                <button type="button" className="self-end text-2xl text-white duration-75 hover:scale-110" onClick={handleButtonToCancelForm}><MdCancel /></button>
                <h1 className="text-2xl text-white border-solid border-b-2 border-white pb-2 w-full pl-5">Provide balance for your account</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">Amount</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="number" placeholder="0" value={amount} onChange={handleAmount} className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">Reason</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="text" placeholder="..." value={reason} onChange={handleReason} className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">Effective date</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="date" value={effectiveDate} onChange={handleEffectiveDate} className="w-96 outline-none text-xl bg-red-600 rounded pl-2 placeholder-slate-700 text-white" />
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

export default Provisioning;