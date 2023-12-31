import { StarIcon, PlusSquareIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Logo from "./../public/localhost.png";
import Jye from "./../public/Jye.jpg";
import Jianwei from "./../public/Jianwei.jpg";
import Justin from "./../public/Justin.jpg";
import Nich from "./../public/Nich.jpg";
import Omer from "./../public/Omer.jpg";
import LogoDark from "./../public/localhost_dark.png";
import MainContent from "../components/MainContent";
import Router from "next/router";

const Failure: NextPage = () => {
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
        <Container maxW="container.2xl" px={8} pt={5}>
          <Center mt={4}>
            <VStack
              border="1px"
              borderColor="gray.200"
              height={500}
              width={1200}
              p={10}
              boxShadow="md"
            >
              <VStack textAlign="center">
                <Heading
                  fontWeight="bold"
                  color="red.500"
                  letterSpacing="tight"
                  width="100%"
                >
                  Error
                </Heading>
                <Text fontSize="lg" letterSpacing="tight" color="red.500">
                  Uh-oh an error has occured - please try again.
                </Text>
              </VStack>
              <Heading fontSize="3xl" fontWeight="bold" color="red.500">
                This cannot be tolerated!{" "}
              </Heading>
              <Heading fontSize="3xl" fontWeight="bold" color="red.500">
                Pick someone to fire 😡🔥😡🔥
              </Heading>
              <Grid templateColumns="repeat(6, 1fr)" pt={10}>
                <GridItem colSpan={1} h="10">
                  <Container>
                    <VStack>
                      <Image
                        src={Nich}
                        height={250}
                        width={250}
                        style={{ borderRadius: "15px" }}
                      />
                      <Button
                        colorScheme="red"
                        onClick={() => Router.push("/")}
                      >
                        Fire Nicholas
                      </Button>
                    </VStack>
                  </Container>
                </GridItem>
                <GridItem colSpan={1} h="10">
                  <Container>
                    <VStack>
                      <Image
                        src={Omer}
                        height={250}
                        width={250}
                        style={{ borderRadius: "15px" }}
                      />
                      <Button
                        colorScheme="red"
                        onClick={() => Router.push("/")}
                      >
                        Fire Omer
                      </Button>
                    </VStack>
                  </Container>
                </GridItem>
                <GridItem colSpan={1} h="10">
                  <Container>
                    <VStack>
                      <Image
                        src={Jye}
                        height={250}
                        width={250}
                        style={{ borderRadius: "15px" }}
                      />
                      <Button
                        colorScheme="red"
                        onClick={() => Router.push("/")}
                      >
                        Fire Jye Yi
                      </Button>
                    </VStack>
                  </Container>
                </GridItem>
                <GridItem colSpan={1} h="10">
                  <Container>
                    <VStack>
                      <Image
                        src="https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13086308_RXL1_20220207.jpg"
                        height={250}
                        width={250}
                      />
                      <Button
                        colorScheme="red"
                        onClick={() => Router.push("/")}
                      >
                        Fire Jasmine
                      </Button>
                    </VStack>
                  </Container>
                </GridItem>
                <GridItem colSpan={1} h="10">
                  <Container>
                    <VStack>
                      <Image
                        src={Justin}
                        height={250}
                        width={250}
                        style={{ borderRadius: "15px" }}
                      />
                      <Button
                        colorScheme="red"
                        onClick={() => Router.push("/")}
                      >
                        Fire Justin
                      </Button>
                    </VStack>
                  </Container>
                </GridItem>
                <GridItem colSpan={1} h="10">
                  <Container>
                    <VStack>
                      <Image
                        src={Jianwei}
                        height={250}
                        width={250}
                        style={{ borderRadius: "15px" }}
                      />
                      <Button
                        colorScheme="red"
                        onClick={() => Router.push("/")}
                      >
                        Fire Jian Wei
                      </Button>
                    </VStack>
                  </Container>
                </GridItem>
              </Grid>
            </VStack>
          </Center>
        </Container>
      </MainContent>
      <Footer />
    </div>
  );
};

export default Failure;
