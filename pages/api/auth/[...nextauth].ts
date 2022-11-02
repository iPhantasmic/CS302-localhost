// @ts-nocheck
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import gqlclient from "../../../GraphQL/graphQLClient";
import { gql } from "@apollo/client";

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
      authorize: async (credentials) => {
        var data = { email: credentials.email, password: credentials.password };
        console.log(data);

        const request = gqlclient.query({
          query: gql`
            query LoginUser($data: LoginRequest) {
              LoginUser(data: $data) {
                userId
                token
              }
            }
          `,
          variables: { data },
        });

        return await request
          .then((response) => {
            console.log(response.data.LoginUser);
            if (response.data.LoginUser === null) {
              return null;
            } else {
              return {
                id: response.data.LoginUser.userId,
                user: response.data.LoginUser.userId,
                token: response.data.LoginUser.token,
                email: credentials.email,
              };
            }
          })
          .catch((e) => {
            console.log(e);
            return null;
          });
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
        session.id = token.id;
        session.userId = token.id;
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
