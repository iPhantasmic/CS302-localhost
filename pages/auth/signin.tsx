import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  Heading,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Footer from "../../components/Footer";
import { useRef } from "react";
import {
  signIn,
  getSession,
  getProviders,
  getCsrfToken,
  useSession,
} from "next-auth/react";
import { MouseEventHandler } from "react";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import MainContent from "../../components/MainContent";

// interface Props { }

export default function SignIn() {
  const email: any = useRef<HTMLInputElement>();
  const password: any = useRef<HTMLInputElement>();
  const handleLogin = async () => {
    // e.preventDefault()
    if (email.current.value && password.current.value) {
      const res = await signIn("credentials", {
        email: email.current.value,
        password: password.current.value,
        csrfToken: getCsrfToken(),
        callbackUrl: "/",
      });

      console.log(res);
    }
  };

  return (
    <MainContent>
      <Container maxW="100%" display="inline-block" p={0} overflow="hidden">
        <Container
          borderRadius="none"
          height="99.3vh"
          maxW="50%"
          float="left"
          px={0}
          mx={0}
          backgroundImage={
            "https://images.pexels.com/photos/2218344/pexels-photo-2218344.jpeg"
          }
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        >
          <Button
            ml={5}
            mt={5}
            boxShadow="dark-lg"
            bgColor={useColorModeValue("white", "black")}
          >
            <Text fontSize="sm">
              <ArrowBackIcon />
              <Link href="/"> Go back</Link>
            </Text>
          </Button>
        </Container>
        <Center height="99vh">
          <VStack padding={70}>
            <Box px={5} mb={5}>
              <Heading as="h1" size="xl" alignSelf="start">
                Welcome to Localhost 👋
              </Heading>
            </Box>
            <Box px={20}>
              <FormControl isRequired>
                <Input
                  variant="flushed"
                  placeholder="Email address"
                  type="email"
                  mt={4}
                  w={350}
                  ref={email}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  variant="flushed"
                  placeholder="Password"
                  type="password"
                  mt={6}
                  w={350}
                  mb={8}
                  ref={password}
                  onKeyDown={(e) => (e.key === "Enter" ? handleLogin() : null)}
                />
              </FormControl>
              <Button mb={5} w="full" onClick={(e) => handleLogin()}>
                Sign in
              </Button>
            </Box>
            <Box px={24}>
              <Divider />
              <Text alignSelf="start" mt={5}>
                Don&apos;t have an account yet?{" "}
                <u>
                  <Link href="/auth/signup">Sign up</Link>
                </u>
              </Text>
              <Text alignSelf="start" fontSize="xs" mt={2}>
                We&apos;ll call or text you to confirm your number. Standard
                message and data rates apply. <u>Privacy Policy</u>
              </Text>
            </Box>
          </VStack>
        </Center>
      </Container>
      <Footer fixed />
    </MainContent>
  );
}
