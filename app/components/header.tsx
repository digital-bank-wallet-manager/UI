"use client"
import Link from "next/link";
import { useState } from "react";
export default function Header() {
    const [currentItem, setCurrentItem] = useState("Home");

    const handleClick = (item:string)=>{
        setCurrentItem(item);
    }

    const navItem = [
        { item: "Home", path: "/home" },
        { item: "Account", path: "/home" },
        { item: "Transactions", path: "/transactions" },
        { item: "Setting", path: "/setting" },
    ]

    return (
        <div>
            <nav className="flex flex-row items-center justify-around py-4 bg-white fixed w-screen z-50">
                <Link href={'/home'} className="text-4xl">D-Bank</Link>
                <ul className="flex flex-row gap-12 ">
                    {navItem.map(navItem => (
                        <li key={navItem.item} className={`hover:text-red-500 ${currentItem == navItem.item ? 'text-red-500': null}`}>
                            <Link href={navItem.path}>{navItem.item}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}