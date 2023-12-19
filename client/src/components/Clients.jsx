import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Clients = () => {
  return (
    <>
      <Flex justifyContent={"space-between"} pl={80} pr={20} pt={20}>
        <Text fontSize={36} textAlign={"left"} fontWeight={700}>
          Clients
        </Text>
        <Flex>
          <Button pos={"relative"} bg={"#2970ff"}>
            Add New Clients
          </Button>
        </Flex>
      </Flex>
      <TableContainer
        pl={80}
        pr={20}
        pt={20}
        fontWeight={500}
        top={11}
        left={27}
      >
        <Table>
          <Thead>
            <Tr>
              <Th>Client Name</Th>
              <Th>Email Address</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={20}>
            <Tr>
              <Td>Jimoh Kanas</Td>
              <Td> jimohkanas91@gmail.com</Td>
              <Td>
                <FaEdit cursor={"pointer"} />
              </Td>
              <Td>
                <MdDelete cursor={"pointer"} />
              </Td>
            </Tr>
            <Tr>
              <Td>Musa Muhammed</Td>
              <Td> muha_smallkay@gmail.com</Td>
              <Td>
                
                <FaEdit  cursor={"pointer"}/>
              </Td>
              <Td>
               
                <MdDelete cursor={"pointer"} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Clients;
