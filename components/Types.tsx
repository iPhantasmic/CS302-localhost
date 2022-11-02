import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Flex as="label" width="8%" justifyContent="center">
      <input {...input} />
      <Box
        {...checkbox}
        color="gray"
        cursor="pointer"
        _checked={{
          fontWeight: "semibold",
          color: "black",
        }}
        _hover={{
          fontWeight: "semibold",
          color: "black",
        }}
        mt={3}
        mb={2}
        textAlign="center"
      >
        {props.children}
      </Box>
    </Flex>
  );
}

export default function Types() {
  const options = [
    "Lake",
    "Beaches",
    "OMG!",
    "Surfing",
    "Design",
    "Pools",
    "Island",
    "Tiny",
    "Arctic",
    "Cabins",
    "Lakeside",
    "Views",
    "Camper",
    "Caves",
    "Golfing",
    "Tropical",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "type",
    defaultValue: "Lake",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <Container
      maxW="full"
      px="4%"
      py={1}
      position="fixed"
      top={20}
      zIndex="1"
      bgColor="white"
      borderTop="1px"
      borderColor="gray.200"
    >
      <HStack {...group} overflow="hidden">
        {options.map((value) => {
          const radio = getRadioProps({
            value,
            style: { justifyContent: "center" },
          });
          return (
            <RadioCard key={value} {...radio}>
              <Image src={"/" + value + ".jpg"} height="24px" width="24px" />
              <Text
                fontSize="13px"
                letterSpacing={0.02}
                color="black"
                _dark={{ color: "white" }}
              >
                {value}
              </Text>
            </RadioCard>
          );
        })}
      </HStack>
    </Container>
  );
}
