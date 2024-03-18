import React, { useEffect, useState } from "react";
import { AccountInterface } from "@/app/interface/account/accountInterface";
import '@/app/components/accountComponets/account.css';
import AccountDetails from "./accountDetails";

const AccountList = () => {
    const [selectedAccount, setSelectedAccount] = useState<AccountInterface>();
    const [accountList, setAccountList] = useState<AccountInterface[]>([]);

    const getAccountList = 'http://localhost:8080/accounts';

    const handleAccountDetails = (account: AccountInterface) => {
        setSelectedAccount(account);
    };

    useEffect(() => {
        fetch(getAccountList)
            .then(res => res.json())
            .then((data: AccountInterface[]) => {
                setAccountList(data);
            });
    }, []);



    return (
        <div>
            {selectedAccount ? (
                <AccountDetails account={selectedAccount} />
            ) : (accountList.length === 0 ? (
                <div className="flex flex-col items-center gap-10"> 
                        <div className="flex flex-row  jusitfy-between border-solid border-b-2 border-black px-10 gap-64  py-4 ">
                        <p>
                            Name
                        </p>
                        <p className="border-solid border-black border-l-2 border-r-2 px-32 ">
                            Reference
                        </p>
                        <p>
                            Pay
                        </p>
                    </div>
                    <p className="text-center text-slate-500">No account registered</p>
                </div>
            ) : (
                <div>
                    <div className="flex flex-row  jusitfy-between border-solid border-b-2 border-black px-10 gap-64 py-4">
                        <p>
                            Name
                        </p>
                        <p className="border-solid border-black border-l-2 border-r-2 px-32 ">
                            Reference
                        </p>
                        <p>
                            Pay
                        </p>
                    </div>
                    <ul className="flex flex-col py-8 gap-5 px-3 overflow-auto custom-scrollbar" style={{ maxHeight: '70vh' }}>
                        {accountList.map((a) => (
                            <li key={a.id} onClick={() => handleAccountDetails(a)}>
                                <div className="flex flex-col gap-2">
                                    <button type="button" className="flex flex-row justify-between bg-white rounded-xl py-4 px-3 hover:shadow-xl duration-200 w-full">
                                        <p>{a.firstName}</p>
                                        <p>{a.accountRef}</p>
                                        <p>{a.monthlyPay} <span>MGA</span></p>
                                    </button>
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </div>

            ))
            }
        </div>
    );
};

export default AccountList;
