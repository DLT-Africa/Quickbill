import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

const InvoiceCon = () => {
  const [inputValue, setInputValue] = useState(
    "https://app.quickbill.com/create/c94f48ae9d5a6dd4"
  );
  const { hasCopied, onCopy } = useClipboard(inputValue);

  return (
    <>
      <Flex
        // justifyContent={"space-between"}
        mx={10}
        // gap={50}
        mt={30}
        borderRadius={10}
        // mb={10}
        className="bill"
        // maxH={'100vh'}
      >
        {/* <Flex h={"full"}>
          <Image src="/expenses.svg" />
        </Flex> */}
        <Flex
          bg={"#fff"}
          // justifyContent={"space-between"}
          alignItems={"center"}
          flexDir={"column"}
          px={20}
          py={18}
          gap={100}
          borderRadius={10}
          boxShadow={"1px -1px 6px 2px rgba(0,0,0,0.75)"}
          // h={700}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            px={40}
            gap={2}
          >
            <Text as={"h1"} fontSize={"3xl"} fontWeight={600}>
              Invoice Me!
            </Text>
            <Box>
              <Image src="/Rectangle 10213.png" />
            </Box>
            <Text as={"h2"} fontSize={"2xl"} fontWeight={400}>
              You can now easily share your personal or business information
              with your friends or suppliers, to invoice you easily.
            </Text>
          </Flex>
          <Flex flexDir={"column"} alignItems={"flex-end"} gap={10}>
            <Box w={630}>
              <FormControl>
                <FormLabel fontSize={"2xl"}>
                  Select your invitation link
                </FormLabel>
                <Input
                  // size="lg"
                  type="text"
                  _placeholder={{ color: "#1c1c1c" }}
                  bg={"#E9F3FE"}
                  value={inputValue}
                  border={"1px solid black"}
                  py={6}
                  // w={'full'}
                  onChange={(e) => setInputValue(e.target.value)}
                  // px={40}
                />
              </FormControl>
            </Box>
            <Button
              bg={"#2970FF"}
              color={"#F6F6F6"}
              size={"lg"}
              transition={"all 1s"}
              fontSize={"xl"}
              onClick={onCopy}
              _hover={{
                bg: useColorModeValue("#2970FF", "#599cff"),
              }}
              float={"right"}
            >
              {hasCopied ? "Copied!" : "Copy link to share"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default InvoiceCon;
