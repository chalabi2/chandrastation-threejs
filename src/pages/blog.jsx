import { Box, Stat, SimpleGrid, Icon, Text, Stack, Flex, Container, Grid, Heading, Card, CardHeader, CardBody, CardFooter, Button } from "@chakra-ui/react"
import gravityGrant from "./blogs/gravity-grant"
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc"

export default function ArticleList() {
  return (
    <Container maxH="full" maxW="full" centerContent>
      <Box
      mt={80}
      boxSize="2xl"
      width="4xl"
      bgColor="black"
      borderRadius={8}
      
      >
        <Flex
        mt={4}
        justifyContent="center"
        >
      <Heading
      color="white"
      justifySelf="center"
      >
        Blog
      </Heading>
      </Flex>
      <Flex
      pt={25}
      justifyContent="center"
      >
      <SimpleGrid mt={15} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
  <Card>
    <CardHeader>
      <Heading size='md'>Updates</Heading>
    </CardHeader>
    <CardBody>
      <Text>General updates on the happenings at Chandra Station</Text>
    </CardBody>
    <CardFooter>
      <Button 
      onclick={gravityGrant}
      >Read</Button>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
      <Heading size='md'>Moon View</Heading>
      <Stat>Deprecated</Stat>
    </CardHeader>
    <CardBody>
      <Text>A collection of our old blogging format, Moon View.</Text>
    </CardBody>
    <CardFooter>
      <Button>Read</Button>
    </CardFooter>
  </Card>
</SimpleGrid>
</Flex>
      </Box>
    </Container>
  )
}
