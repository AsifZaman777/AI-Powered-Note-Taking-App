import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiHandler } from "next";
import { JWT } from "next-auth/jwt";

// Simulate user login (replace with your own auth logic later)
const users = [
  { id: "1", email: "test@example.com", password: "password" },
];

// Extend the User type
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
  }
}

const handler: NextApiHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find(
          (user) =>
            user.email === credentials?.email && user.password === credentials?.password
        );
        if (user) {
          // Return an object that matches the extended User type
          return { id: user.id, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Using JWT for session management
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
});

export default handler;