"use client"
import Header from "../components/navgiationComponents/header";
import { useEffect, useState } from "react";
import AccountList from "../components/accountComponets/accountList";
import AccountFormAccount from "../components/accountComponets/accountFormAccount";
import { AccountInterface } from "../interface/account/accountInterface";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
export default function Account() {
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [account, setAccount] = useState<AccountInterface[]>([])


    const handleButton = () => {
        setShowForm(true)
    }

    const behindForm = showForm ? 'opacity-50 z-30 pointer-events-none' : '';

    return (
        <div>
            {
                showForm &&
                (<AccountFormAccount showForm={showForm} setShowForm={setShowForm}></AccountFormAccount>)
            }
            <main className={`${behindForm}`}>
                <Header />
                <div className="flex flex-row pt-32 gap-24 bg-slate-200 h-screen pl-16 pr-16">
                    <section>
                        <div className="flex flex-col gap-10 rounded-2xl bg-red-600 border-red-700 border-solid border-2  items-center  justify-center py-10" style={{ width: "350px", boxShadow: '0px 0px 8px 0px black' }}>
                            <h1 className="text-2xl border-solid border-white border-b-2 w-full pl-5 text-white">Account</h1>
                            <button type="button" onClick={handleButton} className="border-solid border-white bg-white border-2 rounded py-2  hover:bg-slate-200 hover:border-slate-200  transition duration-200 flex flex-row items-center gap-2  text-black  justify-center" style={{ width: "270px" }}>
                                <FaPlus /> Add
                            </button>
                            <div className="flex flex-row gap-2 items-center border-solid border-2 border-white rounded p-2 bg-white">
                                <CiSearch />
                                <input type="text" value={search} onChange={(ev) => { setSearch(ev.target.value) }} placeholder="Search" className="outline-none  bg-white pl-2 placeholder-slate-700 text-black w-56 border-solide border-black border-l-2" />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="flex flex-row  jusitfy-between border-solid border-b-2 border-black gap-64 py-4 px-3">
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
                        <AccountList />
                    </section>
                </div>
            </main>
        </div>
    )
}