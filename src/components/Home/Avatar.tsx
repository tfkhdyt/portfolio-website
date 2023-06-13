'use client';

import avatar from '../../../public/img/tfkhdyt-avatar.svg';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Avatar = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Image
        src={avatar}
        alt='tfkhdyt avatar'
        className='w-64 h-64 md:h-auto'
        width={300}
        height={300}
        priority
        onClick={() => session ? signOut() : signIn()}
      />
    </div>
  );
};

export default Avatar;
