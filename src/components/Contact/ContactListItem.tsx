import { Contact } from '@/app/contact/page';
import Link from 'next/link';

type Props = {
  content: Contact;
};

const ContactListItem = ({ content }: Props) => {
  return (
    <li>
      <span className='font-medium text-gray-800 dark:text-gray-400'>
        {content.name}
      </span>{' '}
      -{' '}
      <Link
        href={content.url}
        target='_blank'
        className='relative font-bold underline group underline-offset-[4.5px] decoration-dotted decoration-1 md:underline-offset-4 md:decoration-2'
      >
        {content.username}
        <span className='absolute left-0 -bottom-0.5 w-0 h-full border-b-2 transition-all duration-300 dark:border-gray-200 group-hover:w-full border-light-fg-secondary'>
        </span>
      </Link>
    </li>
  );
};

export default ContactListItem;
