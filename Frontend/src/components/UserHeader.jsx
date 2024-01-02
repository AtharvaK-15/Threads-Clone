import { VStack, Box, Flex, Text, Link } from "@chakra-ui/layout"
import { Avatar, Menu, MenuButton, MenuList, MenuItem, useToast} from "@chakra-ui/react"
import { BsInstagram }  from "react-icons/bs" 
import { CgMoreO } from "react-icons/cg"
import { Portal } from "@chakra-ui/react"
import PropTypes from 'prop-types';
import { useRecoilValue } from "recoil"
import { userAtom } from "../atoms/userAtom"
import { Button } from "@chakra-ui/button"
import { Link as RouterLink } from "react-router-dom"
import { useState } from "react"

const UserHeader = ({user}) => {

  const currentUser = useRecoilValue(userAtom) //logged in user
  const [following, setFollowing] = useState(user?.followers?.includes(currentUser?._id) || false);
  const [updating, setUpdating] = useState(false)
  console.log(following)

  const handleFollowUnfollow = async () => {
    if(!currentUser) {
      alert("Please login to follow this user")
      return
    }
    if(updating) return
    setUpdating(true)

    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      }
      console.log(data);

      if(following){
        user.followers.pop(); //removing follower from user
      }else{
        user.followers.push(currentUser._id); //adding follower to user
      }

      setFollowing(!following);
    } catch (error) {
      console.log(error)
      alert(error)
    }finally{
      setUpdating(false)
    }
  }

  const toast = useToast()
   const copyURL = () =>{
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: 'Account created.',
        description: "Profile link copied.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
  })
};
  
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} width={"full"}>
        <Box>
          {/* want to fix this props */}
          <Text fontSize={"2xl"} fontWeight={"bold"}>{user ? user.name : "Loading..."}</Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user ? user.username : "Loading..."}</Text>
            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user ? user.profilePic ? <Avatar size={{
            base:'md',
            md: 'xl',
          }} src={user.profilePic} /> : <Avatar size={"lg"} /> : "Loading..." }

          {/* if no user profile pic: */}
          {/* {!user.profilePic ? <Avatar size={{
            base:'md',
            md: 'xl',
          }} src="https://bit.ly/broken-link" /> : <Avatar size={"lg"} />} */}

        </Box>
      </Flex>
      <Text>{user ? user.bio : "Loading..."}</Text>

      {/* if we looking at self profile: */}
      {currentUser?. _id === user?._id && (
        <Link as={RouterLink} to="/update">
          <Button size={'sm'}>Update Profile</Button>
        </Link>
      )}

      {currentUser?. _id !== user?._id && (
          <Button size={'sm'} onClick={handleFollowUnfollow} isLoading={updating}>
            {following ? "Unfollow" : "Follow"}
          </Button>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user ? user.followers.length : "Loading..."} Followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className='icon-container'>
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          
          <Box className='icon-container'>
            <Menu>
              <MenuButton>                
               <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}> Copy link </MenuItem>
                </MenuList>
              </Portal>
            </Menu>        
          </Box>
        </Flex>
      </Flex>  

    <Flex w={"full"}>
      <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
        <Text fontWeight={"bold"}>Threads</Text>
      </Flex>
      <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb={3} cursor={"pointer"}>
        <Text fontWeight={"bold"}>Replies</Text>
      </Flex>
    </Flex>
    </VStack>
  )
}

UserHeader.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserHeader   