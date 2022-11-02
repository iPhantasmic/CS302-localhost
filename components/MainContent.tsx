import { motion } from "framer-motion";
import { chakra, shouldForwardProp } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: (prop) => {
    return shouldForwardProp(prop) || prop === "transition";
  },
});

const MainContent = ({ children }) => {
  return (
    <StyledDiv
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      mb={6}
    >
      {children}
    </StyledDiv>
  );
};

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContent;
