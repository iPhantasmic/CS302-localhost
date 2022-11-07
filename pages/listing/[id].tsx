// @ts-nocheck
import { StarIcon, PlusSquareIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { IoIosBed, IoIosPeople } from "react-icons/io";
import { MdMeetingRoom } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { useEffect, useState } from "react";
import gqlclient from "../../GraphQL/graphQLClient";
import { gql } from "@apollo/client";
import MainContent from "../../components/MainContent";
import Router, { useRouter } from "next/router";
import { useRef } from "react";
import { start } from "repl";

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

const Listing: NextPage = (props: any) => {
  const startDate: any = useRef<HTMLInputElement>();
  const endDate: any = useRef<HTMLInputElement>();
  const [listing, setListing] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const listingId = router.query.id;

    if (listingId === undefined) {
      console.log("undefined");
      return;
    }

    var data = { listingId: listingId };
    console.log(data);
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
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>Localhost - Rent safely</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <MainContent>
        <Container maxW="container.xl" px={8} pt={5} pb={48}>
          <Heading fontWeight="semibold" fontSize="2xl">
            {"Aura House Eco Bamboo House, " +
              listing.city +
              ", " +
              listing.country}
          </Heading>
          <Flex pt={3} mb={7}>
            <HStack>
              <StarIcon color="black.500" boxSize={3} />
              <Text fontSize="sm">
                {(Math.random() * (5 - 4) + 4).toFixed(2)} ·
              </Text>
              <Text fontSize="sm">
                {Math.floor(Math.random() * (3000 - 20) + 20) + " reviews"} ·
              </Text>
              <Text fontSize="sm">Superhost ·</Text>
              <Text fontSize="sm">{listing.city + ", " + listing.country}</Text>
            </HStack>
            <Spacer />
            <HStack>
              <ExternalLinkIcon color="gray.500" />
              <Text fontSize="sm">Share</Text>
              <Divider orientation="vertical" />
              <PlusSquareIcon color="gray.500" />
              <Text fontSize="sm">Save</Text>
            </HStack>
          </Flex>
          {router.query.fallback ? (
            <Box width="100%" borderLeft="lg">
              <HStack width="100%">
                <Image
                  src={
                    listing.images
                      ? listing.images.toString().replace(/[{}]/g, "")
                      : images[parseInt(router.query.fallback)]
                  }
                  alt="Hello world"
                  objectFit="cover"
                  width={600}
                  height={560}
                  style={{
                    borderTopLeftRadius: "15px",
                    borderBottomLeftRadius: "15px",
                  }}
                />
                <HStack>
                  <VStack>
                    <Image
                      src={
                        router.query.fallback &&
                        images[(parseInt(router.query.fallback) + 1) % 35]
                      }
                      alt="Hello world"
                      objectFit="cover"
                      width={300}
                      height={275}
                    />
                    <Divider />
                    <Image
                      src={
                        router.query.fallback &&
                        images[(parseInt(router.query.fallback) + 2) % 35]
                      }
                      alt="Hello world"
                      objectFit="cover"
                      width={300}
                      height={275}
                    />
                  </VStack>
                  <VStack>
                    <Image
                      src={
                        router.query.fallback &&
                        images[(parseInt(router.query.fallback) + 3) % 35]
                      }
                      alt="Hello world"
                      objectFit="cover"
                      width={300}
                      height={275}
                      style={{ borderTopRightRadius: "15px" }}
                    />
                    <Divider />
                    <Image
                      src={images[(parseInt(router.query.fallback) + 4) % 35]}
                      alt="Hello world"
                      objectFit="cover"
                      width={300}
                      height={275}
                      style={{ borderBottomRightRadius: "15px" }}
                    />
                  </VStack>
                </HStack>
              </HStack>
            </Box>
          ) : (
            <Box width="100%" borderLeft="lg"></Box>
          )}
          <Grid templateColumns="repeat(6, 1fr)" gap={1} mt={10} mb={80}>
            <GridItem colSpan={4} h="10" mr={8}>
              <Flex>
                <VStack alignItems="baseline">
                  <Heading fontWeight="semibold" fontSize="xl" mb={0.5}>
                    Entire villa hosted by Wayan
                  </Heading>
                  <HStack>
                    <IoIosPeople color="gray" />
                    <Text fontSize="sm">{listing.rooms * 2} guests ·</Text>
                    <MdMeetingRoom color="gray" />
                    <Text fontSize="sm">2 bedrooms ·</Text>
                    <IoIosBed color="gray" />
                    <Text fontSize="sm">{listing.rooms * 2} beds ·</Text>
                    <BiBath color="gray" />
                    <Text fontSize="sm">2 bathrooms</Text>
                  </HStack>
                </VStack>
                <Spacer />
                <Avatar
                  size="lg"
                  name="Kent Dodds"
                  src="https://bit.ly/kent-c-dodds"
                />{" "}
              </Flex>
              <Divider my={7} />
              <HStack mb={5}>
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "24px",
                    width: "24px",
                    fill: "black",
                    paddingRight: "5px",
                  }}
                >
                  <path d="m2 4c0-.85216986.98551359-1.29743382 1.62252676-.78322518l.08458002.0761184 25.00000002 24.99999998c.6025751.6025751.2205609 1.6142876-.5934759 1.7011235l-.1136309.0059833h-25c-.51283584 0-.93550716-.3860402-.99327227-.8833789l-.00672773-.1166211zm2 2.415v21.585h21.585l-4.085-4.086-1.7928932 1.7931068-1.4142136-1.4142136 1.7921068-1.7938932-2.585-2.585-1.7928932 1.7931068-1.4142136-1.4142136 1.7921068-1.7938932-2.585-2.585-1.7928932 1.7931068-1.4142136-1.4142136 1.7921068-1.7938932-2.585-2.585-1.79289322 1.7931068-1.41421356-1.4142136 1.79210678-1.7938932zm3 10.585c0-.8521699.98551359-1.2974338 1.62252676-.7832252l.08458002.0761184 7.00000002 7c.6025751.6025751.2205609 1.6142876-.5934759 1.7011235l-.1136309.0059833h-7c-.51283584 0-.93550716-.3860402-.99327227-.8833789l-.00672773-.1166211zm5.2928932-15.20710678c.360484-.36048396.927715-.3882135 1.3200062-.08318861l.0942074.08318861 15.5 15.49999998c.0578584.0578584.1082864.1224881.1502461.1923778l.0564586.1085905 2 4.5c.3320921.7472072-.3209586 1.5376556-1.0949471 1.3900057l-.1062123-.0260409-5-1.5c-.1188824-.0356647-.2297327-.0930392-.3270948-.1688646l-.0926641-.0818549-15.49999998-15.50000002c-.36048396-.36048396-.3882135-.92771502-.08318861-1.32000622l.08318861-.09420734zm-3.2928932 17.62210678v3.585h3.585zm7.25-12.251-1.585 1.585 11.365 11.366 2.672.801-1.04-2.339zm-3.25-3.249-1.585 1.585 1.835 1.834 1.585-1.585z"></path>
                </svg>
                <VStack alignItems="baseline">
                  <Heading fontWeight="semibold" fontSize="md">
                    Design by
                  </Heading>
                  <Text fontSize="sm">
                    Ibuku Bamboo Architecture and Design
                  </Text>
                </VStack>
              </HStack>
              <HStack mb={5}>
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "24px",
                    width: "24px",
                    fill: "black",
                    paddingRight: "5px",
                  }}
                >
                  <path d="m1.66675 2.67728c0-1.29010774 1.19757945-2.22892485 2.43214873-1.95293212l.14254843.03728562 11.76455284 3.5293665 11.7747926-3.3852093c1.1836744-.3403064 2.3638086.45712676 2.5321485 1.63303369l.0152796.14287691.0051793.1462187v23.09468c0 .8279727-.5091718 1.5640524-1.2698418 1.8619846l-.155411.0536419-12.6207 3.7862c-.1499506.0449851-.3078242.0539821-.4609439.026991l-.1137505-.026991-12.62071315-3.786204c-.79308169-.2379357-1.35183119-.937138-1.41857691-1.7513494l-.00671274-.1642731zm1.99999664.00000464v23.24528886l12.33325336 3.6994265 12.3334-3.6994076v-23.0946724l-12.0569924 3.46639925c-.1474472.0423911-.3021582.05014891-.4521925.02334213l-.1114623-.02658488zm21.66607876 17.47821536v2.088l-9.333 2.8v-2.087zm0-6v2.088l-9.333 2.8v-2.087zm0-5.999v2.087l-9.333 2.8v-2.087z"></path>
                </svg>
                <VStack alignItems="baseline">
                  <Heading fontWeight="semibold" fontSize="md">
                    Featured in
                  </Heading>
                  <Text fontSize="sm">Condé Nast Traveler, October 2019</Text>
                </VStack>
              </HStack>
              <HStack mb={5}>
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "24px",
                    width: "24px",
                    fill: "black",
                    paddingRight: "5px",
                  }}
                >
                  <path d="m11.6667 0-.00095 1.666h8.667l.00055-1.666h2l-.00055 1.666 6.00065.00063c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323v15.91907c0 .4715696-.1664445.9258658-.4669028 1.2844692l-.1188904.1298308-8.7476886 8.7476953c-.3334303.3332526-.7723097.5367561-1.2381975.5778649l-.1758207.0077398h-12.91915c-2.68874373 0-4.88181754-2.1223321-4.99538046-4.7831124l-.00461954-.2168876v-21.66668c0-1.05436021.81587582-1.91815587 1.85073739-1.99450431l.14926261-.00548569 5.999-.00063.00095-1.666zm16.66605 11.666h-24.666v13.6673c0 1.5976581 1.24893332 2.9036593 2.82372864 2.9949072l.17627136.0050928 10.999-.0003.00095-5.6664c0-2.6887355 2.122362-4.8818171 4.7832071-4.9953804l.2168929-.0046196 5.66595-.0006zm-.081 8-5.58495.0006c-1.5977285 0-2.9037573 1.2489454-2.9950071 2.8237299l-.0050929.1762701-.00095 5.5864zm-18.586-16-5.999.00062v5.99938h24.666l.00065-5.99938-6.00065-.00062.00055 1.66733h-2l-.00055-1.66733h-8.667l.00095 1.66733h-2z"></path>
                </svg>
                <VStack alignItems="baseline">
                  <Heading fontWeight="semibold" fontSize="md">
                    Free cancellation before 11 Aug
                  </Heading>
                </VStack>
              </HStack>
              <Divider my={7} />
              <Text>
                Aura house is a beautiful & unique eco bamboo house built on the
                west bank of the River Ayung facing east to catch sunrise. Aura
                House is situated 25min away from Ubud, and 35min away from
                Canggu. IF WE ARE FULLY BOOKED, PLEASE CHECK OUR AIRBNB PROFILE
                (CLICK ON OUR PROFILE PICTURE) TO FIND 10 MORE BEAUTIFUL BAMBOO
                HOUSES, ALL BASED IN THE SAME AREA The space Aura House is
                perched on top of the Ayung river offering a beautiful view. It
                features 2 very romantic en-suite bedrooms, a large living room
                fully furnished, a small kitchen, and a private swimming pool
                with view. It is the perfect gateway for adventurous couples and
                honeymoon. The whole house is private - it is just for you and
                your guests, We are very proud to have in Aura House one of the
                famous egg shaped door built by the designer company Ibuku. It
                is the entrance of the second bedroom. The atmosphere of Aura
                House is perfect for people looking to disconnect from their
                busy city life and/or nature enthusiasts. Be ready to be awaken
                by the sun peeking up into your room and the sounds of the river
                down below. IF WE ARE FULLY BOOKED, PLEASE CHECK OUR AIRBNB
                PROFILE (CLICK ON OUR PROFILE PICTURE) TO FIND 10 MORE BEAUTIFUL
                BAMBOO HOUSES, ALL BASED IN THE SAME AREA Guest access Guests
                may also access our communal space, which includes a natural
                pool, bamboo pavilion for dining, and our communal kitchen
                restaurant where guests may order order breakfast, lunch,
                snacks, drinks and dinner from a selection of local traditional
                Balinese and Indonesian favorites and Western cuisine options.
                Guests may choose to eat in our communal dining space or we can
                deliver meals to your accommodation.
              </Text>
            </GridItem>
            <GridItem colStart={5} colEnd={7} h="10" mb={80}>
              <Box
                boxShadow="lg"
                width="400"
                height={500}
                borderRadius="xl"
                p={8}
              >
                <Heading fontWeight="bold" fontSize="2xl" mb={0.5}>
                  ${listing.price} SGD
                  <Text as="span" fontWeight="light" fontSize="lg">
                    {" "}
                    / night
                  </Text>
                </Heading>
                <HStack>
                  <StarIcon color="black.500" boxSize={3} />
                  <Text fontSize="sm">
                    {(Math.random() * (5 - 4) + 4).toFixed(2)} ·
                  </Text>
                  <Text fontSize="sm">
                    {Math.floor(Math.random() * (3000 - 20) + 20) + " reviews"}
                  </Text>
                </HStack>
                <HStack my={5}>
                  <VStack alignItems="start">
                    <FormLabel mb={0}>Check-in</FormLabel>
                    <Input
                      mt={0}
                      onClick={onOpen}
                      ref={startDate}
                      value={
                        state[0].startDate !== undefined
                          ? String(state[0].startDate.getDate()) +
                            "/" +
                            String(state[0].startDate.getMonth() + 1) +
                            "/" +
                            String(state[0].startDate.getFullYear())
                          : "00/00/0000"
                      }
                    />
                  </VStack>
                  <VStack alignItems="start">
                    <FormLabel mb={0}>Check-out</FormLabel>
                    <Input
                      ref={endDate}
                      mt={0}
                      onClick={onOpen}
                      value={
                        state[0].endDate !== undefined
                          ? String(state[0].endDate.getDate()) +
                            "/" +
                            String(state[0].endDate.getMonth() + 1) +
                            "/" +
                            String(state[0].endDate.getFullYear())
                          : "00/00/0000"
                      }
                    />
                  </VStack>
                </HStack>
                <VStack>
                  <Button
                    width="100%"
                    colorScheme="linkedin"
                    onClick={() =>
                      Router.push({
                        pathname: "/book/" + listing.listingId,
                        query: {
                          fallback: router.query.fallback,
                          startDate:
                            state[0].startDate?.toLocaleString("en-US"),
                          endDate: state[0].endDate?.toLocaleString("en-US"),
                        },
                      })
                    }
                  >
                    Reserve
                  </Button>
                  <Text fontSize="sm">You won&apos;t be charged yet</Text>
                </VStack>
                <Flex mt={5}>
                  <Text fontSize="sm">
                    ${listing.price} SGD x{" "}
                    {Math.ceil(
                      (state[0].endDate - state[0].startDate) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    nights
                  </Text>
                  <Spacer />
                  <Text fontSize="sm">
                    $
                    {listing.price *
                      Math.ceil(
                        (state[0].endDate - state[0].startDate) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                    SGD
                  </Text>
                </Flex>
                <Flex>
                  <Text fontSize="sm">Service fee</Text>
                  <Spacer />
                  <Text fontSize="sm">$20 SGD</Text>
                </Flex>
                <Divider py={2} />
                <Flex mt={5}>
                  <Text fontSize="sm" fontWeight="semibold">
                    Total before taxes
                  </Text>
                  <Spacer />
                  <Text fontSize="sm">
                    $
                    {listing.price *
                      Math.ceil(
                        (state[0].endDate - state[0].startDate) /
                          (1000 * 60 * 60 * 24)
                      ) +
                      20}{" "}
                    SGD
                  </Text>
                </Flex>
              </Box>
              <Box
                border="1px"
                borderColor="gray.200"
                borderRadius="xl"
                p={8}
                mt={5}
              >
                <HStack>
                  <Text fontWeight="semibold" fontSize="sm">
                    This is a rare find. Wayan&apos;s place on Airbnb is usually
                    fully booked.
                  </Text>
                  <svg
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                      marginLeft: "30px",
                      display: "block",
                      height: "60px",
                      width: "60px",
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
                </HStack>
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
    </>
  );
};

export default Listing;
