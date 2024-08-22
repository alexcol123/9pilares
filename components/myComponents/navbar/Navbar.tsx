import NavSearch from './NavSearch'
import LinksDropdown from './LinksDropdown'
import DarkMode from './DarkMode'
import Logo from './Logo'
import CartIcon from './CartIcon'

function Navbar() {
  return (
    <nav className='border-b fixed z-[40]  bg-primary-foreground w-full'
    
    >
      <div className='container flex  items-center justify-between   w-full 


      py-3 md:py-8  gap-4'>
        <div className='w-2/3 flex items-center justify-between gap-2'>
          <Logo />
          <NavSearch />
        </div>
        <div className='w-1/3  flex items-center justify-end   gap-2 '>
          <DarkMode />
          <CartIcon />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  )
}
export default Navbar


