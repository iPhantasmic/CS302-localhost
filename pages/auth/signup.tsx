import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Footer from "../../components/Footer";
import { gql } from "@apollo/client";
import gqlclient from "../../GraphQL/graphQLClient";
import { MouseEventHandler, useRef, useState } from "react";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { subtle } from "crypto";
import Router from "next/router";
import MainContent from "../../components/MainContent";

const Signup: NextPage = (query_data) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      console.log("warning");
    },
  });

  const email: any = useRef<HTMLInputElement>();
  const password: any = useRef<HTMLInputElement>();
  const handleSubmit = async () => {
    if (email.current.value && password.current.value) {
      setIsLoading(true);
      console.log(email.current.value);
      console.log(password.current.value);

      var data = {
        email: email.current.value,
        password: password.current.value,
      };

      const request = gqlclient
        .mutate({
          mutation: gql`
            mutation RegisterUser($data: RegisterRequest) {
              RegisterUser(data: $data) {
                message
              }
            }
          `,
          variables: { data },
        })
        .then((response) => {
          toast({
            title: `Please hold while we redirect you to the sign in page.`,
            variant: "subtle",
            status: "success",
            isClosable: true,
          });
          Router.push("/auth/signin");
        })
        .catch((e) => {
          setIsError(true);
          setIsLoading(false);
          console.log(e);
        });
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
            {/* TODO: Amend user details required for signup */}
            <Box>
              <FormControl isRequired isInvalid={isError}>
                <Input
                  variant="flushed"
                  placeholder="Email address"
                  type="email"
                  mt={4}
                  w={350}
                  ref={email}
                  onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
                />
                {isError ? (
                  <FormErrorMessage>
                    An error occured. Please try again later.
                  </FormErrorMessage>
                ) : (
                  <></>
                )}
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
                  onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
                />
              </FormControl>
              <Button
                mb={5}
                w="full"
                onClick={() => handleSubmit()}
                disabled={isLoading}
              >
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
      <Footer fixed />
    </MainContent>
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
