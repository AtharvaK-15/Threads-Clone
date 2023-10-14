import { Flex, Avatar, Text, Image } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Box } from "@chakra-ui/react"
import Actions from "../components/Actions"
import { useState } from "react"
import { Divider } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import Comment from "../components/Comment"

const PostPage = () => {
  const [liked, setLiked] = useState(false)
  // const [first, setfirst] = useState(second)
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/tanjiro.jpg" size={"md"} name="Tanjiro Kamado"/>
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>kamadotanjiro</Text>
            <Image src="/verified.png" w={4} h={4} ml={4}/>
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>This is my first Post!</Text>
      
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                    <Image src="/post1.jpg" alt="1st post" w={"full"}/>
        </Box>

        <Flex gap={3} my={3}>
          <Actions liked={liked} setLiked={setLiked}/>
        </Flex>

        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"} fontSize={"sm"}>480 replies</Text>
          <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
          <Text color={"gray.light"} fontSize={"sm"}>{1200 +(liked?1:0)} likes</Text>
        </Flex>

        <Divider my={4} />
        <Comment comment="Hey this is a comment through props" likes={100}/>
        <Comment comment="Hey this is a comment through props" likes={100}/>
        <Comment comment="Hey this is a comment through props" likes={100}/>
        <Comment comment="Hey this is a comment through props" likes={100}/>
    </>
  )
}

export default PostPage