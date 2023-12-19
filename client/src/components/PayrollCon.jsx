import { Button, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { FaRegCheckCircle } from "react-icons/fa";

const PayrollCon = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"full"}
      p={20}
      gap={168}
      mt={10}
    >
      <Image src="/Payroll.svg" alt="Payroll" />
      <Flex flexDir={"column"} justifyContent={"center"} gap={18}>
        <Text color={"#15357A"} fontSize={"5xl"} fontWeight={400}>
          Run compliant payroll for your global team in minutes
        </Text>
        <Flex
          flexDir={"column"}
          fontSize={"2xl"}
          textAlign={"center"}
          fontWeight={400}
        >
          <Flex gap={2}>
            <FaRegCheckCircle size={24} color="#15357A" />
            <Text>
              Pay contractors, EORs, and direct employees on autopilot
            </Text>
          </Flex>
          <Flex gap={2}>
            <FaRegCheckCircle size={24} color="#15357A" />
            <Text>
              We handle taxes, provide benefits, payslips, and way more
            </Text>
          </Flex>
          <Flex gap={2}>
            <FaRegCheckCircle size={24} color="#15357A" />
            <Text>Eliminate admin with automated contractor invoicing</Text>
          </Flex>
          <Flex gap={2}>
            <FaRegCheckCircle size={24} color="#15357A" />
            <Text textAlign={"center"} fontSize={"2xl"}>
              Give your team flexibility with 15+ global payment options
            </Text>
          </Flex>
          <Flex gap={2}>
            <FaRegCheckCircle size={24} color="#15357A" />
            <Text>
              Local, legal, tax, and accounting expertise just a click away
            </Text>
          </Flex>

        </Flex>
          <Button
            w={220}
            size={'lg'}
            color={'#f6f6f6'}
            bg={"#2970FF"}
            fontSize={"xl"}
            transition={"all 1s"}
            _hover={{
              bg: useColorModeValue("#599cff"),
            }}
          >
            Try it now
          </Button>
      </Flex>
    </Flex>
  );
};

export default PayrollCon;
