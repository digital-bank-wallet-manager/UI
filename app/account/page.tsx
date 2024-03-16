"use client"
import Header from "../components/navgiationComponents/header";
import { useState } from "react";
import AccountList from "../components/accountComponets/accountList";
import AccountForm from "../components/accountComponets/accountForm";
import AccountFormHome from "../components/accountComponets/accountForm";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
export default function Account() {
const [search,setSearch] = useState('');
const [showForm,setShowForm] = useState(false);

const handleButton = () =>{
    setShowForm(true)
}

    return (
        <div>
            <Header />
            <main className="flex flex-row items-center  gap-10  bg-slate-200 h-screen">
                <section>
                    <div className="flex flex-col gap-10 rounded-2xl bg-red-600 border-red-700 border-solid border-2  items-center  justify-center  ml-10 py-10" style={{ width: "350px", boxShadow: '0px 0px 8px 0px black' }}>
                        <h1 className="text-2xl border-solid border-white border-b-2 w-full pl-5 text-white">Account</h1>
                        <button type="button" onClick={handleButton}  className="border-solid border-white bg-white border-2 rounded py-2  hover:bg-slate-200 hover:border-slate-200  transition duration-200 flex flex-row items-center gap-2  text-black  justify-center" style={{ width: "270px" }}>
                            <FaPlus /> Add
                        </button>
                        <div className="flex flex-row gap-2 items-center border-solid border-2 border-white rounded p-2 bg-white">
                            <CiSearch />
                            <input type="text" value={search} onChange={(ev) => { setSearch(ev.target.value) }} placeholder="Search" className="outline-none  bg-white pl-2 placeholder-slate-700 text-black w-56 border-solide border-black border-l-2" />
                        </div>
                    </div>
                    {
                        showForm && 
                        (<AccountForm showForm={showForm} setShowForm={setShowForm}></AccountForm>)
                    }
                </section>
                <section>
                    <AccountList />
                </section>
            </main>
        </div>
    )
}