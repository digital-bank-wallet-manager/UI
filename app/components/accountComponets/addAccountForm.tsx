import Currency from "./currency"
export default function AddAccountForm() {
    return (
        <div>
            <div className="flex flex-col gap-10 bg-red-600 border-red-700 border-solid border-2 rounded items-center h-screen justify-center pt-12" style={{ width: "500px", boxShadow: '0px 0px 10px 0px black' }}>
                <h1 className="text-2xl text-white border-solid border-b-2 border-white pb-2 w-full pl-5">Add new account</h1>
                <form className="flex flex-col gap-10 items-center">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">Last Name</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="text" placeholder="Last name" className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">First Name</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="text" placeholder="First name" className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">Birth date</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="date" className="w-96 outline-none text-xl bg-red-600 rounded pl-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-white">Type of account</p>
                            <div className="border-solid border-2 border-white rounded p-1">
                                <input type="text" placeholder="Bank" className="w-96 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 ">
                            <div className="flex flex-col gap-2">
                                <p className="text-xl text-white">Amount</p>
                                <div className="border-solid border-2 border-white rounded p-1">
                                    <input type="text" placeholder="0" className=" outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-white" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xl text-white">Currency</p>
                                <div className="border-solid border-2 border-white rounded p-1">
                                    <input type="text" placeholder="MGA" className=" w-32 outline-none text-xl bg-red-600 rounded px-2 placeholder-slate-700 text-center text-white uppercase" defaultValue={'MGA'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="border-solid border-white border-2 rounded px-2 py-2 w-56 hover:bg-white  transition duration-200 text-xl text-white hover:text-black">
                        Add account
                    </button>
                </form>
            </div>
        </div>
    )
}