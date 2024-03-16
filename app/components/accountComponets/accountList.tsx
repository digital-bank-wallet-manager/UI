'use client'
import { useEffect, useState } from "react";
import { AccountInterface } from "@/app/interface/account/accountInterface";
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
            <ul className="flex flex-col  gap-5 py-8 px-3  overflow-auto max-h-max">
                {accountList.map((a) => (
                    <li key={a.id}>
                        <button type="button" className="flex flex-row justify-between bg-white rounded-xl gap-96 py-4 px-3 hover:shadow-xl duration-200 w-full">
                            <p className="pl-4">
                                {a.firstName}
                            </p>
                            <p>
                                {a.accountRef}
                            </p>
                            <p className="pr-4">
                                {a.monthlyPay} <span>MGA</span>
                            </p>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}