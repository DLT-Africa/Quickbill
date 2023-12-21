import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tr,
  Td,
  Thead,
  Table,
  Th,
  Tbody,
} from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Payroll = () => {
  const billsData = [
    {
      id: 1,
      name: "Musa Muhammed",
      department: "Enginer",
      payMethod: 'Crypto',
      amount: 50000,
      status: "Awaiting",
    },
  ];

  return (
    <>
      <Box as="section" px={20}>
        <Flex flexDir={"column"} gap={10}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex flexDir={"column"} gap={8}>
              <Flex flexDir={"column"}>
                <Text as={"h1"} fontSize={"5xl"} fontWeight={400}>
                  Payroll
                </Text>
                <Text as={"h4"} fontSize={"xl"}>
                  Get a global overview
                </Text>
              </Flex>

              <Flex gap={10}>
                <Flex
                  flexDir={"column"}
                  bg={"#DEEBF7"}
                  py={2}
                  px={6}
                  borderRadius={10}
                  border={"1px solid #fff"}
                >
                  <Text fontSize={"3xl"} fontWeight={700}>
                    $0.00
                  </Text>
                  <Text fontSize={"xl"} fontWeight={500} color={"#8E8E8E"}>
                    Paid this month
                  </Text>
                </Flex>
                <Flex
                  flexDir={"column"}
                  py={2}
                  px={6}
                  bg={"#fff"}
                  borderRadius={10}
                >
                  <Text fontSize={"3xl"} fontWeight={700}>
                    $0.00
                  </Text>
                  <Text fontSize={"xl"} fontWeight={500} color={"#8E8E8E"}>
                    Left to pay this month
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Box>
              <Button
                size={"lg"}
                bg={"#2970FF"}
                color={"#F6F6F6"}
                transition={"all 1s"}
                fontSize={"xl"}
                _hover={{
                  bg: useColorModeValue("#599cff"),
                }}
              >
                One-Off-Payment
              </Button>
            </Box>
          </Flex>

          <Flex gap={5}>
            <Flex>
              <Flex bg={"#fff"} py={8} px={5} gap={10} flexDir={"column"}>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={10}
                >
                  <Text as={"h1"} fontSize={"3xl"} fontWeight={400}>
                    Overall Payouts
                  </Text>
                  <Flex>
                    <Text
                      as={"h4"}
                      fontSize={"lg"}
                      fontWeight={300}
                      color={"#8E8E8E"}
                    >
                      3m
                    </Text>
                    <ChevronDownIcon cursor={"pointer"} boxSize={6} />
                  </Flex>
                </Flex>

                <Flex flexDir={"column"} gap={2}>
                  <Flex
                    bg={"#DEEBF7"}
                    border={"1px solid #F0EEEE"}
                    py={6}
                    px={2}
                    borderRadius={4}
                  >
                    <Text
                      as={"h2"}
                      fontSize={"lg"}
                      fontWeight={500}
                      color={"#8E8E8E"}
                    >
                      $20k
                    </Text>
                  </Flex>

                  <Flex
                    bg={"#DEEBF7"}
                    border={"1px solid #F0EEEE"}
                    py={6}
                    px={2}
                    borderRadius={4}
                    fontSize={"lg"}
                    fontWeight={500}
                    color={"#8E8E8E"}
                    gap={10}
                  >
                    <Text as={"h2"}>$20k</Text>
                    <Text>You have no data to display for more activities</Text>
                  </Flex>

                  <Flex
                    bg={"#DEEBF7"}
                    border={"1px solid #F0EEEE"}
                    py={6}
                    px={2}
                    borderRadius={4}
                  >
                    <Text
                      as={"h2"}
                      fontSize={"lg"}
                      fontWeight={500}
                      color={"#8E8E8E"}
                    >
                      $20k
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex bg={"#fff"} py={8} px={5} gap={10} flexDir={"column"}>
              <Flex alignItems={"center"} gap={10}>
                <Flex flexDir={"column"} gap={4}>
                  <Text as={"h1"} fontSize={"3xl"} fontWeight={400}>
                    Payout by Department
                  </Text>
                  <Text
                    as={"h1"}
                    fontSize={"2xl"}
                    fontWeight={300}
                    color={"#8E8E8E"}
                  >
                    Last 3 months
                  </Text>
                </Flex>
              </Flex>

              <Flex flexDir={"column"} gap={2}>
                <Flex
                  bg={"#DEEBF7"}
                  border={"1px solid #F0EEEE"}
                  py={6}
                  px={2}
                  borderRadius={4}
                >
                  <Text
                    as={"h2"}
                    fontSize={"lg"}
                    fontWeight={500}
                    color={"#8E8E8E"}
                  >
                    $20k
                  </Text>
                </Flex>

                <Flex
                  bg={"#DEEBF7"}
                  border={"1px solid #F0EEEE"}
                  py={6}
                  px={2}
                  borderRadius={4}
                  fontSize={"lg"}
                  fontWeight={500}
                  color={"#8E8E8E"}
                  gap={10}
                >
                  <Text as={"h2"}>$20k</Text>
                  <Text>You have no data to display for more activities</Text>
                </Flex>

                <Flex
                  bg={"#DEEBF7"}
                  border={"1px solid #F0EEEE"}
                  py={6}
                  px={2}
                  borderRadius={4}
                >
                  <Text
                    as={"h2"}
                    fontSize={"lg"}
                    fontWeight={500}
                    color={"#8E8E8E"}
                  >
                    $20k
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Box px={5}>
            <Tabs float={"right"} size={'lg'}>
              <TabList>
                <Tab>All (1)</Tab>
                <Tab>Paid (0)</Tab>
                <Tab>Awaiting Payment (1)</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  
                </TabPanel>

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
          >
            <Table variant="simple" colorScheme="gray" size={"lg"}>
              <Thead>
                <Tr
                  p={4}
                  borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
                  borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
                  bg={"rgba(55, 73, 87, 0.1)"}
                 
                >
                  <Th fontSize={"xl"}>
                    Name
                  </Th>
                  <Th fontSize={"xl"}>
                    Department
                  </Th>
                  <Th fontSize={"xl"}>
                    Amount
                  </Th>
                  <Th fontSize={"xl"}>
                    Payment Method
                  </Th>
                  <Th fontSize={"xl"}>
                    Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>

                <Tr>
                  <Td>Jimoh Kanas</Td>
                  <Td> Enginers</Td>
                  <Td>NGN 10,000 </Td>
                  <Td> Crypto </Td>
                  <Td >
                    <Text color={"rgba(229, 211, 53, 0.50)"} fontWeight={700}>
                      Awaiting
                    </Text>
                  </Td>
                </Tr>

              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Payroll;
