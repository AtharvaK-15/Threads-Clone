'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import { authScreenAtom } from '../atoms/authAtom.js'
// import { useShowToast } from '../hooks/useShowToast.js'
import { userAtom } from '../atoms/userAtom'

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  // const showtoast = useShowToast()
  const handleLogin = async () => {
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })
      const data = await res.json()
      console.log(data)
      if (data.error) {
        // showtoast("error",data.error,"Error")
        console.log(data.error)
        return
      }
      console.log(data)
      localStorage.setItem('user-info', JSON.stringify(data))
      setUser(data)
      
    console.log(inputs)
    } catch (error) {
      // showtoast("error",error,"Error")
      console.log(error)
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          w={{
            base:"full",
            sm:"400px"
          }}
          >
          <Stack spacing={4}>
            <FormControl isRequired>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" 
                    value={inputs.username}
                    onChange={(e) => setInputs({...inputs, username: e.target.value})}
                  />
                </FormControl>
              </Box>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} 
                  value={inputs.password}
                  onChange={(e) => setInputs({...inputs, password: e.target.value})}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Logging in..."
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.800',
                }}
                onClick={handleLogin}
                >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don&apos;t have an Account? 
                <Link color={'blue.400'} onClick={() => setAuthScreen("signup")}>
                    SignUp
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

