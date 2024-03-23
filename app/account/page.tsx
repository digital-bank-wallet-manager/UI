"use client"
import { useEffect, useState } from "react";
import AccountList from "../components/accountComponets/accountList";
import AccountFormAccount from "../components/accountComponets/accountFormAccount";
import { AccountInterface } from "../interface/account/accountInterface";

const Account = () => {
    
    return (
        <div>
            <main>
                <AccountList/>
            </main>
        </div>
    )
}

export default Account;