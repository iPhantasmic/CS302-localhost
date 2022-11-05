// @ts-nocheck
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  WrapItem,
  Text,
  Spacer,
  Icon,
  Divider,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useNumberInput,
} from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";
import Logo from "./../public/localhost.png";
import LogoDark from "./../public/localhost_dark.png";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { BsGlobe2 } from "react-icons/bs";
import {
  CalendarIcon,
  HamburgerIcon,
  InfoOutlineIcon,
  PhoneIcon,
  Search2Icon,
  SettingsIcon,
  StarIcon,
  UnlockIcon,
} from "@chakra-ui/icons";
import { DateRangePicker, Range } from "react-date-range";
import { signOut, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useState, useRef } from "react";

export function Navbar(props: any) {
  const rooms: any = useRef<HTMLInputElement>();
  const destination: any = useRef<HTMLInputElement>();
  const startDate: any = useRef<HTMLInputElement>();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 20,
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const router = useRouter();

  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <>
      <Box pb={{ base: "12", md: "20" }}>
        <Box
          as="nav"
          boxShadow={useColorModeValue("sm", "sm-dark")}
          position="fixed"
          zIndex="2"
          w="100%"
          bg={useColorModeValue("white", "black")}
        >
          <Container
            maxW={props.main == true ? "container.xl" : "container.xl"}
            py="3"
            px="7"
          >
            <Flex>
              <Box width="30%" py="2">
                <Image
                  style={{ cursor: "pointer" }}
                  onClick={() => Router.push("/")}
                  src={useColorModeValue(Logo, LogoDark)}
                  height="31px"
                  width="156.75px"
                />
              </Box>
              <Spacer />
              <Center
                display={props.simple ? "none" : ""}
                maxW="xs"
                my="1"
                py="1.5"
                onClick={onOpen}
                borderRadius="full"
                px="5"
                boxShadow="md"
                width="30%"
                border="1px"
                borderColor="gray.200"
              >
                <Flex flex="auto" alignItems="center">
                  <Text fontSize="14px" fontWeight="semibold">
                    Start your search
                  </Text>
                  <Spacer />
                  <IconButton
                    aria-label="Search listings"
                    icon={<Search2Icon />}
                    size="sm"
                    colorScheme="linkedin"
                    borderRadius="full"
                    right="-2"
                  />
                </Flex>
              </Center>
              <Spacer />
              <Box width="30%" display={props.extrasimple ? "none" : ""}>
                <HStack spacing="1" py="2">
                  <Flex justify="space-between" flex="1" />
                  <Button
                    variant="ghost"
                    borderRadius="full"
                    letterSpacing={0.1}
                    fontSize="14px"
                  >
                    <Link href="/host">
                      {session == null ? "Become a host" : "Switch to host"}
                    </Link>
                  </Button>
                  {/* <DarkModeToggle /> */}
                  <IconButton
                    icon={<BsGlobe2 />}
                    variant="ghost"
                    borderRadius="full"
                    aria-label="lang"
                  />
                  {session == null ? (
                    <>
                      <Button variant="ghost" fontSize="sm">
                        <Link href="/auth/signin">Sign In</Link>
                      </Button>
                      <Button variant="ghost" fontSize="sm">
                        <Link href="/auth/signup">Sign Up</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Menu zIndex="9">
                        <MenuButton
                          borderRadius="full"
                          boxShadow="sm"
                          px={3}
                          py={1}
                        >
                          <WrapItem>
                            <HamburgerIcon alignSelf="center" mr={3} />
                            <Avatar
                              size="sm"
                              name="Kent Dodds"
                              src="https://bit.ly/kent-c-dodds"
                            />{" "}
                          </WrapItem>
                        </MenuButton>
                        <MenuList zIndex="9">
                          <MenuItem
                            zIndex="9"
                            onClick={() =>
                              Router.push("/user/" + session.userId)
                            }
                          >
                            <CalendarIcon ml={1} mr={3} />
                            Bookings
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              Router.push("/user/" + session.userId)
                            }
                          >
                            <InfoOutlineIcon ml={1} mr={3} />
                            Profile
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              Router.push("/user/" + session.userId)
                            }
                          >
                            <SettingsIcon ml={1} mr={3} />
                            Setting
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              Router.push("/user/" + session.userId)
                            }
                          >
                            <StarIcon ml={1} mr={3} />
                            Wishlist
                          </MenuItem>
                          <MenuDivider />
                          <MenuItem
                            textColor="red"
                            fontWeight="semibold"
                            onClick={() => signOut()}
                          >
                            <UnlockIcon color="red" ml={1} mr={3} />
                            Sign out
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </>
                  )}
                </HStack>
              </Box>
            </Flex>
          </Container>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent p={5}>
          <ModalHeader>Search listings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Where</Text>
            <Input
              mb={5}
              placeholder="Search destination (e.g. City, Country)"
              defaultValue={router.query.country}
              ref={destination}
            />
            <Text mb={2}>Rooms</Text>
            <HStack maxW="320px" mb={5}>
              <Button {...dec}>-</Button>
              <Input {...input} w={16} ref={rooms} />
              <Button {...inc}>+</Button>
            </HStack>
            <Text mb={2}>When</Text>
            <DateRangePicker
              editableDateInputs={true}
              onChange={(item) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
              ref={startDate}
            />
          </ModalBody>
          <Button
            onClick={() => {
              onClose();
              Router.push({
                pathname: "/",
                query: {
                  country:
                    destination.current.value.split(",")[1] !== undefined
                      ? destination.current.value.split(",")[1].trim()
                      : destination.current.value.trim(),
                  rooms: rooms.current.value !== 0 ? rooms.current.value : "",
                },
              });
            }}
          >
            View listings
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
}
