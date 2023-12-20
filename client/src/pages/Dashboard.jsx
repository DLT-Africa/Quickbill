import { Flex, Text, Box } from "@chakra-ui/react";

import { CgSmileSad } from "react-icons/cg";

import { IoMdCheckmarkCircleOutline, IoMdHappy } from "react-icons/io";
import { MdOutlinePending, MdOutlinePayment } from "react-icons/md";
import SidebarWithHeader from "../components/SidebarWithHeader";
import DashboardContent from "../components/DashboardContent";

export default function Dashboard() {
  return (
    <SidebarWithHeader>
      <Flex flexDir={"column"} placeItems={"center"} gap={10}>
        <Flex
          gap={9}
          flexWrap={"wrap"}
          color={"black"}
          justifyContent={"space-around"}
        >
          <Flex
            w={200}
            h={150}
            bg={"white"}
            borderRadius={9}
            placeItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Flex flexDir={"column"} gap={1}>
              <Text fontSize={"xl"}>$1,000.00</Text>
              <Text fontSize={"sm"} color={"#A09C9C"} fontWeight={700}>
                Payments Received
              </Text>
            </Flex>
            <IoMdCheckmarkCircleOutline size={50} color={"green"} />
          </Flex>
          <Flex
            w={200}
            h={150}
            bg={"white"}
            borderRadius={9}
            placeItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Flex flexDir={"column"} gap={1}>
              <Text fontSize={"xl"}>$0.00</Text>
              <Text fontSize={"sm"} color={"#A09C9C"} fontWeight={700}>
                Pending Amount
              </Text>
            </Flex>
            <MdOutlinePending size={50} color={"#CBEE00"} />
          </Flex>{" "}
          <Flex
            w={200}
            h={150}
            bg={"white"}
            borderRadius={9}
            placeItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Flex flexDir={"column"} gap={1}>
              <Text fontSize={"xl"}>4</Text>
              <Text fontSize={"sm"} color={"#A09C9C"} fontWeight={700}>
                Total Invoices
              </Text>
            </Flex>
            <MdOutlinePayment size={50} color={"#3A13FF"} />
          </Flex>
          <Flex
            w={200}
            h={150}
            bg={"white"}
            borderRadius={9}
            placeItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Flex flexDir={"column"} gap={1}>
              <Text fontSize={"xl"}>3</Text>
              <Text fontSize={"sm"} color={"#A09C9C"} fontWeight={700}>
                Accepted Invoices
              </Text>
            </Flex>
            <IoMdHappy size={50} color={"#0BE82A"} />
          </Flex>
          <Flex
            w={200}
            h={150}
            bg={"white"}
            borderRadius={9}
            placeItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Flex flexDir={"column"} gap={1}>
              <Text fontSize={"xl"}>1</Text>
              <Text fontSize={"sm"} color={"#A09C9C"} fontWeight={700}>
                Rejected Invoices
              </Text>
            </Flex>
            <CgSmileSad size={50} color={"#FF1313"} />
          </Flex>
        </Flex>
        <Box bg={"white"} height={400} w={800} borderRadius={20}>
          <DashboardContent />
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
}
