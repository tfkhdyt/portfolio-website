'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname()
  return (
    <nav className="py-5 px-12 border-b-2 bg-bg-secondary dark:bg-dark-bg-secondary">
      <ol className="flex gap-6 font-semibold text-text-primary dark:text-dark-text-primary">
        <li>
          <Link href='/'>
            <button className={`${pathname == '/' && 'text-purple-200'} transition hover:text-green-100`}>
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link href='/about'>
            <button className={`${pathname == '/about' && 'text-purple-200'} transition hover:text-green-100`}>
              About
            </button>
          </Link>
        </li>
        <li>
          <Link href='/skills'>
            <button className={`${pathname == '/skills' && 'text-purple-200'} transition hover:text-green-100`}>
              Skills
            </button>
          </Link>
        </li>
        <li>
          <Link href='/projects'>
            <button className={`${pathname == '/projects' && 'text-purple-200'} transition hover:text-green-100`}>
              Projects
            </button>
          </Link>
        </li>
        <li>
          <Link href='/contact'>
            <button className={`${pathname == '/contact' && 'text-purple-200'} transition hover:text-green-100`}>
              Contact
            </button>
          </Link>
        </li>
      </ol>
    </nav>
  )
}

export default Navbar
