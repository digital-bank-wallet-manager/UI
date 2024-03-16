'use client'
import { useEffect, useState } from "react";
import { AccountInterface } from "@/app/interface/accountInterface";
export default function AccountList() {



    const [accountList, setAccountList] = useState<AccountInterface[]>([]);

    const url = 'http://localhost:8080/accounts';

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((data: AccountInterface[]) => {
                setAccountList(data)
            })
    }, [])

    return (
        <div>
            <ul className="flex flex-col  gap-12 p-3 overflow-auto max-h-max">
                {accountList.map((a) => (
                    <li key={a.id}>
                        <div className="flex flex-row justify-between bg-white rounded-xl gap-96 py-4 px-3">
                            <p className="pl-4">
                                {a.firstName}
                            </p>
                            <p>
                                {a.accountRef}
                            </p>
                            <p className="pr-4">
                                {a.monthlyPay} <span>MGA</span>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}