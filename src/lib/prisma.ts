import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { AuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }

  // @ts-ignore
  prisma = global.prisma;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;

const authOptions: AuthOptions = {
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

export { authOptions, prisma };
