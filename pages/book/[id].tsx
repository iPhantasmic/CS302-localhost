// @ts-nocheck
import { StarIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useEffect, useState } from "react";
import MainContent from "../../components/MainContent";
import Router, { useRouter } from "next/router";
import gqlclient from "../../GraphQL/graphQLClient";
import { gql } from "@apollo/client";
import { useSession } from "next-auth/react";
import CheckoutForm from "../../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const images = [
  "https://a0.muscache.com/im/pictures/0720332d-b410-4c85-b09d-78fb36240a43.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-36880172/original/4aac5067-4642-4148-9ba9-7476c6920c90.jpeg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-725604930974176592/original/66e8746e-9f09-4564-9e9c-5756fc572063.jpeg",
  "https://a0.muscache.com/im/pictures/fe109afa-a36b-4082-b047-c8f4f36f18b2.jpg",
  "https://a0.muscache.com/im/pictures/db193878-c602-4a93-88ee-9b3f1ebfe7f1.jpg",
  "https://a0.muscache.com/im/pictures/9ee15529-6596-4b96-95e5-06777bfed126.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-620445832431796074/original/822e6e0a-6209-43e4-b84d-78cbcbeab16d.jpeg",
  "https://a0.muscache.com/im/pictures/6d441896-6497-41d7-b210-58b2d88e4c5c.jpg",
  "https://a0.muscache.com/im/pictures/7fde1672-2160-4593-90cd-00bd75da732a.jpg",
  "https://a0.muscache.com/im/pictures/eb49f6ab-8a2c-4f4a-9fcf-ec319efce8f3.jpg",
  "https://a0.muscache.com/im/pictures/d9bc142c-6028-4d50-a884-a752e5a79490.jpg",
  "https://a0.muscache.com/im/pictures/1b25a065-915d-44a9-ac8f-a0cf4148a3cd.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-32792828/original/8b971f6c-c322-4825-8e51-475be52f0c10.jpeg",
  "https://a0.muscache.com/im/pictures/27488332/f88eaa05_original.jpg",
  "https://a0.muscache.com/im/pictures/abc48799-5ee0-4174-a083-81db21034901.jpg",
  "https://a0.muscache.com/im/pictures/a3e41a30-dc6a-4cd8-9941-e8ec106b179f.jpg",
  "https://a0.muscache.com/im/pictures/1f4dd361-b2a3-4a83-abd1-115bf2e0b6cb.jpg",
  "https://a0.muscache.com/im/pictures/0be2dee2-aab6-41f9-9b37-52de039c5ce0.jpg",
  "https://a0.muscache.com/im/pictures/d3eeb76d-6d68-46e4-af80-7f4333fc4454.jpg",
  "https://a0.muscache.com/im/pictures/d0ca15e5-87bc-4912-bbc0-6c564e42afc7.jpg",
  "https://a0.muscache.com/im/pictures/monet/Luxury-674133747208887029/original/408943d0-6b8e-4078-8b04-015a01555bba",
  "https://a0.muscache.com/im/pictures/03b6cb80-e1a3-43c6-8a7a-a04e7205caa5.jpg",
  "https://a0.muscache.com/im/pictures/c79965b5-9b22-4504-af7b-3131f5c25dfa.jpg",
  "https://a0.muscache.com/im/pictures/aab9bec6-8626-47a0-8718-7d8cc131da48.jpg",
  "https://a0.muscache.com/im/pictures/b0dc5f70-dd17-4c94-8f71-28faab509e82.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-43646082/original/3a635420-cfaf-413a-8d02-d09da4bf107a.jpeg",
  "https://a0.muscache.com/im/pictures/9a62c114-277a-4fd4-a96e-a2274acf6a5c.jpg",
  "https://a0.muscache.com/im/pictures/8db6ed20-fc30-4f7e-ae90-3f860874158b.jpg",
  "https://a0.muscache.com/im/pictures/be5ec43d-245a-4c09-9bb7-a5e1b8eb56b3.jpg",
  "https://a0.muscache.com/im/pictures/7809096f-55f0-47c9-b0be-75bbaeec2122.jpg",
  "https://a0.muscache.com/im/pictures/dddca0c6-6324-4e3e-bcee-6dfce9500975.jpg",
  "https://a0.muscache.com/im/pictures/968e8541-eb21-4a38-9402-259691ada4ad.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-29896604/original/f775826b-3618-46b4-9bdb-eb1c0a437de7.jpeg",
  "https://a0.muscache.com/im/pictures/554d0bc3-adb0-4fef-8b59-760e85626610.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-42637728/original/f7bfd23a-2b60-49a0-a6fb-5680eccf1ba1.jpeg",
  "https://a0.muscache.com/im/pictures/fb860347-88b9-4a1a-acfe-d518f3f77072.jpg",
];

