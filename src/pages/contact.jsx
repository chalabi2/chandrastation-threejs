import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    Link
  } from "@chakra-ui/react"
  import {
    MdEmail,
    MdLocationOn,
    MdOutlineEmail,
  } from "react-icons/md"
  import { BsGithub, BsDiscord, BsPerson, BsTwitter } from "react-icons/bs"
  
  export default function Contact() {
    return (
      <Container
       bg="black" minH="100vh" height="full" maxW="full" maxH="full" centerContent>
        <Flex
                  mt={20}
        alignItems="center"  justifyContent="center" w="100%" h="100%"
        >
          <Box
          borderWidth={1}
          borderRadius="lg"
          borderColor="gray.700"
            bg="black"
            color="white"
            alignItems="center"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Box justifyContent="center" p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading>Contact</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                      Get in touch
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          size="md"
                          height="48px"
                          width="300px"
                          variant="ghost"
                          colorScheme="white"
                          _hover={{ border: "2px solid teal" }}
                          leftIcon={<MdEmail color="teal" size="20px" />}
                        >
                          chalabi@chandrastation.com
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          colorScheme="white"
                          _hover={{ border: "2px solid teal" }}
                          leftIcon={<MdLocationOn color="teal" size="20px" />}
                        >
                          Phoenix, Arizona
                        </Button>
                      </VStack>
                    </Box>
                    <HStack
                      mt={{ lg: 10, md: 10 }}
                      spacing={5}
                      px={5}
                      alignItems="flex-start"
                    >
                      <IconButton
                        aria-label="twitter"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{ bg: "teal" }}
                        icon={<BsTwitter size="28px" />}
                      />
                      <IconButton
                        aria-label="github"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{ bg: "teal" }}
                        icon={<BsGithub size="28px" />}
                      />
                      <IconButton
                        aria-label="discord"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{ bg: "teal" }}
                        icon={<BsDiscord size="28px" />}
                      >
                        <Link href="" ></Link>
                      </IconButton>
                    </HStack>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box 
                  
                  borderWidth={1}
      borderRadius="lg"
      borderColor="gray.700">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                        <FormControl id="name">
                          <FormLabel
                          color="white"
                          >Your Name</FormLabel>
                          <InputGroup borderColor="white">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<BsPerson color="white" />}
                            />
                            <Input color="white" type="text" size="md" />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel
                          color="white"
                          >Email</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<MdOutlineEmail color="white" />}
                            />
                            <Input color="white" type="text" size="md" />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel
                          color="white"
                          >Message</FormLabel>
                          <Textarea
                          color="white"
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: "teal"
                            }}
                            placeholder="message"
                          />
                        </FormControl>
                        <FormControl id="name" float="right">
                          <Button
                            variant="solid"
                            bg="teal"
                            color="white"
                            _hover={{}}
                          >
                            Send Message
                          </Button>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    )
  }
  