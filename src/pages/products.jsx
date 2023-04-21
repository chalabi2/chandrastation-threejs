import { Spacer, Avatar, Box, SimpleGrid, Text, Flex, Container, Heading, Card, CardHeader, CardBody, CardFooter, Button, HStack, Link } from "@chakra-ui/react"

export default function Products() {
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
        Products
      </Heading>
      </Flex>
      <Flex

      justifyContent="center"
      >
      <SimpleGrid mt={15} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
  <Card
  mt={4}
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
      <Heading size='md'>Apollo</Heading>
    </CardHeader>
    <CardBody>
      <Text>A fork of ping.pub containing chains we have endpoints for.</Text>
    </CardBody>
    <CardFooter>
    <HStack>
      <Button
      colorScheme="cyan"
      ><Link
      href="https://apollo.chandrastation.com"
      >Explore</Link></Button>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Avatar src={"https://apollo.chandrastation.com/logo.png"} mb={2} />
      </HStack>
    </CardFooter>
  </Card>
  <Card
  mt={4}
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
      <Heading size='md'>Validator Dashboard</Heading>
    </CardHeader>
    <CardBody>
      <Text>Simple tools for validators.</Text>
    </CardBody>
    <CardFooter>
    <HStack>
      <Button
      
      colorScheme="cyan"
      >
    <Link
    href="https://dashboard.chandrastation.com"
    >Broadcast</Link>
    </Button>
 
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Avatar src={"/dashboard.png"} mb={2} />
      </HStack>
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
      <Heading size='md'>Gravity Statistics</Heading>
    </CardHeader>
    <CardBody>
      <Text>Analytics dashboard for Gravity Bridge</Text>
    </CardBody>
    <CardFooter>
    <HStack>
      <Button
      colorScheme="cyan"
      ><Link
      href="https:/chalabi2.github.io/gravity-dashboard"
      >Stats</Link></Button>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Avatar src={"/chandra.png"} mb={2} />
      </HStack>
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
      <Heading size='md'>Space Station</Heading>
    </CardHeader>
    <CardBody>
      <Text>A fork of Cosmos Station's interchain bridge app maintained by us.</Text>
    </CardBody>
    <CardFooter>
        <HStack>
      <Button
      colorScheme="cyan"
      ><Link
      href="https://chandrastation.github.io/space-station"
      >Bridge</Link></Button>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      <Avatar src={"/chandra.png"} mb={2} />
      </HStack>
    </CardFooter>
  </Card>
</SimpleGrid>
</Flex>
      </Box>
    </Container>
  )
}
