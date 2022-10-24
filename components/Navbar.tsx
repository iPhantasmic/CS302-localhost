import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";
import Logo from "./../public/localhost.png";
import LogoDark from "./../public/localhost_dark.png";
import DarkModeToggle from "./DarkModeToggle";
import { BsGlobe2 } from "react-icons/bs";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Navbar = () => (
  <Box pb={{ base: "12", md: "24" }}>
    <Box
      as="nav"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      position="fixed"
      zIndex="1"
      w="100%"
      bg={useColorModeValue("white", "black")}
    >
      <Container maxW="container.2xl" py="5" px="10">
        <HStack spacing="2">
          <Image
            src={useColorModeValue(Logo, LogoDark)}
            height="31"
            width="156.75px"
          />
          <Flex justify="space-between" flex="1" />
          <Button variant="ghost" borderRadius="full">
            Become a host
          </Button>
          <DarkModeToggle />
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
              <HamburgerIcon alignSelf="center" mr={2} />
              <Avatar
                size="xs"
                name="Kent Dodds"
                src="https://bit.ly/kent-c-dodds"
              />{" "}
            </WrapItem>
          </IconButton>
        </HStack>
      </Container>
    </Box>
  </Box>
);
