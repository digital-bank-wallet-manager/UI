"use client"
import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { ProvisioningInterface } from "@/app/interface/provisioning/provisioningInterface";
import { ProvisioningFormInterface } from "@/app/interface/provisioning/provisioningFormInterface";
import { AccountInterface } from "@/app/interface/account/accountInterface";
import CategoryInterface from "@/app/interface/category/categoryInterface";
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import classNames from 'classnames';


export interface provisioningProps {
    formProvisioning: ProvisioningFormInterface;
    account: AccountInterface;
    subCategory: CategoryInterface[];
}

const Provisioning: React.FC<provisioningProps> = ({ formProvisioning, account, subCategory }) => {

    const [amount, setAmount] = useState(0);
    const [categoryId, setCategoryId] = useState<number>();
    const [categoryName, setCategoryName] = useState('');
    const [isOpen, setIsopen] = useState(false);
    const [reason, setReason] = useState<string>('');
    const [effectiveDate, setEffectiveDate] = useState<string>('');
    const [provisioning, setProvisioning] = useState<ProvisioningInterface[]>([])

    const toProviseAccount = 'http://localhost:8080/provising/save/';

    const handleAmount = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(ev.target.value);
        setAmount(val);
    };;
    const handleEffectiveDate = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(ev.target.value);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            alert('the effective date must be after today');
            setEffectiveDate('');
        } else {
            setEffectiveDate(ev.target.value);
        }
    }

    const handleButtonToCancelForm = () => {
        formProvisioning.setShowFormProvisioning(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!amount || !effectiveDate) {
            alert('Please complet the entire form');
        } else {
            const provisioningObject = {
                amount: amount,
                reason: reason,
                effectiveDate: effectiveDate,
                accountId: account.id,
            }
            fetch(`${toProviseAccount}${categoryId}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(provisioningObject),
            })
                .then(res => res.json())
                .then((data: ProvisioningInterface[]) => {
                    setProvisioning(data);
                    window.location.href = ('/account')
                })
                .catch(error => console.error('Erreur:', error));
        }
    };

    const handleChosecategory = (id: number, name: string) => {
        setCategoryId(id)
        setCategoryName(name)
        console.log(categoryId)
    }

    const handleClickeCategories = () => {
        if (!isOpen) {
            setIsopen(true)
        } else {
            setIsopen(false)
        }
    }

    const clickedCategorie = categoryName ? categoryName : 'Categories';
    const hoverCategories = isOpen ? 'bg-red-200' : '';


    'block px-4 py-2 text-sm'
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
                            <p className="text-xl text-white">Category</p>


                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className={`inline-flex w-full justify-center gap-x-1.5 rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-white ${hoverCategories} hover:bg-red-200`} onClick={handleClickeCategories}>
                                        {clickedCategorie}
                                        {
                                            isOpen ? (
                                                <FaChevronUp className="-mr-1 h-5 w-5 text-black" aria-hidden="true" />
                                            ) : (
                                                <FaChevronDown className="-mr-1 h-5 w-5 text-black" aria-hidden="true" />
                                            )
                                        }
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-full text-center origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                <ul>
                                                    {subCategory.map((c) => (
                                                        <li key={c.subCategoryId} onClick={() => { handleChosecategory(c.subCategoryId, c.subCategory) }} className="hover:bg-slate-300">{c.subCategory}</li>
                                                    ))}
                                                </ul>
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">Effective date</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="date" value={effectiveDate} onChange={handleEffectiveDate} className="w-96 outline-none text-xl bg-red-600 rounded pl-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="border-solid border-white border-2 rounded px-2 py-2 w-56 bg-white hover:bg-slate-200 hover:border-slate-200  transition duration-200 text-xl text-black ">
                        Provide balance
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Provisioning;