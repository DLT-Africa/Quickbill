import {
  Flex,
  Box,
  Text,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
	useColorModeValue,
} from "@chakra-ui/react";
import { GoDownload } from "react-icons/go";
import SidebarWithHeader from "./SidebarWithHeader";
const SentInvoice = () => {
  return (
    <SidebarWithHeader>
      <Flex
        justifyContent={"space-between"}
        // pl={80}
        // pr={20}
        // pt={20}
        px={5}
        flexDir={"row"}
      >
        <Text as={"p"} fontSize={"4xl"} fontWeight={600} color={"black"}>
          Sent invoices
        </Text>
        <Flex gap={"5"}>
          <Button
            transition={"all 1s"}
            bg={"#2970ff"}
            _hover={{
              bg: useColorModeValue("#599cff"),
            }}
            color={"#f5f5f5"}
          >
            Create invoice
          </Button>
          <GoDownload
            // size={'md'}
            fontSize={36}
            // fontWeight={400}
            color={"black"}
            cursor={"pointer"}
          />
        </Flex>
      </Flex>

      <Box px={5}>
        <Tabs float={"right"}>
          <TabList>
            <Tab>All (2)</Tab>
            <Tab>Paid (1)</Tab>
            <Tab>Awaiting Payment (0)</Tab>
            <Tab>Rejected (1)</Tab>
            <Tab>Overdue (0)</Tab>
          </TabList>
          <TabPanels>
            <TabPanel></TabPanel>

            <TabPanel></TabPanel>

            <TabPanel></TabPanel>

            <TabPanel></TabPanel>

            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Box
        p={4}
        display={["none", "none", "none", "flex", "none", "block"]}
        mt={10}
      >
        <Table variant="simple" colorScheme="gray" size={"lg"}>
          <Thead>
            <Tr
              p={4}
              borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
              borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
              bg={"rgba(55, 73, 87, 0.1)"}
            >
              <Th color={"#1c1c1c"} fontSize={"xl"}>
                Creation Date
              </Th>
              <Th color={"#1c1c1c"} fontSize={"xl"}>
                Invoice No.
              </Th>
              <Th color={"#1c1c1c"} fontSize={"xl"}>
                Client
              </Th>
              <Th color={"#1c1c1c"} fontSize={"xl"}>
                Amount
              </Th>
              <Th color={"#1c1c1c"} fontSize={"xl"}>
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>16/12/2023</Td>
              <Td> 001</Td>
              <Td> Jimoh Kanas</Td>
              <Td> NGN 10,000</Td>
              <Td>
                <Text color={"green"} fontWeight={700}>
                  Paid
                </Text>
              </Td>
            </Tr>

            <Tr>
              <Td>16/12/2023</Td>
              <Td> 002</Td>
              <Td>Musa Muhammed</Td>
              <Td> NGN 5,000</Td>
              <Td>
                <Text color={"red"} fontWeight={700}>
                  Rejected
                </Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </SidebarWithHeader>
  );
};

export default SentInvoice;
