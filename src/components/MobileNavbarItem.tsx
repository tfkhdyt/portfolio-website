import { NavbarItemType } from './Navbar';

import clsx from 'clsx';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

type Props = {
  content: NavbarItemType;
  onClick: MouseEventHandler<HTMLAnchorElement>;
  pathname: string;
};

const MobileNavbarItem = ({ content, onClick, pathname }: Props) => {
  return (
    <li>
      <Link href={content.target} onClick={onClick}>
        <button
          className={clsx(
            'py-4 w-full text-left border-b-2',
            pathname == content.target
              ? 'text-green-200 border-green-200 dark:text-green-100 dark:border-green-100'
              : 'border-light-fg-secondary/25 dark:border-dark-fg-secondary/25 border-b hover:text-blue-100 hover:border-blue-100 dark:hover:text-blue-100 dark:hover:border-blue-100',
          )}
        >
          {content.title}
        </button>
      </Link>
    </li>
  );
};

export default MobileNavbarItem;
