import { Box, Button, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { FaRegCheckCircle } from "react-icons/fa";

const PayrollCon = () => {
  return (
    <Flex
      flexDir={{ base: "column", lg: 'row', md: 'column' }}
      justifyContent={'space-between'}
      w={"full"}
      p={{ base: 10, md: 20 }}
      gap={{ base: 18, md: 10 }}
      // mt={10}
    >
      <Image src="/Payroll.svg" alt="Payroll" w={{md: 520, lg: 420}} />
      <Flex flexDir={"column"} justifyContent={"center"} gap={18}>
        <Text color={"#15357A"} fontSize={{ base: '3xl', md: "3xl", lg: '4xl' }} fontWeight={400}>
          Run compliant payroll for your global team in minutes
        </Text>
        <Flex
          flexDir={"column"}
          // fontSize={"2xl"}
          fontWeight={400}
          gap={2}
        >
          <Flex gap={2}>
            <FaRegCheckCircle size={20} color="#15357A" />
            <Text fontSize={{ base: 'lg', md: 'xl', lg: 'xl' }}>
              Pay contractors, EORs, and direct employees on autopilot
            </Text>
          </Flex>
          <Flex gap={2}>
            <FaRegCheckCircle size={20} color="#15357A" />
            <Text fontSize={{ base: 'lg', md: 'xl', lg: 'xl' }}>
              We handle taxes, provide benefits, payslips, and way more
            </Text>
          </Flex>
          <Flex gap={2}>
            <FaRegCheckCircle size={20} color="#15357A" />
            <Text fontSize={{ base: 'lg', md: 'xl', lg: 'xl' }}>Eliminate admin with automated contractor invoicing</Text>
          </Flex>
          <Flex gap={2}>
            <FaRegCheckCircle size={20} color="#15357A" />
            <Text fontSize={{ base: 'lg', md: 'xl', lg: 'xl' }}>
              Give your team flexibility with 15+ global payment options
            </Text>
          </Flex>
          <Flex gap={2}>
            <FaRegCheckCircle size={20} color="#15357A" />
            <Text fontSize={{ base: 'lg', md: 'xl', lg: 'xl' }}>
              Local, legal, tax, and accounting expertise just a click away
            </Text>
          </Flex>

        </Flex>
        <Button
          w={220}
          size={{ base: 'md', md: 'lg' }}
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
