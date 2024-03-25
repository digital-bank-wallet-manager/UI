import React, { useEffect, useState } from "react";
import { AccountInterface } from "@/app/interface/account/accountInterface";
import { BalanceInterface } from "@/app/interface/balance/balanceInterface";
import '@/app/components/accountComponets/account.css';
import AccountDetails from "./accountDetails";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import AccountFormAccount from "./accountFormAccount";
import Header from "@/app/components/navgiationComponents/header";
import BalanceWithLoanInterface from "@/app/interface/balanceWithLoan/balanceWithLoanInterface";

const AccountList = () => {

    const [selectedAccount, setSelectedAccount] = useState<AccountInterface>();
    const [selectedBalance, setSelectedBalance] = useState<BalanceWithLoanInterface>();
    const [accountList, setAccountList] = useState<AccountInterface[]>([]);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleButton = () => {
        setShowForm(true)
    }

    const getAccountList = 'http://localhost:8080/accounts';
    const getAccountBalance = 'http://localhost:8080/account/balance/';

    const handleAccountDetails = (account: AccountInterface) => {
        setSelectedAccount(account);
        fetch(`${getAccountBalance}${account.id}`)
            .then(res => res.json())
            .then((data: BalanceWithLoanInterface) => {
                setSelectedBalance(data);
                console.log(data)
            })
    };

    useEffect(() => {
        fetch(getAccountList)
            .then(res => res.json())
            .then((data: AccountInterface[]) => {
                setAccountList(data);   
            });
    }, []);

    const behindForm = showForm ? 'opacity-50 z-30 pointer-events-none' : '';


    return (
        <div>
            {
                showForm &&
                (<AccountFormAccount showForm={showForm} setShowForm={setShowForm}></AccountFormAccount>)
            }
            {selectedAccount && selectedBalance  ? (
                <AccountDetails account={selectedAccount} balance={selectedBalance} />
            ) : (accountList.length === 0 ? (
                <main className={`${behindForm}`}>
                    <Header />
                    <div className={`flex flex-row pt-32 gap-24 bg-slate-200 h-screen pl-16 pr-16`}>
                        <section>
                            <div className="flex flex-col gap-10 rounded-2xl bg-red-600 items-center  justify-center py-10" style={{ width: "350px" }}>
                                <h1 className="text-2xl border-solid border-slate-200 border-b-8 w-full pl-5 text-white">Account</h1>
                                <button type="button" onClick={handleButton} className="border-solid border-white bg-white border-2 rounded py-2  hover:bg-slate-200 hover:border-slate-200  transition duration-200 flex flex-row items-center gap-2  text-black  justify-center" style={{ width: "270px" }}>
                                    <FaPlus /> Add
                                </button>
                                <div className="flex flex-row gap-2 items-center border-solid border-2 border-white rounded p-2 bg-white">
                                    <CiSearch />
                                    <input type="text" value={search} onChange={(ev) => { setSearch(ev.target.value) }} placeholder="Search" className="outline-none  bg-white pl-2 placeholder-slate-700 text-black w-56 border-solide border-black border-l-2" />
                                </div>
                            </div>
                        </section>
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
                    </div>
                </main>
            ) : (
                <main className={`${behindForm}`}>
                    <Header/>
                    <div className={`flex flex-row pt-32 gap-24 bg-slate-200 h-screen pl-16 pr-16${behindForm}`}>
                        <section>
                            <div className="flex flex-col gap-10 rounded-2xl bg-red-600 items-center  justify-center py-10" style={{ width: "350px" }}>
                                <h1 className="text-2xl border-solid border-slate-200 border-b-8 w-full pl-5 text-white">Account</h1>
                                <button type="button" onClick={handleButton} className="border-solid border-white bg-white border-2 rounded py-2  hover:bg-slate-200 hover:border-slate-200  transition duration-200 flex flex-row items-center gap-2  text-black  justify-center" style={{ width: "270px" }}>
                                    <FaPlus /> Add
                                </button>
                                <div className="flex flex-row gap-2 items-center border-solid border-2 border-white rounded p-2 bg-white">
                                    <CiSearch />
                                    <input type="text" value={search} onChange={(ev) => { setSearch(ev.target.value) }} placeholder="Search" className="outline-none  bg-white pl-2 placeholder-slate-700 text-black w-56 border-solide border-black border-l-2" />
                                </div>
                            </div>
                        </section>
                        <div>
                            <div className="flex flex-row  jusitfy-between border-solid border-b-2 border-black px-10 gap-64 py-4" style={{fontWeight:'bold'}}>
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
                    </div>
                </main>
            ))
            }
        </div>
    );
};

export default AccountList;
