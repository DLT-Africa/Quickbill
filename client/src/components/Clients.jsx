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
import SidebarWithHeader from "./SidebarWithHeader";

const Clients = () => {
  return (
    <>
      <SidebarWithHeader>
        <Flex px={5} justifyContent={"space-between"}>
          <Text fontSize={36} textAlign={"left"} fontWeight={700}>
            Clients
          </Text>
          <Flex>
            <Button pos={"relative"} bg={"#2970ff"} color={"#f6f6f6"} _hover={{ bg: "#6C73EF" }}>
              Add New Clients
            </Button>
          </Flex>
        </Flex>
        <TableContainer px={5} fontWeight={500} top={11} left={27} mt={20}>
          <Table>
            <Thead>
              <Tr
                p={4}
                borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
                borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
                bg={"rgba(55, 73, 87, 0.1)"}
              >
                <Th color={"#1c1c1c"} fontSize={"l"}>
                  Creation Date
                </Th>
                <Th color={"#1c1c1c"} fontSize={"l"}>
                  Email
                </Th>
                <Th color={"#1c1c1c"} fontSize={"l"}>
                  Edit
                </Th>
                <Th color={"#1c1c1c"} fontSize={"l"}>
                  Delete
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Jimoh Kanas</Td>
                <Td> jimohkanas91@gmail.com</Td>
                <Td>
                  <FaEdit cursor={"pointer"} fontSize={"20"} />
                </Td>
                <Td>
                  <MdDelete cursor={"pointer"} fontSize={"20"} />
                </Td>
              </Tr>
              <Tr>
                <Td>Musa Muhammed</Td>
                <Td> muha_smallkay@gmail.com</Td>
                <Td>
                  <FaEdit cursor={"pointer"} fontSize={"20"} />
                </Td>
                <Td>
                  <MdDelete cursor={"pointer"} fontSize={"20"} />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </SidebarWithHeader>
    </>
  );
};

export default Clients;
