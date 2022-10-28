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
} from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";
import Logo from "./../public/localhost.png";
import LogoDark from "./../public/localhost_dark.png";
import type { NextPage } from "next";
import DarkModeToggle from "./DarkModeToggle";
import { BsGlobe2 } from "react-icons/bs";
import { HamburgerIcon, PhoneIcon, Search2Icon } from "@chakra-ui/icons";

export function Navbar(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box pb={{ base: "12", md: "24" }}>
        <Box
          as="nav"
          boxShadow={useColorModeValue("sm", "sm-dark")}
          position="fixed"
          zIndex="1"
          w="100%"
          bg={useColorModeValue("white", "black")}
        >
          <Container
            maxW={props.main == true ? "container.2xl" : "container.xl"}
            py="3"
            px="7"
          >
            <Flex>
              <Box width="25%" py="2">
                <Image
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
                  {/* <Text fontSize="13.5px" fontWeight="semibold">
                    Anywhere
                  </Text>
                  <Spacer />
                  <Divider orientation="vertical" height="1px" py={4} />
                  <Spacer />
                  <Text fontSize="13.5px" fontWeight="semibold">
                    Any week
                  </Text>
                  <Spacer />
                  <Divider orientation="vertical" height="1px" py={4} />
                  <Spacer />
                  <Text fontSize="13.5px">Guests</Text> */}
                  <Spacer />
                  <IconButton
                    aria-label="Search listings"
                    icon={<Search2Icon />}
                    size="sm"
                    colorScheme="blue"
                    borderRadius="full"
                    right="-2"
                  />
                </Flex>
              </Center>
              <Spacer />
              <Box width="25%" display={props.simple ? "none" : ""}>
                <HStack spacing="1" py="2">
                  <Flex justify="space-between" flex="1" />
                  <Button
                    variant="ghost"
                    borderRadius="full"
                    letterSpacing={0.1}
                    fontSize="14px"
                  >
                    Become a host
                  </Button>
                  {/* <DarkModeToggle /> */}
                  <IconButton
                    icon={<BsGlobe2 />}
                    variant="ghost"
                    borderRadius="full"
                    aria-label="lang"
                  />
                  <IconButton
                    variant="ghost"
                    borderRadius="full"
                    aria-label="lang"
                    p={3}
                    boxShadow="sm"
                  >
                    <WrapItem>
                      <HamburgerIcon alignSelf="center" mr={3} />
                      <Avatar
                        size="sm"
                        name="Kent Dodds"
                        src="https://bit.ly/kent-c-dodds"
                      />{" "}
                    </WrapItem>
                  </IconButton>
                </HStack>
              </Box>
            </Flex>
          </Container>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            The quick brown fox jumped of the lazy brown dogs
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
