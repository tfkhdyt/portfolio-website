import { NavbarItemType } from './Navbar';

import clsx from 'clsx';
import Link from 'next/link';

type Props = {
  content: NavbarItemType;
  pathname: string;
};
const NavbarItem = ({ content, pathname }: Props) => {
  return (
    <li>
      <Link href={content.target}>
        <button
          className={clsx(
            pathname == content.target
              ? 'text-green-200 dark:text-green-100'
              : 'hover:text-blue-200 dark:hover:text-blue-100',
          )}
        >
          {content.title}
        </button>
      </Link>
    </li>
  );
};

export default NavbarItem;
