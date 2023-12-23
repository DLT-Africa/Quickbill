import {
  Flex,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Textarea,
  Input,
  Image,
  CloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const Employees = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    <TableContainer p={20}>
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} mb={10}>
          <Text color={"#1c1c1c"} fontSize={"5xl"} fontWeight={500}>
            Employees.....
          </Text>
          <Button
            size={"lg"}
            borderRadius={"10px"}
            _hover={{ bg: "#599cff" }}
            transition={'all 1s'}
            fontSize={"2xl"}
            color={"#FFF"}
            bg={"#2970FF"}
            onClick={onOpen}
          >
            Add An Employee
          </Button>
      </Flex>
  <Table variant={'simple'} size={'lg'} >
    <Thead bg={"rgba(55, 73, 87, 0.1)"} >
      <Tr>
        <Th fontSize={'xl'} textAlign={'center'}>Name</Th>
        <Th fontSize={'xl'} textAlign={'center'}>Email</Th>
        <Th fontSize={'xl'} textAlign={'center'}>Job Title</Th>
        <Th fontSize={'xl'} textAlign={'center'}>Department</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr bg={"#FFFFFF"}>
        <Td textAlign={'center'}>Abiodun Kennymas</Td>
        <Td textAlign={'center'}>kennymas4luv@gmail.com</Td>
        <Td textAlign={'center'}>Project Manager</Td>
        <Td textAlign={'center'}>Fullstack Developer</Td>
      </Tr>
      <Tr bg={"#FFFFFF"}>
        <Td textAlign={'center'}>Jimoh Nasihudeen</Td>
        <Td textAlign={'center'}>nasihudeen04@gmail.com</Td>
        <Td textAlign={'center'}>Project Supervisor</Td>
        <Td textAlign={'center'}>Backend Developer</Td>
      </Tr>
      <Tr bg={"#FFFFFF"}>
        <Td textAlign={'center'}>Musa Mohammad</Td>
        <Td textAlign={'center'}>musamohammadolayinka@gmail.com</Td>
        <Td textAlign={'center'}>Project Lead</Td>
        <Td textAlign={'center'}>Frontend Developer</Td>
      </Tr>
      <Tr bg={"#FFFFFF"}>
        <Td textAlign={'center'}>Yusuf Roqib</Td>
        <Td textAlign={'center'}>yusufroqib@gmail.com</Td>
        <Td textAlign={'center'}>Project Manager</Td>
        <Td textAlign={'center'}>Fullstack Developer</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>

      <Modal isOpen={isOpen} onClose={onClose} w={"full"}>
        <ModalOverlay />
        <ModalContent py={10} px={2}>
          <ModalHeader>Employee Details.....</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Flex gap={5} flexDir={"column"}>
                <Input
                  border={"1px"}
                  w={"full"}
                  size={"lg"}
                  placeholder="Employee's Email Address (Required)"
                  type="email"
                  isRequired
                  borderRadius={"10px"}
                />

                <Flex gap={15}>
                  <Input
                    border={"1px"}
                    w={"full"}
                    type="text"
                    size={"lg"}
                    isRequired
                    _placeholder={{
                      fontSize: "sm",
                    }}
                    borderRadius={"10px"}
                    placeholder="First Name (Required)"
                  />
                  <Input
                    border={"1px"}
                    w={"full"}
                    size={"lg"}
                    type="text"
                    isRequired
                    _placeholder={{
                      fontSize: "sm",
                    }}
                    borderRadius={"10px"}
                    placeholder="Last Name (Required)"
                  />
                </Flex>

                <Flex gap={"15px"}>
                  <Input
                    w={"full"}
                    type="text"
                    size={"lg"}
                    _placeholder={{
                      fontSize: "sm",
                    }}
                    borderRadius={"10px"}
                    placeholder="Category"
                  />
                  <Input
                    w={"full"}
                    size={"lg"}
                    type="text"
                    _placeholder={{
                      fontSize: "sm",
                    }}
                    borderRadius={"10px"}
                    placeholder="Department"
                  />
                </Flex>
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              size={"lg"}
              borderRadius={"10px"}
              transition={'all 1s'}
              bg={"#2970FF"}
              color={"#FFF"}
              _hover={{ bg: "#599cff" }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Employees;
