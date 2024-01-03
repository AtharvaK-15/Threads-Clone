import { Button, CloseButton, Flex, Image, useColorModeValue } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { FormControl, Textarea, Text, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useRef } from 'react'
import usePreviewImg from '../../hooks/usePreviewImg'
import { BsFillImageFill } from 'react-icons/bs'

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText, setPostText] = useState('')
    const {handleImgChange,imgURL,setImgURL} = usePreviewImg()
    const fileRef = useRef(null);

    const handletextchange = () => {
    }

    const handleCreatePost = async () => {

    }

  return (
    <>
        <Button position={'fixed'} bottom={10} right={10} leftIcon={<AddIcon />} bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
        >
            Create Post
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            
            <FormControl>
                <Textarea 
                    placeholder="What's on your mind?"
                    onChange={handletextchange}
                    value={postText}
                />

                <Text fontSize={'xs'} fontWeight={'bold'} textAlign={'right'}
                    m={1} color={'gray.800'}
                >
                    500/500
                </Text>

                <Input 
                    type='file'
                    hidden={true}
                    ref={fileRef}
                    onChange={handleImgChange}
                />

                <BsFillImageFill 
                    style={{cursor: 'pointer', marginLeft:'5px'}}
                    size={16}
                    onClick={() => fileRef.current.click()}
                />
            </FormControl>

            {imgURL && (
                <Flex mt={5} w={'full'} position={'relative'}>
                    <Image src={imgURL} alt={'Post Image'} />
                    <CloseButton 
                        onClick={() => setImgURL("")}
                        bg={'gray.800'}
                        position={'absolute'}
                        right={2}
                        top={2}
                    />
                </Flex>
            )}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreatePost}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost