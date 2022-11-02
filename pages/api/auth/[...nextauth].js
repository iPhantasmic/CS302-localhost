import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions: NextAuthOptions = {
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "alvinowyong@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        // TODO GRPC CALL
        if (credentials === undefined) {
          return null;
        }

        if (
          credentials.email === "alvinowyong@gmail.com" &&
          credentials.password === "password"
        ) {
          return {
            id: 232323232323,
            name: "alvin23232323",
            email: "alvinowyong@gmail.com",
          };
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        // session.id = token.id
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
