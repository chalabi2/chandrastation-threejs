import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  useColorMode,
  Button,
} from '@chakra-ui/react';


const BlogPost = ({ title, author, date, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const snippet = content.split('\n')[0];

  return (
    <VStack
    mt={10}
      spacing={4}
      borderWidth={1}
      borderRadius="lg"
      borderColor="gray.700"
      p={4}
      w="100%"
      overflowWrap="break-word"
      maxWidth="100%"
    >
      <Heading as="h2" size="lg" color="white">
        {title}
      </Heading>
      <HStack overflowWrap="break-word"
      maxWidth="100%">
        <Avatar
          name={author}
          src={`https://ui-avatars.com/api/?name=${author.replaceAll(' ', '+')}`}
        />
        <Text color="gray.400">{author}</Text>
        <Text color="gray.500">{date}</Text>
      </HStack>
      <Box color="gray.300" overflow="auto" wordWrap="break-word" >
        <Text lineHeight={7} textIndent="initial" textStyle='paragraph' >
  {isExpanded ? content : snippet}
</Text>
      </Box>
      <Button onClick={handleExpansion} colorScheme="cyan">
        {isExpanded ? 'Show Less' : 'Read More'}
      </Button>
    </VStack>
  );
};

const ArticleList = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const samplePosts = [
    {
      title: 'Gravity Bridge Proposal #170',
      author: 'Chalabi',
      date: 'April 17, 2023',
      content: ` With the passing of gravity bridge 
      proposal #170 chandrastation is 
      receiving funding for multiple 
      on-going development projects as outlined in the proposal.
      As a genesis validator and longtime supporter / community member of gravity bridge 
      we are positioned to develop and maintain two separate applications.
      Space station was the preferred 
      front end for gravity bridge upon launch.
      It was developed to work but was not being maintained and became somewhat deprecated 
      (visiting spacestation. Zone forwards you to blockscapes portal).
      Leaving the ecosystem with one useable front end for 
      bridging to and from gravity, blockscape's portal.
      Gravity bridge portal is the premier option and will 
      continue to be, but it was heavily apparent relying on one port of 
      entry is not scale-able and did not support the ethos of gravitybridge.
      Space station did not support the newly released fee, chain fees.
      It also did not calculate a proper bridge fee from 
      ethereum gas markets, instead relying on hard coded amounts for different speeds.
      This resulted in inaccurate pricing and conversions not
      functioning, requiring users to pay either 10 usdc to 
      bridge usdc or 10 eth to bridge eth at the lowest speed.
      It is now fixed to support dynamic bridge fees 
      depending on the market and chain fees.
      It will be our duty with the passing of proposal #170 to 
      continue maintaining space station in order to ensure its functionality.
      Alongside maintainer-ship we have also made space station easily deployable by anyone.
      Simply fork the github repo, follow the guide, and github pages will deploy a version of the frontend.
      Allowing you to host your own front end and bridge your assets.
      Gravity bridge is the leader in the cosmos ecosystem continuously pushing the most volume.
      Reading statistics and scanning data is relatively difficult.
      ### Gravity bridge statistics (working name) will serve 
      to showcase specific data like the total amount of fees paid to stakers,
      which assets are doing the most volume, overall volume, 
      month over month  week over week, and daily volume numbers amongst other stats.
      We are also open to hearing feedback from the community and adding more data to the page.
      Space station is finished and live at https: //chandrastation. Github. Io/space-station/
      gravity bridge statistics is still being worked on but is updated here 
      (inaccurate data currently present) https: //chalabi2. Github. Io/gravity-dashboard/
      feel free to follow the github repos to stay up to date on development 
      alongside our newsletters. We are present and participating 
      in discussions in the gravity bridge discord
      space station: https: //github. Com/chandrastation
      gravity bridge statistics: https: //github. Com/chalabi2/gravity-dashboard
      `,
    }
  ];

  return (
    <Box minH="100vh" bg={isDark ? 'black' : 'white'}>
      <Container maxW="container.md" pt={10}>
        <VStack spacing={8} w="100%">
          {samplePosts.map((post, index) => (
            <BlogPost
              key={index}
              title={post.title}
              author={post.author}
              date={post.date}
              content={post.content}
            />
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default ArticleList;