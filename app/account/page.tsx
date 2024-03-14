import Header from "../components/navgiationComponents/header";
import AccountList from "../components/accountComponets/accountList";
import AccountForm from "../components/accountComponets/accountForm";
export default function Account(){
    return(
        <div>
            <Header/>
            <main className="flex flex-row items-center gap-10  bg-slate-200 h-screen">
                <section>
                    <AccountForm/>
                </section>
                <section>
                    <AccountList/>
                </section>
            </main>
        </div>
    )
}