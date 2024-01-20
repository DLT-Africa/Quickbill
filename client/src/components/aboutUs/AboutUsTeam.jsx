import React from "react";

import {
  Flex,
  Text,
  Image,
  SimpleGrid,
  Card,
  CardHeader,
} from "@chakra-ui/react";

const AboutUsTeam = () => {
  return (
    <>
      <Flex
        overflowY={"hidden"}
        // py={{ base: 8, md: 15 }}
        py={50}
        px={30}
        flexDir={{ base: "column", md: "column" }}
        templateColumns={{ sm: "2, 1fr" }}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"#EBF5FE"}
      >
        <Text
          as={"h2"}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight={800}
          mt={10}
          mb={20}
        >
          Meet our <span>team</span> members
        </Text>

        <SimpleGrid
          spacing={10}
          gap={{ base: 4, sm: 4 }}
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, minmax(50px, 1fr))",
            md: "repeat(3, minmax(50px, 1fr))",
            lg: "repeat(4, minmax(50px, 1fr))",
          }}
          my={8}
          alignItems={'center'}
        >
          <Card
            width={{ base: "100%", sm: "80%", md: "100%", lg: "full" }}
            height={360}
            px={3}
            boxShadow={"lg"}
            align={"center"}
          >
            <CardHeader>
              <Image
                src="/Ola.jpg"
                width={{ base: "100%", sm: 150, md: "100%" }}
                height={{ base: 200, sm: 150, md: 200 }}
              />
            </CardHeader>

            <Text
              fontWeight={600}
              mt={0}
              textAlign={"center"}
              textColor={"#2970FF"}
            >
              Qadir Adesoye
            </Text>
            <Text textAlign={"center"} fontWeight={10}>
              Full-stack dev.
            </Text>
            <Text textAlign={"center"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Text>
          </Card>
          <Card
            // width={{ base: 250, sm: 200, md: 250 }}
            width={{ base: "100%", sm: "80%", md: "100%", lg: "full" }}
            height={360}
            px={3}
            boxShadow={"lg"}
            align={"center"}
          >
            <CardHeader>
              <Image
                src="/Rocco.jpg"
                width={{ base: "100%", sm: 150, md: "100%" }}
                height={{ base: 200, sm: 150, md: 200 }}
              />
            </CardHeader>

            <Text
              fontWeight={600}
              mt={0}
              textAlign={"center"}
              textColor={"#2970FF"}
            >
              Yusuf Roqib
            </Text>
            <Text textAlign={"center"} fontWeight={10}>
              Full-stack dev.
            </Text>
            <Text textAlign={"center"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Text>
          </Card>
          <Card
            // width={{ base: 250, sm: 200, md: 250 }}
            width={{ base: "100%", sm: "80%", md: "100%", lg: "full" }}
            height={360}
            px={3}
            boxShadow={"lg"}
            align={"center"}
          >
            <CardHeader>
              <Image
                src="/kenny.jpg"
                width={{ base: "100%", sm: 150, md: "100%" }}
                height={{ base: 200, sm: 150, md: 200 }}
              />
            </CardHeader>

            <Text
              fontWeight={600}
              mt={0}
              textAlign={"center"}
              textColor={"#2970FF"}
            >
              Abiodun Kehinde
            </Text>
            <Text textAlign={"center"} fontWeight={10}>
              Full-Stack dev.
            </Text>
            <Text textAlign={"center"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Text>
          </Card>
          <Card
            // width={{ base: 250, sm: 200, md: 250 }}
            width={{ base: "100%", sm: "80%", md: "100%", lg: "full" }}
            height={360}
            px={3}
            boxShadow={"lg"}
            align={"center"}
          >
            <CardHeader>
              <Image
                src="/Muhammed.jpg"
                width={{ base: "100%", sm: 150, md: "100%" }}
                height={{ base: 200, sm: 150, md: 200 }}
              />
            </CardHeader>

            <Text
              fontWeight={600}
              mt={0}
              textAlign={"center"}
              textColor={"#2970FF"}
            >
              Muhammad Musa
            </Text>
            <Text textAlign={"center"} fontWeight={10}>
              Front-End dev.
            </Text>
            <Text textAlign={"center"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Text>
          </Card>
          <Card
            // width={{ base: 250, sm: 200, md: 250 }}
            width={{ base: "100%", sm: "80%", md: "100%", lg: "full" }}
            height={360}
            px={3}
            boxShadow={"lg"}
            align={"center"}
          >
            <CardHeader>
              <Image
                src="/Mua'z.jpg"
                width={{ base: "100%", sm: 150, md: "100%" }}
                height={{ base: 200, sm: 150, md: 200 }}
              />
            </CardHeader>

            <Text
              fontWeight={600}
              mt={0}
              textAlign={"center"}
              textColor={"#2970FF"}
            >
              Mua'z Alimi
            </Text>
            <Text textAlign={"center"} fontWeight={10}>
              Front-End dev.
            </Text>
            <Text textAlign={"center"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Text>
          </Card>
          <Card
            // width={{ base: 250, sm: 200, md: 250 }}
            width={{ base: "100%", sm: "80%", md: "100%", lg: "full" }}
            height={360}
            px={3}
            boxShadow={"lg"}
            align={"center"}
          >
            <CardHeader>
              <Image
                src="/Nasiudeen.jpg"
                width={{ base: "100%", sm: 150, md: "100%" }}
                height={{ base: 200, sm: 150, md: 200 }}
              />
            </CardHeader>

            <Text
              fontWeight={600}
              mt={0}
              textAlign={"center"}
              textColor={"#2970FF"}
            >
              Nasiudeen Jimoh
            </Text>
            <Text textAlign={"center"} fontWeight={10}>
              Back-End dev.
            </Text>
            <Text textAlign={"center"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Text>
          </Card>

          <Card
            // width={{ base: 250, sm: 200, md: 250 }}
            width={{ base: "100%", sm: "80%", md: "100%", lg: "full" }}
            height={360}
            px={3}
            boxShadow={"lg"}
            align={"center"}
          >
            <CardHeader>
              <Image
                src="/pupsyAlia.jpg"
                width={{ base: "100%", sm: 150, md: "100%" }}
                height={{ base: 200, sm: 150, md: 200 }}
              />
            </CardHeader>

            <Text
              fontWeight={600}
              mt={0}
              textAlign={"center"}
              textColor={"#2970FF"}
            >
              Jimoh Tajudeen
            </Text>
            <Text textAlign={"center"} fontWeight={10}>
              Front-End dev.
            </Text>
            <Text textAlign={"center"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Text>
          </Card>

          <Card
            // width={{ base: 250, sm: 200, md: 250 }}
            width={{ base: "100%", sm: "80%", md: "100%", lg: "full" }}
            height={360}
            px={3}
            boxShadow={"lg"}
            align={"center"}
          >
            <CardHeader>
              <Image
                src="/supreme.jpg"
                width={{ base: "100%", sm: 150, md: "100%" }}
                height={{ base: 200, sm: 150, md: 200 }}
              />
            </CardHeader>

            <Text
              fontWeight={600}
              mt={0}
              textAlign={"center"}
              textColor={"#2970FF"}
            >
              Lamidi Olamide
            </Text>
            <Text textAlign={"center"} fontWeight={10}>
              Front-End dev.
            </Text>
            <Text textAlign={"center"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Text>
          </Card>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default AboutUsTeam;
