import {
  Button,
  Center,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  ModalCloseButton,
  ModalHeader,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Card } from "../../components/Card";
import Footer from "../../components/Footer";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import Logo from "./../../public/localhost.png";
import LogoDark from "./../../public/localhost_dark.png";
import MainContent from "../../components/MainContent";

const Success: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div>
      <Head>
        <title>Localhost - Rent safely</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center mt={10}>
        <Image
          src={useColorModeValue(Logo, LogoDark)}
          height="31px"
          width="156.75px"
        />
      </Center>

      <MainContent>
        <Container maxW="container.md" px={8} pt={5}>
          <Center mt={10}>
            <VStack textAlign="center">
              <Heading fontWeight="bold" letterSpacing="tight" width="100%">
                Request Sent
              </Heading>
              <Text fontSize="md" letterSpacing="tight">
                This is not a confirmed booking - at least not yet. You&apos;ll
                get a resopnse within 24 hours.
              </Text>
            </VStack>
          </Center>
          <Divider my={10} />
          <VStack alignItems="start">
            <Heading fontSize="2xl">Apartment - Entire Villa</Heading>
            <Text>Entire villa hosted by Wayan</Text>
          </VStack>
          <Grid templateColumns="repeat(4, 1fr)" gap={1} mt={10}>
            <GridItem colSpan={1} h="10" mr={8}>
              <Text>Check-in</Text>
              <Text fontWeight="semibold">Fri, Dec 16</Text>
            </GridItem>
            <GridItem colSpan={1} h="10" mr={8}></GridItem>
            <GridItem colStart={3} colEnd={4} h="10" mr={8}>
              <Text>Checkout</Text>
              <Text fontWeight="semibold">Mon, Dec 19</Text>
            </GridItem>
          </Grid>
          <Text mt={10}>Guests</Text>
          <Text fontWeight="semibold">1</Text>
          <Divider my={7} />
          <Text letterSpacing="tight">
            You won&apos;t be charged until your booking is confirmed
          </Text>
          <Button mt={5} width="100%" colorScheme="facebook">
            View Your Trips
          </Button>
        </Container>
      </MainContent>
      <Footer />
    </div>
  );
};

export default Success;
