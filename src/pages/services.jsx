import { Box, SimpleGrid, Text, Flex, Container, Heading, Card, CardHeader, CardBody, CardFooter, Button } from "@chakra-ui/react"

export default function Services() {
  return (
    <Container maxH="full" maxW="full" centerContent>
      <Box
      spacing={4}
      mt={20}
      borderWidth={1}
      borderRadius="lg"
      borderColor="gray.700"
      p={4}
      w="100%"
      overflowWrap="break-word"
      maxWidth="100%"
      verticalAlign="center"
      boxSize="3xl"
      maxH="100vh"
      width="4xl"
      bgColor="black"
      
      >
        <Flex
        justifyContent="center"
        >
      <Heading
      color="white"
      justifySelf="center"
      >
        Services
      </Heading>
      </Flex>
      <Flex

      justifyContent="center"
      >
      <SimpleGrid mt={15} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
  <Card
  spacing={4}
  borderWidth={1}
  borderRadius="lg"
  borderColor="gray.700"
  bgColor="black"
  p={4}
  w="100%"
  overflowWrap="break-word"
  maxWidth="100%">
    <CardHeader>
      <Heading size='md'>Snapshots</Heading>
    </CardHeader>
    <CardBody>
      <Text>Cosmos based snapshots. Pruned and updated daily.</Text>
    </CardBody>
    <CardFooter>
      <Button
      colorScheme="teal"
      >Download</Button>
    </CardFooter>
  </Card>
  <Card
  spacing={4}
  borderWidth={1}
  borderRadius="lg"
  borderColor="gray.700"
  bgColor="black"
  p={4}
  w="100%"
  overflowWrap="break-word"
  maxWidth="100%"
  >
    <CardHeader>
      <Heading size='md'>Public Endpoints</Heading>
    </CardHeader>
    <CardBody>
      <Text>A list of public endpoints to cosmos blockchains.</Text>
    </CardBody>
    <CardFooter>
      <Button
      colorScheme="teal"
      >Query</Button>
    </CardFooter>
  </Card>
  <Card
  spacing={4}
  borderWidth={1}
  borderRadius="lg"
  borderColor="gray.700"
  bgColor="black"
  p={4}
  w="100%"
  overflowWrap="break-word"
  maxWidth="100%"
  >
    <CardHeader>
      <Heading size='md'>White Label</Heading>
    </CardHeader>
    <CardBody>
      <Text>Get in touch for your infrastructure needs.</Text>
    </CardBody>
    <CardFooter>
      <Button
      colorScheme="teal"
      >Instructions</Button>
    </CardFooter>
  </Card>
  <Card
  spacing={4}
  borderWidth={1}
  borderRadius="lg"
  borderColor="gray.700"
  bgColor="black"
  p={4}
  w="100%"
  overflowWrap="break-word"
  maxWidth="100%"
  >
    <CardHeader>
      <Heading size='md'>Advisory</Heading>
    </CardHeader>
    <CardBody>
      <Text>Need help developing or deploying in the cosmos? Get in touch.</Text>
    </CardBody>
    <CardFooter>
      <Button
      colorScheme="teal"
      >Contact</Button>
    </CardFooter>
  </Card>
</SimpleGrid>
</Flex>
      </Box>
    </Container>
  )
}
