import { prisma } from '@/lib/prisma';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.email !== ADMIN_EMAIL) {
          return null;
        }

        if (credentials.password !== ADMIN_PASSWORD) {
          return null;
        }

        const user = { id: 'admin', name: 'admin', email: credentials.email };

        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
