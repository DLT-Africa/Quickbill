import React from "react";
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
  Container,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { CalendarIcon, ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { BsCalendar2Plus } from "react-icons/bs";

// function Invoice() {
//   return (
//     <>
//       <Flex
//         border={"1px solid black"}
//         width={"full"}
//         borderRadius={10}
//         flexDir={"column"}
//         justifyContent={"center"}
//         alignItems={"center"}
//         // ml="300px"
//         // mt="141px"
//         // mb="58px"
//         bg={"#fff"}
//       >
//         <Flex flexDir={"column"} float={"right"}>
//           <Box as={"h1"} fontSize={"xl"} fontWeight={700}>
//             INVOICE
//           </Box>
//           <Box as={"h3"} fontSize={"sm"} fontWeight={400}>
//             invoice#: 003
//           </Box>
//         </Flex>
//         <Divider />

//         <Flex alignItems={"flex-start"}>
//           <Text fontSize={"2xl"} fontWeight={500}>
//             BILL TO
//           </Text>
//           <Box>
//             <Select>
//               <option></option>
//             </Select>
//           </Box>
//         </Flex>
//       </Flex>
//     </>
//   );
// }

// export default Invoice;

function Invoice() {
  return (
    <>
      <Box py={10} border={"1px solid black"} bg={"#fff"} borderRadius={10}>
        <Box textAlign={"right"} px={10}>
          <Text fontSize={"36px"} fontWeight={700}>
            INVOICE{" "}
          </Text>
          <Text fontWeight={400} fontSize={"26px"}>
            Invoice #: 003
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
            <Text pb={"25"}>Dec, 15th 2023 </Text>

            <Text fontWeight={500}>DUE DATE:</Text>
            <Text pb={"35"}>Dec, 22nd 2023</Text>
            <Text fontSize={"18"} fontWeight={500}>
              
              AMOUNT <br /> NGN 0
            </Text>
          </Box>
        </Flex>
        <Flex justifyContent={"space-between"} alignItems={"center"}></Flex>

        <Box mt={8}>
          <Table variant="striped" colorScheme="gray.600">
            <Thead>
              <Tr bg={"#F4F4F4"}>
                <Td>Item</Td>

                <Td>Qty</Td>
                <Td>Price</Td>
                <Td>Disc(%)</Td>
                <Td>Amount</Td>
                <Td>Action</Td>
              </Tr>
            </Thead>

            <Tr>
              <Td >
              <Input placeholder="Item name or description" width={300} />

                </Td>
              <Td>
                {" "}
                <Input placeholder="0" width={40} />
              </Td>
              <Td>
                {" "}
                <Input placeholder="0" width={40} />
              </Td>
              <Td>
                {" "}
                <Input placeholder="0" width={40} />
              </Td>
              <Td>
                {" "}
                <Input placeholder="0" width={40} />
              </Td>
              <Box pt={5} pl={10}>
                <DeleteIcon />
              </Box>
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
          <Flex flexDir={"column"} py={5}>
            <Text color={"gray"}>Tax Rate (%)</Text>
            <Text>0</Text>
            <Divider borderColor={"#1c1c1c"} w={"200px"} />
          </Flex>

          <Flex flexDir={"column"} py={5}>
            <Box>
              <Flex gap={2} justifyContent={"center"} alignItems={"center"}>
                <Text color={"gray"}>
                  Due Date <br/>
                </Text>

                <Text>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                  />
                </Text>
              </Flex>
            </Box>

            <Divider borderColor={"#1c1c1c"} w={"200px"} />
          </Flex>
          <Flex flexDir={"column"} py={5}>
            <Select placeholder="Select Currency" size="sm" />

            <Divider borderColor={"#1c1c1c"} w={"200px"} />
          </Flex>
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
