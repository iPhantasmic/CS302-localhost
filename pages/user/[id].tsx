// @ts-nocheck
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Card } from "../../components/Card";
import DarkModeToggle from "../../components/DarkModeToggle";
import Footer from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import Types from "../../components/Types";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import gqlclient from "../../GraphQL/graphQLClient";
import { useEffect, useState } from "react";
import MainContent from "../../components/MainContent";
import {
  CalendarIcon,
  StarIcon,
  AttachmentIcon,
  ChatIcon,
  AtSignIcon,
} from "@chakra-ui/icons";

const Home: NextPage = () => {
  // console.log(query_data.launches)
  const router = useRouter();
  const [user, setUser] = useState({});
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      Router.push("/auth/signin");
    },
  });

  useEffect(() => {
    console.log(window.location.pathname);
    var datas = { userId: router.query.id };

    const data = gqlclient.query({
      query: gql`
        query GetUser($datas: GetUserRequest) {
          GetUser(data: $datas) {
            userId
            email
          }
        }
      `,
      variables: { datas },
    });

    data.then((response) => {
      setUser(response.data.GetUser);
    });
  });

  return (
    <div>
      <Head>
        <title>Localhost - Rent safely</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar main simple />

      <MainContent>
        <Container maxW="container.3xl" height="fit-content">
          <HStack>
            <Container>
              <Box my="20" mx={14} boxShadow="lg" borderRadius="xl">
                <VStack px={12}>
                  <Wrap mt={5}>
                    <WrapItem>
                      <Avatar
                        size="2xl"
                        name="Segun Adebayo"
                        src="https://bit.ly/sage-adebayo"
                      />{" "}
                    </WrapItem>
                  </Wrap>
                  <Text fontWeight="semibold" pt={2}>
                    Nicholas Lam Jye Yi @ Oo{" "}
                  </Text>
                  <Text fontSize="sm">Joined on Mar 2020</Text>
                  <Text fontSize="sm" pb={5}>
                    {session?.user.email}
                  </Text>
                  <Button w="full">
                    <CalendarIcon />
                    &nbsp;Bookings
                  </Button>
                  <Button w="full">
                    <AttachmentIcon />
                    &nbsp;Promotions
                  </Button>
                  <Button w="full">
                    <AtSignIcon />
                    &nbsp;Credits
                  </Button>
                  <Button w="full">
                    <StarIcon />
                    &nbsp;Reviews
                  </Button>
                  <Button w="full">
                    <ChatIcon />
                    &nbsp;Gift cards
                  </Button>

                  <Box py={2}></Box>
                </VStack>
              </Box>
            </Container>
            {/* TODO: Add view booking method */}
            <Container></Container>
            <Container>
              Box
              <Box my="20">Hello</Box>
            </Container>
          </HStack>
        </Container>
        <Footer />
      </MainContent>
    </div>
  );
};

// export async function getStaticProps() {
//     var datas = { userId: "c2d29867-3d0b-d497-9191-18a9d8ee7830" };

//     const { data } = await gqlclient.query({
//         query: gql`
//       query GetUser($datas: GetUserRequest) {
//         GetUser(data: $datas) {
//           userId
//           email
//         }
//       }
//     `,
//         variables: { datas },
//     });
//     try {
//         return {
//             props: {
//                 launches: data,
//             },
//         };
//     } catch (e) {
//         console.log("Error in subscription:", e);
//     }
// }

export default Home;
