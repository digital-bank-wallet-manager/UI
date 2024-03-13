import Header from "../components/navgiationComponents/header"
import AddAccountForm from "../components/accountComponets/addAccountForm"
export default function Account(){
    return(
        <div>
            <Header/>
            <main className=" bg-slate-200 h-screen">
                <section>
                    <AddAccountForm/>
                </section>
            </main>
        </div>
    )
}