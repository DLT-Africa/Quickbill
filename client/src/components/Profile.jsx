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
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useRef, useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'

const Profile = () => {
  const [user, setUser] = useRecoilState(userAtom)
  const fileRef = useRef(null)
  const { handleImageChange, imgUrl } = usePreviewImg()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axiosInstance.put(
  //       "/account/profile",
  //       JSON.stringify({ name, email, password })
  //     );
  //     const loggedUser = response.data.loggedInUser;
  //     localStorage.setItem("user-quickBill", JSON.stringify(loggedUser));
  //     setUser(loggedUser);

  //     showToast("Success", "Profile update successfully", "success")
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <form>
      <Flex
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
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" boxShadow={'md'} src={imgUrl} />
              </Center>
              <Center w="full">
                <Button onClick={() => fileRef.current.click()} w="full">Change Avatar</Button>
                <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="John Doe"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              type='submit'
              _hover={{
                bg: 'blue.500',
              }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  )
}

export default Profile