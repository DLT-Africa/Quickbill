import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const Container = () => {
  return (
    <React.Fragment>
      <Flex
        bg={"#EBF5FE"}
        py={70}
        px={30}
        flexDir={"column"}
        alignItems={"center"}
        gap={30}
      >
        <Text fontSize={"3xl"} fontWeight={600}>
          Time saving, efficient, compliant, less stressful... and much more!
        </Text>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          gap={15}
          h={"full"}
          w={"full"}
        >
          <Flex
            py={30}
            px={10}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            gap={25}
            borderRadius={10}
            bg={"#fff"}
            boxShadow={"0px 4px 4px 0px rgba(28, 28, 28, 0.25);"}
          >

          <Text fontSize={'3xl'} fontWeight={600}>Accounts <span className="landingPageSpan">Payable</span></Text>
          <Image src="/payable.svg" alt="Payable" />

            <Text fontSize={"lg"} textAlign={"center"} fontWeight={400}>
              Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Text>
          </Flex>
          <Flex
            py={30}
            px={10}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            gap={25}
            borderRadius={10}
            bg={"#fff"}
            boxShadow={"0px 4px 4px 0px rgba(28, 28, 28, 0.25);"}
          >

          <Text fontSize={'3xl'} fontWeight={600}>Send <span className="landingPageSpan">invoices</span></Text>
          <Image src="/invoices.svg" alt="Send invoises" />

            <Text fontSize={"lg"} textAlign={"center"} fontWeight={400}>
              Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Text>
          </Flex>
          <Flex
            py={30}
            px={10}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            gap={25}
            borderRadius={10}
            bg={"#fff"}
            boxShadow={"0px 4px 4px 0px rgba(28, 28, 28, 0.25);"}
          >
            <Text fontSize={"3xl"} fontWeight={600}>
              Account Receivable
            </Text>
            <Image src="/receive.svg" alt="Receive payment" />

            <Text fontSize={"lg"} textAlign={"center"} fontWeight={400}>
              Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Text>
          </Flex>
          <Flex
            py={30}
            px={10}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            gap={25}
            borderRadius={10}
            bg={"#fff"}
            boxShadow={"0px 4px 4px 0px rgba(28, 28, 28, 0.25);"}
          >
            <Text fontSize={"3xl"} fontWeight={600}>
              Expenses
            </Text>
            <Image src="/expenses.svg" alt="expenses" />

            <Text fontSize={"lg"} textAlign={"center"} fontWeight={400}>
              Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default Container;
