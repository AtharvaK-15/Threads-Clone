import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
}
from '@chakra-ui/react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../atoms/userAtom'
import { useRef } from 'react'
import usePreviewImg from '../../hooks/usePreviewImg'

const UpdateProfile = () => {
  const [user, setUser] = useRecoilState(userAtom)
  const [inputs, setInputs] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
    bio: user.bio,
    name: user.name,
  })

  const fileRef = useRef(null);

  const {handleImgChange,imgURL} = usePreviewImg()


  console.log(user,"user is here!")

  return (
    <Flex
      align={'center'}
      justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.dark')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{base:'2xl', sm:'3xl'}}>
          Update Profile
        </Heading>
        <FormControl id="username">
          <Stack direction={['column','row']} spacing={6}>
            <Center>
              <Avatar size={'xl'} src={imgURL || user.profilePic} 
              />
            </Center>
            <Center w={'full'}>
              <Button
              w={'full'}
              colorScheme={'blue'}
              onClick={() => document.querySelector('input').click()}
              >
                Change Icon
              </Button>
              <Input type='file' display='none' ref={fileRef} 
              onChange = {handleImgChange}
              />
            </Center>
          </Stack>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input placeholder='Atharva Kulkarni' 
            value={inputs.name}
            onChange={(e) => setInputs({...inputs, name: e.target.value})}
            _placeholder={{color: 'gray.500'}}
            type='text'
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input placeholder='Username'
            value={inputs.username} 
            onChange={(e) => setInputs({...inputs, username: e.target.value})}
            _placeholder={{color: 'gray.500'}}
            type='text'
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder='your_email@example.com' 
            value={inputs.email}
            onChange={(e) => setInputs({...inputs, email: e.target.value})}
            _placeholder={{color: 'gray.500'}}
            type='email'
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Bio</FormLabel>
          <Input placeholder='Your Bio' 
            value={inputs.bio}
            onChange={(e) => setInputs({...inputs, bio: e.target.value})}
            _placeholder={{color: 'gray.500'}}
            type='text'
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder='Password' 
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password: e.target.value})}
            _placeholder={{color: 'gray.500'}}
            type='password'
          />
        </FormControl>

        <Stack spacing={6} direction={['column','row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w={'full'}
            _hover={{
              bg: 'red.500',
            }}
          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w={'full'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Submit
          </Button>


        </Stack>

      </Stack>

    </Flex>
  )
}

export default UpdateProfile