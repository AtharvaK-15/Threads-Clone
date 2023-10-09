import { Avatar, Divider, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"

const Comment = () => {
    const [liked, setLiked] = useState(false)
  return (
    <>
        <Flex gap={4} py={2} my={2} w={"full"}>
            <Avatar src="/tanjiro.jpg" size={"sm"} />
            <Flex gap={1} w={"full"} flexDirection={"column"}>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>kamadotanjiro</Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                        <BsThreeDots />
                    </Flex>
                </Flex>
                <Text>Any relevant comment</Text>
                <Actions liked={liked} setLiked={setLiked}/>
                <Text fontSize={"sm"} color={"gray.light"}>
                    {100+(liked?1:0)} likes
                </Text>
            </Flex>
        </Flex>

        <Divider my={4}/>
        {/* <Comment /> */}
    </>
  )
}

export default Comment