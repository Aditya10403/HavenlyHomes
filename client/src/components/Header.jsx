import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from "./logo.png"

export default function Header() {
  return (
    <header>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3 bg-transparent'>
        <Link to={'/'}>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <img src={logo} alt={"logo"}
            className='w-[80px] h-[60px]'/>
        </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
        <input
        className="bg-transparent focus:outline-none w-24 sm:w-64"
        type="text"
        placeholder="Search..."
       />
       <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex'>
            <Link to={'/home'}>
            <li className='hidden sm:inline active:bg-[#8e8d8a] transition-all ease-in 2s font-mono border border-[#8e8d8a] px-3 py-2 text-black border-r-0'>
                HOME
            </li>
            </Link>
            <Link to={'/about'}>
            <li className='hidden sm:inline  active:bg-[#8e8d8a] transition-all ease-in 2s font-mono border border-[#8e8d8a] px-3 py-2 text-black'>
                ABOUT
            </li>
            </Link>
            <Link to={'/sign-in'}>
            <li className='sm:inline active:bg-[#8e8d8a] transition-all ease-in 2s font-mono border border-[#8e8d8a] px-3 py-2 text-black border-l-0'>
                SIGN IN
            </li>
            </Link>
        </ul>
        </div>
    </header>
  )
}