const Listing: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [listing, setListing] = useState({});
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      Router.push("/auth/signin");
    },
  });

  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    // TODO: Fetch publishablekey and paymentintent.clientsecret from server
    // fetch("/config").then(async (r) => {
    //     const { publishableKey } = await r.json()
    //     setStripePromise(loadStripe(publishableKey))
    // })

    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({
        // TODO: Add amount and currency based on calculations
        currency: "sgd",
        amount: 1999,
        automatic_payment_methods: {
          enabled: true,
        },
      }),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      setClientSecret(clientSecret);
    });

    var data = { listingId: router.query.id };
    gqlclient
      .query({
        query: gql`
          query GetListing($data: GetListingRequest) {
            GetListing(data: $data) {
              listingId
              userId
              title
              price
              images
              type
              address
              country
              city
              rooms
              startDate {
                nanos
                seconds
              }
              createdAt {
                nanos
                seconds
              }
            }
          }
        `,
        variables: { data },
      })
      .then((response) => {
        setListing(response.data.GetListing);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Localhost - Rent safely</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar main simple />

      <MainContent>
        <Container maxW="container.xl" px={8} pt={5}>
          <Grid templateColumns="repeat(6, 1fr)" gap={1} mt={10} mb={80}>
            <GridItem colSpan={3} h="10" mr={8}>
              <HStack>
                <IconButton
                  aria-label="Search database"
                  icon={<ChevronLeftIcon />}
                  variant="ghost"
                  borderRadius="full"
                  ml="-3"
                />
                <Heading fontWeight="semibold" ml="2" letterSpacing="tight">
                  Confirm and pay
                </Heading>
              </HStack>
              <Box
                mt={12}
                border="1px"
                borderColor="gray.200"
                borderRadius="xl"
                px={5}
                py={5}
                maxW="450"
              >
                <Flex px={2}>
                  <Box>
                    <Text fontWeight="semibold" fontSize="sm">
                      This is a rare find.
                    </Text>
                    <Text>
                      Wayan&apos;s place on Airbnb is usually fully booked.
                    </Text>
                  </Box>
                  <Spacer />
                  <svg
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                      marginLeft: "15px",
                      display: "block",
                      height: "32px",
                      width: "32px",
                      fill: "rgb(227, 28, 95)",
                      stroke: "currentcolor",
                    }}
                  >
                    <g stroke="none">
                      <path
                        d="m32.62 6 9.526 11.114-18.146 23.921-18.147-23.921 9.526-11.114z"
                        fillOpacity=".2"
                      ></path>
                      <path d="m34.4599349 2 12.8243129 14.9616983-23.2842478 30.6928721-23.28424779-30.6928721 12.82431289-14.9616983zm-17.9171827 16h-12.52799999l18.25899999 24.069zm27.441 0h-12.528l-5.73 24.069zm-14.583 0h-10.802l5.4012478 22.684zm-15.92-12.86-9.30799999 10.86h11.89399999zm19.253-1.141h-17.468l2.857 12.001h11.754zm1.784 1.141-2.586 10.86h11.894z"></path>
                    </g>
                  </svg>
                </Flex>
              </Box>

              <Heading
                size="lg"
                fontWeight="semibold"
                mt={7}
                letterSpacing="tight"
              >
                Your trip
              </Heading>
              <Flex mt={7}>
                <Box>
                  <Text fontWeight="semibold">Dates</Text>
                  <Text>
                    {router.query.startDate + " - " + router.query.endDate}
                  </Text>
                </Box>
                <Spacer />
                <Box>
                  <Text fontWeight="semibold">Edit</Text>
                </Box>
              </Flex>
              <Flex mt={7}>
                <Box>
                  <Text fontWeight="semibold">Guests</Text>
                  <Text>1 guest</Text>
                </Box>
                <Spacer />
                <Box>
                  <Text fontWeight="semibold">Edit</Text>
                </Box>
              </Flex>
              <Divider my={10} />
              <Heading
                size="lg"
                fontWeight="semibold"
                mt={7}
                letterSpacing="tight"
              >
                Choose how to pay
              </Heading>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            </GridItem>
            <GridItem colStart={4} colEnd={7} h="10" mb={80}>
              <Box
                border="1px"
                borderColor="gray.200"
                borderRadius="xl"
                width="400"
                height="fit-content"
                p={8}
              >
                <HStack>
                  <Image
                    src={images[router.query.fallback]}
                    alt="Hello world"
                    objectFit="cover"
                    width={150}
                    height={120}
                    style={{ borderRadius: "10px" }}
                  />
                  <Box maxW="60%" pl={2}>
                    <Flex flexDirection="column">
                      <Text fontWeight="light" fontSize="xs">
                        Entire Villa
                      </Text>
                      <Text
                        fontWeight="normal"
                        fontSize="md"
                        lineHeight={0.9}
                        letterSpacing="tight"
                      >
                        {"Aura House Eco Bamboo House, " +
                          listing.city +
                          ", " +
                          listing.country}
                      </Text>
                      <Spacer my={2} />
                      <HStack>
                        <StarIcon color="black.500" boxSize={3} />
                        <Text fontSize="sm">4.88 ·</Text>
                        <Text fontSize="sm">155 reviews</Text>
                      </HStack>
                    </Flex>
                  </Box>
                </HStack>
                <Divider my={6} />
                <Text letterSpacing="tight" fontSize="lg">
                  Your booking is protected by &nbsp;
                  <Image
                    src="https://a0.muscache.com/pictures/aircover/aircover-logo/original/56683a2f-f11b-43f6-8af7-a1b3861b2c85.svg"
                    width={60}
                    height={15}
                  />
                </Text>
                <Divider my={6} />
                <Heading
                  size="md"
                  fontWeight="semibold"
                  mt={7}
                  letterSpacing="tight"
                >
                  Price Details
                </Heading>
                <Flex mt={5}>
                  <Text fontSize="md" letterSpacing="tight">
                    $506.70 SGD x 7 nights
                  </Text>
                  <Spacer />
                  <Text fontSize="md" letterSpacing="tight">
                    $3,551.00 SGD
                  </Text>
                </Flex>
                <Flex mt={2}>
                  <Text fontSize="md" letterSpacing="tight">
                    Service fee
                  </Text>
                  <Spacer />
                  <Text fontSize="md" letterSpacing="tight">
                    $0.00 SGD
                  </Text>
                </Flex>
                <Divider py={2} />
                <Flex mt={5}>
                  <Text
                    fontSize="md"
                    letterSpacing="tight"
                    fontWeight="semibold"
                  >
                    Total (SGD)
                  </Text>
                  <Spacer />
                  <Text fontSize="md" letterSpacing="normal" fontWeight="bold">
                    $3,551.00
                  </Text>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </MainContent>
      <Footer />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent p={5}>
          <DateRangePicker
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
          <Button onClick={onClose}>Close</Button>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Listing;
