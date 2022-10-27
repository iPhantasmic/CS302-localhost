import { Box, Divider, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

export default function Footer(props: any) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        backgroundColor: "white",
        width: "100vw",
      }}
    >
      <Divider />
      <Flex>
        <HStack px="10">
          <Text textAlign="center" mt={3} mb={3} fontSize="14px">
            {"© " + new Date().getFullYear() + " Localhost, Inc."}
          </Text>
          <NextLink href="/privacy">
            <Text fontSize="14px">Privacy</Text>
          </NextLink>
          <NextLink href="/terms">
            <Text fontSize="14px">Terms</Text>
          </NextLink>
          <NextLink href="/sitemap">
            <Text fontSize="14px">Sitemap</Text>
          </NextLink>
        </HStack>
        <Spacer />
        <Text></Text>
      </Flex>
    </div>
  );
}
