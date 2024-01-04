import { Flex, Image, useColorMode } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import { userAtom } from "../atoms/userAtom"
import { Link } from "@chakra-ui/react"
import { AiFillHome } from "react-icons/ai"
import { Link as RouterLink } from "react-router-dom"
import {RxAvatar } from "react-icons/rx"

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom)
    return (

    <Flex justifyContent={"space-between"} mt={6} mb={12}>

        {user && (
            <Link as={RouterLink} to="/">
                <AiFillHome size={24}/>
            </Link>
        )}

        <Image 
            cursor={"pointer"}
            alt="logo"
            w={6}
            src={colorMode ==='dark' ? "/light-logo.svg" : "/dark-logo.svg"}
            onClick={toggleColorMode}
        />

        {user && (
            <Link as={RouterLink} to={`/${user.username}`}>
                <RxAvatar size={24}/>
            </Link>
        )}
    </Flex>

    )
}

export default Header