import { Flex, Hide, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const Container = () => {
  return (
    <React.Fragment>
      <SimpleGrid
        overflowY={"hidden"}
        bg={"#EBF5FE"}
        py={70}
        px={30}
        w={{ base: "full" }}
        spacing={10}
        templateColumns={{ base: "1fr", lg: "repeat(3, minmax(50px, 1fr))", md: "repeat(2, minmax(50px, 1fr))" }}
      >
        <Text fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} fontWeight={600}>
          Time saving, efficient, compliant, less stressful... and much more!
        </Text>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          gridTemplateColumns={{ sm: ("2, 1fr") }}
          direction={{ base: "column", sm: "row" }}
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 15 }}
          className="Cards"
        >
          <Flex
            py={{ base: 30, md: 25 }}
            px={{ base: 10, md: 5 }}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            gap={25}
            boxSize={"auto"}
            borderRadius={10}
            bg={"#fff"}
            boxShadow={"0px 4px 4px 0px rgba(28, 28, 28, 0.25)"}
          >
            <Text
              fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}
              fontWeight={600}
              textAlign={"center"}
            >
              Accounts <span className="landingPageSpan">Payable</span>
            </Text>
            <Image src="/payable.svg" alt="Payable" />

            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              textAlign={"center"}
              fontWeight={400}
            >
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
            boxSize={"auto"}
            borderRadius={10}
            bg={"#fff"}
            boxShadow={"0px 4px 4px 0px rgba(28, 28, 28, 0.25);"}
          >
            <Text
              fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}
              fontWeight={600}
            >
              Send <span className="landingPageSpan">invoices</span>
            </Text>
            <Image src="/invoices.svg" alt="Send invoises" />

            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              textAlign={"center"}
              fontWeight={400}
            >
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
            <Text
              fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}
              fontWeight={600}
            >
              Account Receivable
            </Text>
            <Image src="/receive.svg" alt="Receive payment" />

            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              textAlign={"center"}
              fontWeight={400}
            >
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
            h={"full"}
            borderRadius={10}
            bg={"#fff"}
            boxShadow={"0px 4px 4px 0px rgba(28, 28, 28, 0.25);"}
          >
            <Text
              fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}
              fontWeight={600}
            >
              Expenses
            </Text>
            <Image src="/expenses.svg" alt="expenses" />

            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              textAlign={"center"}
              fontWeight={400}
            >
              Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Text>
          </Flex>
        </Flex>
      </SimpleGrid>
    </React.Fragment>
  );
};

export default Container;
