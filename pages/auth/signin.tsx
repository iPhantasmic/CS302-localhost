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
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Footer from "../../components/Footer";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import { MouseEventHandler } from "react";
import { delay } from "framer-motion";

// interface Props { }

const SignIn: NextPage = (props): JSX.Element => {
  const username: any = useRef<HTMLInputElement>();
  const password: any = useRef<HTMLInputElement>();
  const handleLogin: MouseEventHandler<HTMLButtonElement> = async (e: any) => {
    // e.preventDefault()
    if (username.current.value && password.current.value) {
      console.log(username.current.value);
      console.log(password.current.value);

      const res = await signIn("credential", {
        email: username.current.value,
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
            "https://images.pexels.com/photos/10662535/pexels-photo-10662535.jpeg"
          }
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        ></Container>
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
                  placeholder="Username"
                  type="email"
                  mt={4}
                  ref={username}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  variant="flushed"
                  placeholder="Password"
                  type="password"
                  mt={6}
                  mb={8}
                  ref={password}
                />
              </FormControl>
              <Button mb={5} onClick={(e) => handleLogin(e)}>
                Sign in
              </Button>
            </Box>
            <Box px={24}>
              <Divider />
              <Text alignSelf="start" mt={5}>
                Don&apos;t have an account yet? <u>Sign up now</u>
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

export default SignIn;
