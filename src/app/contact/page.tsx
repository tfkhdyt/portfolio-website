import Form from '@/components/Contact/Form';
import Title from '@/components/Title';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact - Taufik Hidayat',
};

type SocialMedia = {
  name: string;
  username: string;
  url: string;
};

const contents: SocialMedia[] = [
  {
    name: 'GitHub',
    username: 'tfkhdyt',
    url: 'https://github.com/tfkhdyt',
  },
  {
    name: 'Telegram',
    username: '@tfkhdyt',
    url: 'https://t.me/tfkhdyt',
  },
  {
    name: 'Mastodon',
    username: '@tfkhdyt',
    url: 'https://fosstodon.org/@tfkhdyt',
  },
  {
    name: 'YouTube',
    username: 'Taufik Hidayat',
    url: 'https://youtube.com/tfkhdyt',
  },
  {
    name: 'LinkedIn',
    username: 'Taufik Hidayat',
    url: 'https://www.linkedin.com/in/tfkhdyt142/',
  },
  {
    name: 'Facebook',
    username: 'Taufik Hidayat',
    url: 'https://www.facebook.com/tfkhdyt142/',
  },
  {
    name: 'Email',
    username: 'tfkhdyt@proton.me',
    url: 'mailto:tfkhdyt@proton.me',
  },
];

const ContactPage = () => {
  return (
    <main className='space-y-10'>
      <div className='space-y-4'>
        <Title>Contact</Title>
        <p className='dark:text-gray-200 text-light-fg-secondary'>
          Please don’t hesitate to get in touch with me by following my social media below:
        </p>
        <div className='ml-8 text-base font-normal dark:text-gray-200 text-light-fg-secondary'>
          <ul className='space-y-2 list-disc list-outside'>
            {contents.map((content) => (
              <li key={content.name}>
                <span className='font-medium text-gray-800 dark:text-gray-400'>
                  {content.name}
                </span>{' '}
                -{' '}
                <Link
                  href={content.url}
                  target='_blank'
                  className='relative font-bold underline group underline-offset-[5px] decoration-dashed decoration-1'
                >
                  {content.username}
                  <span className='absolute left-0 -bottom-0.5 w-0 h-full border-b-2 dark:border-gray-200 group-hover:w-full border-light-fg-secondary'>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='space-y-4'>
        <Title>Message</Title>
        <div>
          <Form />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
