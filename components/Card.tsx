import { Badge, Box, HStack, Spacer } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Image from "next/image";

export const Card = () => {
  const property = {
    imageUrl:
      "https://a0.muscache.com/im/pictures/miso/Hosting-47721565/original/1854bf1b-dc40-49ed-9c2e-d378663a7a02.jpeg?im_w=720",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Gili Air, Indonesia",
    formattedPrice: "$1,900",
    reviewCount: 3.45,
    rating: 4,
  };

  return (
    <Box maxW="xs" overflow="hidden" p={2}>
      <Box maxW="xs" borderRadius="lg">
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          width="400px"
          height="300px"
        />
      </Box>
      <Box p="2">
        <HStack alignItems="center">
          <Box
            fontWeight="semibold"
            fontSize="14px"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {property.title}
          </Box>
          <Badge
            borderRadius="full"
            px="2"
            colorScheme="teal"
            variant="outline"
            ml={2}
          >
            New
          </Badge>
          <Spacer />
          <Box display="flex" mt="2" alignItems="center">
            <StarIcon color="teal.500" />
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviewCount}
            </Box>
          </Box>
        </HStack>

        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="normal"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {property.beds} beds · {property.baths} baths
          </Box>
        </Box>

        <Box fontSize="15.5px" fontWeight="semibold">
          {property.formattedPrice}&nbsp;SGD
          <Box as="span" color="gray.600" fontSize="sm" fontWeight="normal">
            &nbsp;night
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
