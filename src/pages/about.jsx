import {
  Avatar,
  Box,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

export default function About() {
  return (
      <Stack
        bg={useColorModeValue("black", "black")}
        py={250}
        px={8}
        spacing={{ base: 8, md: 10 }}
        align={"center"}
        direction={"column"}
      >
        <Text
          color="white"
          fontSize={{ base: "xl", md: "2xl" }}
          textAlign={"center"}
          maxW={"3xl"}
        >
          CHANDRA: (Sanskrit: चन्द्र, Def: 'shining' or 'moon')
        </Text>
        <Text
          color="white"
          fontSize={{ base: "xl", md: "2xl" }}
          textAlign={"center"}
          maxW={"3xl"}
        >
          Chandra Station is a multi disciplined validator, infrastructure
          provider, and development house. We are investors, programmers and
          thinkers looking to push the Cosmos forward. With seed investments in
          the likes of Akash and early contributions to Gravity Bridge,
          Osmosis, Canto and many other chains we have helped ideate and
          develope multiple products and ecosystems.
        </Text>
        <Box textAlign={"center"}>
          <Avatar src={"/chandra.png"} mb={2} />
        </Box>
      </Stack>
  );
}
