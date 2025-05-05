import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiHandler } from "next";
import { JWT } from "next-auth/jwt";

// Simulate user login (replace with your own auth logic later)
const users = [{ id: "1", email: "test@example.com", password: "Eram1234$" }];

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

      //return the user object if the credentials are valid
      async authorize(credentials) {
        const user = users.find(
          (user) =>
            user.email === credentials?.email &&
            user.password === credentials?.password
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
    /**
     the jwt callback adds the returned id and email to the token object
     {
    "id": "1",
    "email": "test@example.com",
    "iat": 1683283200,
    "exp": 1683369600
    }
     */
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

     /**
      the session callback customizes the session object sent to the client
      {
    "user": {
    "id": "1",
    "email": "test@example.com"
     },
     "expires": "2025-05-10T12:00:00.000Z"
      }
      
     */

    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
});

export default handler;
