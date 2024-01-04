import { Button, CloseButton, Flex, Image, useColorModeValue } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { FormControl, Textarea, Text, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useRef } from 'react'
import usePreviewImg from '../../hooks/usePreviewImg'
import { BsFillImageFill } from 'react-icons/bs'
import { useRecoilValue } from 'recoil'
import { userAtom } from "../atoms/userAtom"
const Max_char = 500

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText, setPostText] = useState('')
    const {handleImgChange,imgURL,setImgURL} = usePreviewImg()
    const fileRef = useRef(null);
    const [remainingChar, setRemainingChar] = useState(Max_char)
    const user = useRecoilValue(userAtom)
    const [loading, setLoading] = useState(false)

    const handletextchange = (e) => {
      const inputText = e.target.value;
      if(inputText.length > Max_char){
        const truncatedText = inputText.slice(0,Max_char);
        setPostText(truncatedText);
        setRemainingChar(0)
      }else{
        setPostText(inputText);
        setRemainingChar(Max_char - inputText.length)
      }

    }

    const handleCreatePost = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/posts/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({postedBy: user._id, text: postText, img: imgURL}),
        })
        const data = await res.json()
        if(data.error){
          console.log(data.error)
        }
        alert('Post Created')
        console.log(data)
        onClose()
        setPostText('')
        setImgURL('')
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
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
                    {remainingChar}/{Max_char}
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
            <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost