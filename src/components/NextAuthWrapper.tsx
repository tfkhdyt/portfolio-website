'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const NextAuthWrapper = ({ children }: { children: ReactNode }) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthWrapper;
