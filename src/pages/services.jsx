import { Box, SimpleGrid, Icon, Text, Stack, Flex, Container, Grid, Heading, Card, CardHeader, CardBody, CardFooter, Button } from "@chakra-ui/react"
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc"

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"black"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  )
}

export default function Services() {
  return (
    <Container maxH="full" maxW="full" centerContent>
      <Box
      mt={40}
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
        Services
      </Heading>
      </Flex>
      <Flex
      pt={25}
      justifyContent="center"
      >
      <SimpleGrid mt={15} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
  <Card>
    <CardHeader>
      <Heading size='md'>Snapshots</Heading>
    </CardHeader>
    <CardBody>
      <Text>Cosmos based snapshots. Pruned and updated daily.</Text>
    </CardBody>
    <CardFooter>
      <Button>Download</Button>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
      <Heading size='md'>Public Endpoints</Heading>
    </CardHeader>
    <CardBody>
      <Text>A list of public endpoints to cosmos blockchains.</Text>
    </CardBody>
    <CardFooter>
      <Button>Query</Button>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
      <Heading size='md'>White Label</Heading>
    </CardHeader>
    <CardBody>
      <Text>Get in touch for your infrastructure needs.</Text>
    </CardBody>
    <CardFooter>
      <Button>Instructions</Button>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
      <Heading size='md'>Advisory</Heading>
    </CardHeader>
    <CardBody>
      <Text>Need help developing or deploying in the cosmos? Get in touch.</Text>
    </CardBody>
    <CardFooter>
      <Button>Contact</Button>
    </CardFooter>
  </Card>
</SimpleGrid>
</Flex>
      </Box>
    </Container>
  )
}
