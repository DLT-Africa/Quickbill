import React, { useEffect, useState } from "react";
import { format } from 'date-fns';

import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
  Divider,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import {  ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import invoiceAtom from "../atoms/invoiceAtom";
import userAtom from "../atoms/userAtom";
import { axiosInstance } from "../../api/axios";

function Invoice() {
  const [invoice, setInvoice] = useRecoilState(invoiceAtom)
  const [user, setUser] = useRecoilState(userAtom)
  const [currentInvoiceNumber, setcurrentInvoiceNumber] = useState('')


  useEffect(() => {
    const getInvoiceNo = async () => {
      try {
        const response = await axiosInstance.get("/invoices")
        const data = response.data
        const totalInvoices = data.length
        const newInvNo = totalInvoices+1
        const formattedInvoiceNumber = newInvNo.toString().padStart(3, '0')
        setcurrentInvoiceNumber(formattedInvoiceNumber)
      } catch (error) {
       console.log(error)
      }
    }

    getInvoiceNo()
  }, [])
  
  return (
    <>
      <Box m={10} py={10} border={"1px solid black"} bg={"#fff"} borderRadius={10}>
        <Box textAlign={"right"} px={10}>
          <Text fontSize={"36px"} fontWeight={700}>
            INVOICE{" "}
          </Text>
          <Text fontWeight={400} fontSize={"26px"}>
            Invoice #: {currentInvoiceNumber}
          </Text>
        </Box>
        <Box borderBottom="1px" borderColor="gray" w={"full"}></Box>

        <Flex justifyContent={"space-between"} pt={"27"} pb={"2"} px={10}>
          <Box>
            <Text as={"h2"} fontWeight={600}>
              Bill To
            </Text>
            <Menu>
              <MenuButton
                px={4}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "#fff" }}
                _focus={{ boxShadow: "outline" }}
              >
                Select customer <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem>*New customer</MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box>
            <Text as={"h2"} fontWeight={500} fontSize={"18"}>
              STATUS
            </Text>
            <Text
              as={"h2"}
              fontWeight={400}
              color={"red"}
              pb={"5"}
              fontSize={"20"}
            >
              Unpaid
            </Text>

            <Text fontWeight={500} fontSize={"18"}>
              DATE:
            </Text>
            <Text pb={"25"}>{format(new Date(), 'PP')} </Text>

            <Text fontWeight={500}>DUE DATE:</Text>
            <Text pb={"35"}>Dec, 22nd 2023</Text>
            <Text fontSize={"18"} fontWeight={500}>
              
              AMOUNT <br /> NGN 0
            </Text>
          </Box>
        </Flex>
        <Flex justifyContent={"space-between"} alignItems={"center"}></Flex>

        <Box mt={8}>
          <Table variant="striped"  colorScheme="gray.600">
            <Thead>
              <Tr bg={"#F4F4F4"}>
                <Td w={300}>Item</Td>

                <Td>Qty</Td>
                <Td>Price</Td>
                <Td>Disc(%)</Td>
                <Td>Amount</Td>
                <Td>Action</Td>
              </Tr>
            </Thead>

            <Tr>
              <Td >
              <Input placeholder="Item name or description"  />

                </Td>
              <Td>
                <Input placeholder="0" type="number"/>
              </Td>
              <Td>
                <Input placeholder="0" type="number"/>
              </Td>
              <Td>
                <Input placeholder="0" type="number"/>
              </Td>
              <Td>
                <Input placeholder="0" type="number"/>
              </Td>
              <Td>
                <DeleteIcon />
              </Td>
            </Tr>
          </Table>
        </Box>

        <Button ml={10} mt={5} bg={"#2970FF"} borderRadius="50%" color={"#fff"}>
          +
        </Button>

        <Box mt={100} pl={700}>
          <Table variant="striped" fontSize={'20px'} fontWeight={500} color={"gray"} >
            <Thead pl={2}>
              <Tr>
                <Td borderBottom={"1px solid black"}  bg="#F4F4F4">Invoice Summary </Td>
              </Tr>

              <Tr >
                 <Flex justifyContent={'space-between'} color={"gray"} borderBottom={"1px solid black"}>
                  <Td  color={"gray"}>Sub Total: </Td>
                  <Td  color={'gray'}>0</Td>
                 </Flex>
              </Tr>

              <Tr >
                 <Flex justifyContent={'space-between'} color={"gray"} borderBottom={"1px solid black"}>
                  <Td  color={"gray"}>VAT(%): </Td>
                  <Td  color={'gray'}>0</Td>
                 </Flex>
              </Tr>
              <Tr >
                 <Flex justifyContent={'space-between'} color={"gray"} borderBottom={"1px solid black"}>
                  <Td  color={"gray"}>Total: </Td>
                  <Td color={'gray'}>0</Td>
                 </Flex>
              </Tr>

            </Thead>
          </Table>
        </Box>

        <Flex
          p={4}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={10}
        >
          <Flex flexDir={"column"} gap={2}>
            <Text color={"gray"}>Tax Rate (%)</Text>
            <Input
                    placeholder="0"
                    size="md"
                    type="number"
                  />
          </Flex>

          
              <Flex flexDir={'column'} gap={2} >
                <Text color={"gray"}>
                  Due Date 
                </Text>

                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                  />
              </Flex>
              <Flex flexDir={'column'} gap={2} >
                <Text color={"gray"}>
                  Currency
                </Text>
                <Select placeholder="Select Currency" size="md" />

              </Flex>

          {/* <Flex flexDir={"column"} py={5}>
            <Select placeholder="Select Currency" size="sm" />

            <Divider borderColor={"#1c1c1c"} w={"200px"} />
          </Flex> */}
        </Flex>
        <Flex pb={"30px"} flexDir={"column"} px={10} pt={"17px"}>
          <Text>Note/Additional Information</Text>
          <Box>
            <Textarea placeholder="Kindly provide additional details or terms of service " />
          </Box>
        </Flex>

        <Box mt={8}>
          <Flex justifyContent="center" pb={5}>
            <Button bg={"#2970FF"}>Create and send</Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default Invoice;
