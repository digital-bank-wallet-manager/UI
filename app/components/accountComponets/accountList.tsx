'use client'
import { useEffect, useState } from "react";
import { AccountInterface } from "@/app/interface/account/accountInterface";
import '@/app/components/accountComponets/account.css'
export default function AccountList() {



    const [accountList, setAccountList] = useState<AccountInterface[]>([]);

    const getAccountList = 'http://localhost:8080/accounts';

    useEffect(() => {
        fetch(getAccountList)
            .then(res => res.json())
            .then((data: AccountInterface[]) => {
                setAccountList(data)
            })
    }, [])

    return (
        <div>
            <ul className="flex flex-col py-8 gap-5 px-3 overflow-auto  custom-scrollbar" style={{ maxHeight: '70vh' }}>
                {accountList.length === 0 ? (<p className="text-center text-slate-500">No account registered</p>) : (
                    accountList.map((a) => (
                        <li key={a.id}>
                            <button type="button" className="flex flex-row justify-between bg-white rounded-xl py-4 px-3 hover:shadow-xl duration-200 w-full">
                                <p>
                                    {a.firstName}
                                </p>
                                <p>
                                    {a.accountRef}
                                </p>
                                <p>
                                    {a.monthlyPay} <span>MGA</span>
                                </p>
                            </button>
                        </li>
                    ))
                )
                }
            </ul>
        </div>
    )
}