import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from "./logo.png"

export default function Header() {
  return (
    <header>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3 bg-transparent font-funtext'>
        <Link to={'/'}>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <img src={logo} alt={"logo"}
            className='w-[60px] h-[35px] sm:w-[150px] sm:h-[60px]'/>
        </h1>
        </Link>
        <form className='bg-white sm:m-auto ml-3 px-3 py-2 sm:px-4 sm:py-3 rounded-3xl flex items-center text-[#f64c72]'>
        <input
        className="bg-transparent focus:outline-none w-24 lg:w-72 placeholder:text-[#f64c72] text-sm placeholder:text-sm"
        type="text"
        placeholder="Search..."
       />
       <FaSearch className='text-[#f64c72]' />
        </form>
        <ul className='flex gap-4'>
            <Link to={'/home'}>
            <li className='hidden sm:inline active:bg-[#f64c72] active:text-[#2f2fa2] transition-all ease-in 2s font-mono border-2 border-[#f64c72] bg-[#2f2fa2] px-3 py-2 text-xs text-[#f64c72]'>
                HOME
            </li>
            </Link>
            <Link to={'/about'}>
            <li className='hidden sm:inline bg-[#2f2fa2] active:bg-[#f64c72] active:text-[#2f2fa2] transition-all ease-in 2s font-mono border-2 px-3 py-2 text-[#f64c72] text-xs border-[#f64c72]'>
                ABOUT
            </li>
            </Link>
            <Link to={'/sign-in'}>
            <li className='sm:inline bg-[#2f2fa2] active:bg-[#f64c72] active:text-[#2f2fa2] transition-all ease-in 2s font-mono border-2 border-[#f64c72] p-1 text-xs sm:px-3 sm:py-2 text-[#f64c72]'>
                SIGN IN
            </li>
            </Link>
        </ul>
        </div>
    </header>
  )
}
