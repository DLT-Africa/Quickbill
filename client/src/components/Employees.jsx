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

const Employees = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        gap={4}
        alignItems={"center"}
        m={10}
        // h={"100vh"}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text color={"#1c1c1c"} fontSize={"5xl"} fontWeight={500}>
            Employees
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

        <Flex
          bg={"#ECF1F6"}
          justifyContent={"space-between"}
          w={"full"}
          px={20}
          py={8}
          alignItems={"center"}
          fontSize={"xl"}
          fontWeight={400}
        >
          <Text>Name</Text>
          <Text>Email</Text>
          <Text>Category</Text>
          <Text>Department</Text>
        </Flex>

        <Flex flexDir={'column'} gap={5} w={'full'}>
          <Flex
            bg={"#FFFFFF"}
            px={10}
            py={15}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
            fontSize={"xl"}
            fontWeight={300}
          >
            <Text>Abiodun Kennymas</Text>
            <Text>kennymas4luv@gmail.com</Text>
            <Text>Project Manager</Text>
            <Text>Fullstack Developer</Text>
          </Flex>
          <Flex
            bg={"#FFFFFF"}
            px={10}
            py={15}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
            fontSize={"xl"}
            fontWeight={300}
          >
            <Text>Jimoh Nasihudeen</Text>
            <Text>nasihudeen04@gmail.com</Text>
            <Text>Project Supervisor</Text>
            <Text>Backend Developer</Text>
          </Flex>
          <Flex
            bg={"#FFFFFF"}
            px={10}
            py={15}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
            fontSize={"xl"}
            fontWeight={300}
          >
            <Text>Musa Mohammad</Text>
            <Text>musamohammad@gmail.com</Text>
            <Text>Project Lead</Text>
            <Text>Frontend Developer</Text>
          </Flex>
          <Flex
            bg={"#FFFFFF"}
            px={10}
            py={15}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
            fontSize={"xl"}
            fontWeight={300}
          >
            <Text>Yusuf Roqib</Text>
            <Text>yusufroqib@gmail.com</Text>
            <Text>Project Manager</Text>
            <Text>Fullstack Developer</Text>
          </Flex>
        </Flex>
      </Flex>

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
