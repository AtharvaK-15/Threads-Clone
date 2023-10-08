import { Link } from "react-router-dom"
import { Flex, Avatar, Box, Text } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"
import { useState } from "react"

const UserPost = () => {
    const [liked, setLiked] = useState(false)
  return (
    <Link to={"/kamadotanjiro/post/1"}>
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
               <Avatar size={"md"} name="Tanjiro" src="/tanjiro.jpg"/>
               <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box> 
            </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Flex w={"full"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>kamadotanjiro</Text>
                    <Image src="/verified.png" w={4} h={4} ml={1}/>
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                    <BsThreeDots />
                </Flex>
            </Flex>
            <Text fontSize={"sm"}>This is my first post!</Text>
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                <Image src="/post1.jpg" alt="1st post" w={"full"}/>
            </Box>
            <Flex gap={3} my={1}>
                <Actions liked={liked} setLiked={setLiked}/>
            </Flex>
        </Flex>
        </Flex>
    </Link>
  )
}

export default UserPost