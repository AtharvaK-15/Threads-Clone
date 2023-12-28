import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
}
from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'

const UpdateProfile = () => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{base:'2xl', sm:'3xl'}}>
          Update Profile
        </Heading>
        <FormControl id="username">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column','row']} spacing={6}>
            <Center>
              <Avatar size={'xl'} src={'https://bit.ly/broken-link'} >
                <AvatarBadge as={IconButton}
                size={'sm'}
                rounded={'full'}
                top='-10px'
                colorScheme='red'
                aria-label='Remove Image'
                icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
          </Stack>
        </FormControl>

      </Stack>

    </Flex>
  )
}

export default UpdateProfile