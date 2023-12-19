import {
  Flex,
  Box,
  Text,
  Button,
  Divider,
  Stack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
 
} from "@chakra-ui/react";
import { GoDownload } from "react-icons/go";
const Invoice = () => {
  return (
    <>
      <Flex
        // bg={"#EEEEEE"}
        justifyContent={"space-between"}
        pl={80}
        pr={20}
        pt={20}
      >
        <Text as={"p"} fontSize={36} fontWeight={600} color={"black"}>
          Sent invoices
        </Text>
        <Flex>
          <Button bg={"#2970FF"}>Create invoice</Button>
          <GoDownload fontSize={36} fontWeight={400} color={"black"} />
        </Flex>
      </Flex>

      <Flex>
        <Stack
          border="2px"
          borderColor="black"
          direction={"row"}
          h="50"
          gap={5}
          mt={10}
          borderTopRightRadius="10px"
          borderTopLeftRadius="10px"
          pos={"relative"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          fontSize={20}
          ml={1057}
          // width={10}
          pl={5}
          pt={2}
          pr={3}
        >
         
          <Text>All</Text>
          <Divider orientation="vertical" />
          <Text>Paid</Text>
          <Divider orientation="vertical" />
          <Text>Awaiting Payment</Text>
          <Divider orientation="vertical" />
          <Text>Rejected</Text>
          <Divider orientation="vertical" />
          <Text>Overdue</Text> 
           {/* <Divider orientation="vertical" /> */}
        </Stack>
      </Flex>

      <Stack border={"1px solid black"} ml={400} mr={20} />

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
              <Th>Creation Date</Th>
              <Th>InvoiceNumber</Th>
              <Th>Client</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>16/12/2023</Td>
              <Td> 001</Td>
              <Td> Jimoh Kanas</Td>
              <Td> NGN 10,000</Td>
              <Td color={"green"}> Paid</Td>
            </Tr>

            <Tr>
              <Td>16/12/2023</Td>
              <Td> 002</Td>
              <Td>Musa Muhammed</Td>
              <Td> NGN 5,000</Td>
              <Td color={"red"}> Rejected</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Invoice;
