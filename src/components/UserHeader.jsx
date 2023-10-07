import { VStack, Box, Flex, Text, Link } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/react"
// import 

const UserHeader = () => {
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} width={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>Tanjiro Kamado</Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>kamadotanjiro</Text>
            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="Tanjiro Kamado" src="/tanjiro.jpg" size={"2xl"}/>
        </Box>
      </Flex>
      <Text>I want to kill Muzan!</Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>6.9k Followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex></Flex>
      </Flex>
    </VStack>
  )
}

export default UserHeader