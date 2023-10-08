import { VStack, Box, Flex, Text, Link } from "@chakra-ui/layout"
import { Avatar, Menu, MenuButton, MenuList, MenuItem, useToast} from "@chakra-ui/react"
import { BsInstagram }  from "react-icons/bs" 
import { CgMoreO } from "react-icons/cg"
import { Portal } from "@chakra-ui/react"
// import { Toast } from "@chakra-ui/react"


const UserHeader = () => {
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

export default UserHeader   