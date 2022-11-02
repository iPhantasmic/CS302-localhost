import { Badge, Box, HStack, Skeleton, Spacer } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Router from "next/router";
import { motion } from "framer-motion";

const images = [
  "https://a0.muscache.com/im/pictures/0720332d-b410-4c85-b09d-78fb36240a43.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-36880172/original/4aac5067-4642-4148-9ba9-7476c6920c90.jpeg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-725604930974176592/original/66e8746e-9f09-4564-9e9c-5756fc572063.jpeg",
  "https://a0.muscache.com/im/pictures/fe109afa-a36b-4082-b047-c8f4f36f18b2.jpg",
  "https://a0.muscache.com/im/pictures/db193878-c602-4a93-88ee-9b3f1ebfe7f1.jpg",
  "https://a0.muscache.com/im/pictures/9ee15529-6596-4b96-95e5-06777bfed126.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-620445832431796074/original/822e6e0a-6209-43e4-b84d-78cbcbeab16d.jpeg",
  "https://a0.muscache.com/im/pictures/6d441896-6497-41d7-b210-58b2d88e4c5c.jpg",
  "https://a0.muscache.com/im/pictures/7fde1672-2160-4593-90cd-00bd75da732a.jpg",
  "https://a0.muscache.com/im/pictures/eb49f6ab-8a2c-4f4a-9fcf-ec319efce8f3.jpg",
  "https://a0.muscache.com/im/pictures/d9bc142c-6028-4d50-a884-a752e5a79490.jpg",
  "https://a0.muscache.com/im/pictures/1b25a065-915d-44a9-ac8f-a0cf4148a3cd.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-32792828/original/8b971f6c-c322-4825-8e51-475be52f0c10.jpeg",
  "https://a0.muscache.com/im/pictures/27488332/f88eaa05_original.jpg",
  "https://a0.muscache.com/im/pictures/abc48799-5ee0-4174-a083-81db21034901.jpg",
  "https://a0.muscache.com/im/pictures/a3e41a30-dc6a-4cd8-9941-e8ec106b179f.jpg",
  "https://a0.muscache.com/im/pictures/1f4dd361-b2a3-4a83-abd1-115bf2e0b6cb.jpg",
  "https://a0.muscache.com/im/pictures/0be2dee2-aab6-41f9-9b37-52de039c5ce0.jpg",
  "https://a0.muscache.com/im/pictures/d3eeb76d-6d68-46e4-af80-7f4333fc4454.jpg",
  "https://a0.muscache.com/im/pictures/d0ca15e5-87bc-4912-bbc0-6c564e42afc7.jpg",
  "https://a0.muscache.com/im/pictures/monet/Luxury-674133747208887029/original/408943d0-6b8e-4078-8b04-015a01555bba",
  "https://a0.muscache.com/im/pictures/03b6cb80-e1a3-43c6-8a7a-a04e7205caa5.jpg",
  "https://a0.muscache.com/im/pictures/c79965b5-9b22-4504-af7b-3131f5c25dfa.jpg",
  "https://a0.muscache.com/im/pictures/aab9bec6-8626-47a0-8718-7d8cc131da48.jpg",
  "https://a0.muscache.com/im/pictures/b0dc5f70-dd17-4c94-8f71-28faab509e82.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-43646082/original/3a635420-cfaf-413a-8d02-d09da4bf107a.jpeg",
  "https://a0.muscache.com/im/pictures/9a62c114-277a-4fd4-a96e-a2274acf6a5c.jpg",
  "https://a0.muscache.com/im/pictures/8db6ed20-fc30-4f7e-ae90-3f860874158b.jpg",
  "https://a0.muscache.com/im/pictures/be5ec43d-245a-4c09-9bb7-a5e1b8eb56b3.jpg",
  "https://a0.muscache.com/im/pictures/7809096f-55f0-47c9-b0be-75bbaeec2122.jpg",
  "https://a0.muscache.com/im/pictures/dddca0c6-6324-4e3e-bcee-6dfce9500975.jpg",
  "https://a0.muscache.com/im/pictures/968e8541-eb21-4a38-9402-259691ada4ad.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-29896604/original/f775826b-3618-46b4-9bdb-eb1c0a437de7.jpeg",
  "https://a0.muscache.com/im/pictures/554d0bc3-adb0-4fef-8b59-760e85626610.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-42637728/original/f7bfd23a-2b60-49a0-a6fb-5680eccf1ba1.jpeg",
  "https://a0.muscache.com/im/pictures/fb860347-88b9-4a1a-acfe-d518f3f77072.jpg",
];

export const Card = (props: any) => {
  const random = Math.floor(Math.random() * (35 - 1) + 1);
  return (
    <Box
      maxW="23%"
      p="0.5%"
      zIndex="0"
      onClick={() =>
        Router.push({
          pathname: "/listing/" + props.data.listingId,
          query: {
            fallback: random,
          },
        })
      }
      cursor="pointer"
    >
      <Box maxW="xl" borderRadius="lg" cursor="pointer">
        {props.data != undefined ? (
          <Image
            src={
              props.data.images[0] != "" ? props.data.images[0] : images[random]
            }
            alt={props.listingId}
            objectFit="cover"
            width="500px"
            height="480px"
            style={{ borderRadius: "10px" }}
          />
        ) : (
          <Skeleton height="350px" />
        )}
      </Box>

      <Box mb="3" mt="1">
        {props.data != undefined ? (
          <>
            <HStack alignItems="center">
              <Box
                fontWeight="semibold"
                fontSize="14px"
                as="h4"
                lineHeight="tight"
                noOfLines={1}
              >
                {props.data.city + ", " + props.data.country}
              </Box>
              <Badge
                borderRadius="lg"
                fontSize="2xs"
                px={1.5}
                colorScheme="teal"
                variant="outline"
                ml={2}
              >
                New
              </Badge>
              <Spacer />
              <Box display="flex" mt="2" alignItems="center">
                <StarIcon color="teal.500" />
                <Box as="span" ml="1" color="gray.600" fontSize="sm">
                  {(Math.random() * (5 - 4) + 4).toFixed(2)}
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
                {props.data.rooms} room(s) · {props.data.rooms * 2} beds
              </Box>
            </Box>

            <Box fontSize="15.5px" fontWeight="semibold">
              {props.data.price}&nbsp;SGD
              <Box as="span" color="gray.600" fontSize="sm" fontWeight="normal">
                &nbsp;night
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </>
        )}
      </Box>
    </Box>
  );
};
