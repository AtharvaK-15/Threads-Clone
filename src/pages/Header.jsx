import { Flex, Image, useColorMode } from "@chakra-ui/react"

const Header = () => {
    useColorMode()
    return (

    <Flex justifyContent={"center"} mt={6} mb={12}>
        <Image 
            cursor={"pointer"}
            alt="logo"
            src={colorMode ==='Dark' ? "/light-logo.svg" : "/dark-logo.svg"}
        />
    </Flex>)
}

export default Header