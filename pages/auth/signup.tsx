import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Footer from "../../components/Footer";
import { gql } from "@apollo/client";
import gqlclient from "../../GraphQL/graphQLClient";
import { MouseEventHandler, useRef } from "react";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Signup: NextPage = (query_data) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      console.log("warning");
    },
  });

  function handleSubmit() {}

  const email: any = useRef<HTMLInputElement>();
  const password: any = useRef<HTMLInputElement>();
  const handleLogin: MouseEventHandler<HTMLButtonElement> = async (e: any) => {
    if (email.current.value && password.current.value) {
      console.log(email.current.value);
      console.log(password.current.value);

      const res = await signIn("credential", {
        email: email.current.value,
        password: password.current.value,
        redirect: false,
      });

      console.log(res);
    }
  };

  return (
    <>
      <Container maxW="100%" display="inline-block" p={0} overflow="hidden">
        <Container
          borderRadius="none"
          height="99.3vh"
          maxW="50%"
          float="left"
          px={0}
          mx={0}
          backgroundImage={
            "https://images.pexels.com/photos/2762673/pexels-photo-2762673.jpeg"
          }
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
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
                Join Localhost
              </Heading>
            </Box>
            <Box>
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
                  w={350}
                  mt={6}
                  mb={8}
                  ref={password}
                />
              </FormControl>
              <Button mb={5} w="full" onClick={(e) => handleLogin(e)}>
                Sign up
              </Button>
            </Box>
            <Box px={24}>
              <Divider />
              <Text alignSelf="start" mt={5}>
                Already have an account?{" "}
                <u>
                  <Link href="/auth/signin">Sign in</Link>
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
      <Footer />
    </>
  );
};

export async function Register() {
  var datas = {
    email: null,
    password: null,
  };

  const { data } = await gqlclient.query({
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

  return {
    props: {
      launches: data,
    },
  };
}

export default Signup;
