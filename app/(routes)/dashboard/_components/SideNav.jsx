import React, { useEffect } from 'react'
import {LayoutGrid,PiggyBank,ReceiptText,ShieldCheck} from 'lucide-react'
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
function SideNav() {
    const menuList=[
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Budgets',
            icon:PiggyBank,
            path:'/dashboard/budgets'

        },
        {
            id:3,
            name:'Expenses',
            icon:ReceiptText,
            path:'/dashboard/expenses'

        },
    ]
    const path=usePathname();
  return (
    <div className='h-screen p-5 border shadow-sm'>
        <h1 className='text-2xl text-primary'>Expense Vault</h1>
        <div className='mt-5'>
            {menuList.map((menu,index)=>(
                <Link href={menu.path} key={menu.id}>
                    <h2 className={`flex gap-2 items-center
                    text-gray-500 font-medium
                    mb-2
                    p-5 cursor-pointer rounded-md
                    hover:text-primary hover:bg-blue-100
                    ${path==menu.path&&'text-primary bg-blue-100'}
                    `}>
                        <menu.icon/>
                        {menu.name}
                    </h2>
                </Link>
            ))}
        </div>
            <div className='fixed bottom-10 p-5 flex gap-2
            items-center'>
                <UserButton/>
                Profile
            </div>
    </div>
  )
}

export default SideNav