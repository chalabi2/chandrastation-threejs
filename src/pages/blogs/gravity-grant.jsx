import {
    Avatar,
    Box,
    Flex,
    Stack,
    Text,
    useColorModeValue,
    VStack,
  } from "@chakra-ui/react";
  
  export default function gravityGrant() {
    return (
        <Stack

          py={450}
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
            Gravity Funding Grant Prop 172
          </Text>
          <Text
            color="white"
            fontSize={{ base: "xl", md: "2xl" }}
            textAlign={"center"}
            maxW={"3xl"}
          >
With the passing of Gravity Bridge proposal #170 ChandraStation is receiving funding for multiple on-going development projects as outlined in the proposal. As a genesis validator and longtime supporter / community member of Gravity Bridge we are positioned to develop and maintain two separate applications.

Space Station was the preferred front end for Gravity Bridge upon launch. It was developed to work but was not being maintained and became somewhat deprecated (visiting spacestation.zone forwards you to blockscapes portal). Leaving the ecosystem with one useable front end for bridging to and from Gravity, Blockscape's portal. Gravity Bridge Portal is the premier option and will continue to be, but it was heavily apparent relying on one port of entry is not scale-able and did not support the ethos of GravityBridge. Space Station did not support the newly released feature, chain fees. It also did not calculate a proper bridge fee from Ethereum gas markets, instead relying on hard coded amounts for different speeds. This resulted in inaccurate pricing and conversions not functioning, requiring users to pay either 10 USDC to bridge USDC or 10 ETH to bridge ETH at the lowest speed. It is now fixed to support dynamic bridge fees depending on the market and chain fees. It will be our duty with the passing of proposal #170 to continue maintaining Space Station in order to ensure its functionality. Alongside maintainer-ship we have also made Space Station easily deployable by anyone. Simply fork the github repo, follow the guide, and github pages will deploy a version of the frontend. Allowing you to host your own front end and bridge your assets.

Gravity Bridge is the leader in the Cosmos ecosystem continuously pushing the most volume. Reading statistics and scanning data is relatively difficult. Gravity Bridge Statistics (working name) will serve to showcase specific data like the total amount of fees paid to stakers, which assets are doing the most volume, overall volume, month over month – week over week, and daily volume numbers amongst other stats. We are also open to hearing feedback from the community and adding more data to the page.

Space Station is finished and live at https://chandrastation.github.io/space-station/
Gravity Bridge Statistics is still being worked on but is updated here (inaccurate data currently present) https://chalabi2.github.io/gravity-dashboard/

Feel free to follow the GitHub repos to stay up to date on development alongside our newsletters. We are present and participating in discussions in the Gravity Bridge discord

Space Station: https://github.com/ChandraStation
Gravity Bridge Statistics: https://github.com/chalabi2/gravity-dashboard
          </Text>
          <Box textAlign={"center"}>
            <Avatar src={"/chandra.png"} mb={2} />
          </Box>
        </Stack>
    );
  }
  