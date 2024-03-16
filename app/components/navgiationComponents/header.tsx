"use client"
import { log } from "console";
import { NavItem } from '../../interface/navigation/navItemInterface';
import Link from "next/link";
import { useState } from "react";
export default function Header() {
    const navItem : NavItem [] = [
        { item: "Home", path: "/home" },
        { item: "Account", path: "/account"},
        { item: "Transactions", path: "/transactions" },
        { item: "Setting", path: "/setting" },
    ]
    const [currentItem,setCurrentItem] = useState('Home');

    const handleNavItem = (Item : string) => {
        setCurrentItem(Item);
    }
    
    

    return (
        <div>
            <nav className="flex flex-row items-center justify-around py-4 bg-white fixed w-screen z-50">
                <Link href={'/home'} className="text-4xl">D-Bank</Link>
                <ul className="flex flex-row gap-12 ">
                    {navItem.map(navItem => (
                        <li key={navItem.item}> 
                            <Link href={navItem.path} className={`hover:text-red-500 ${currentItem === navItem.item ? 'text-red-500': ''}`} onClick={() => handleNavItem(navItem.item)}>{navItem.item}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}