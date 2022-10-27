import { Box, Container, HStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Card } from "../components/Card";
import DarkModeToggle from "../components/DarkModeToggle";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import Types from "../components/Types";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Localhost - Rent safely</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main>
        <Container maxW="container.3xl">
          <Types />
          <HStack placeContent="center">
            {[1, 2, 3, 4, 5, 6].map((element) => {
              return <Card key={element} />;
            })}
          </HStack>
          <HStack placeContent="center">
            {[1, 2, 3, 4, 5, 6].map((element) => {
              return <Card key={element} />;
            })}
          </HStack>
          <HStack placeContent="center">
            {[1, 2, 3, 4, 5, 6].map((element) => {
              return <Card key={element} />;
            })}
          </HStack>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
