import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import React from "react";

const DarkModeToggle = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      borderRadius="full"
      aria-label="mode toggle"
      variant="ghost"
      colorScheme={useColorModeValue("gray", "orange")}
      icon={useColorModeValue(
        <MoonIcon color="#191970" />,
        <SunIcon color="orange.300" />
      )}
      onClick={toggleColorMode}
    ></IconButton>
  );
};

export default DarkModeToggle;
