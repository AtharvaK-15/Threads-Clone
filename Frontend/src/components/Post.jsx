import { Link } from "react-router-dom"
import { Flex, Avatar, Box, Text } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"
import { useEffect, useState } from "react"
import PropTypes from 'prop-types';

const Post = ({post,userId}) => {
    
    const [liked, setLiked] = useState(false)
    // useEffect(() => {
    //     const getUser = async () => {
    //         try {
    //             const res = await fetch("/api/users/profile/${post.postedBy}");
    //             // Further logic based on the response
    //         } catch (error) {
    //             console.log(error);
    //             alert("Error fetching user");
    //         }
    //     };

    //     getUser();
    // }, [post.postedBy]);

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
            
            <Text fontSize={"sm"}>{post.text}</Text>
            
            {post.img &&(

                <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                    <Image src="/post1.jpg" alt="1st post" w={"full"}/>
                </Box>
            )}
            
            <Flex gap={3} my={1}>
                <Actions liked={liked} setLiked={setLiked}/>
            </Flex>
            
            <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.light"} fontSize={"sm"}>{post.replies} replies</Text>
                <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                <Text color={"gray.light"} fontSize={"sm"}>{post.likes} likes</Text>
            </Flex>
        </Flex>
        </Flex>
    </Link>
  )
}

Post.propTypes = {
    post: PropTypes.shape({
        text: PropTypes.string.isRequired,
        img: PropTypes.string, 
        replies: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired,
        likes: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired,
        postedBy: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
            _id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            profileImg: PropTypes.string,
        })]).isRequired,
    }).isRequired,
};

export default Post