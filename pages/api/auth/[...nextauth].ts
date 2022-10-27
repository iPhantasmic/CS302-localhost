import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "alvinowyong@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // TODO: Call auth service

        if (email !== "alvinowyong@gmail.com" || password !== "password") {
          return null;
        }

        return {
          id: "1234",
          name: "Alvin Owyong",
          email: "alvinowyong@gmail.com",
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: "/auth/error",
    // signOut: "/auth/signout",
  },
};

export default NextAuth(authOptions);
