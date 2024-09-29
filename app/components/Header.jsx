import React from 'react'
import Link from 'next/link'
import { VscDiffAdded } from "react-icons/vsc";

const Header = () => {
  return (
    <div className="header flex justify-between gap-12 md:gap-0 lg:gap-0 px-5 md:px-16 lg:px-24 text-2xl font-bold font-serif py-5">
        <div className="logo"><Link href="/">zoloMovies</Link></div>
        <div className="nav ">
            <ul className='flex flex-row gap-5 md:gap-12 lg:gap-12 text-white'>
                <li><Link href="/pages/movies">Movies</Link></li> 
                <li className='text-3xl'><Link href="/pages/add"><VscDiffAdded /></Link></li>
                {/* <li>LoginBtn</li> */}
            </ul>
        </div>

    </div>
  )
}

export default Header