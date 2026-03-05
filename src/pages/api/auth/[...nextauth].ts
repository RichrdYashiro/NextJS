import bcryptjs from "bcryptjs"; 
import { prisma } from "@/server/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });


        if (!user) {
          return null;
        }

        const isPasswordValid = await bcryptjs.compare(
          credentials.password,
          user.password
        );

        if (isPasswordValid) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }


        return null;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = Number(token.sub);
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);