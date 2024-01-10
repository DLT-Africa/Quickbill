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
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import { encodePayload } from "../../utils/tokenUtils";

const InvoiceMe = () => {
  const user = useRecoilValue(userAtom);
  const payload = { name: user.name, email: user.email, address: user.address };
  const encodedToken = encodePayload(payload);
  const [inputValue, setInputValue] = useState(
    `https://quickbillpay.onrender.com/invoices/create/${encodedToken}`
  );
  const { hasCopied, onCopy } = useClipboard(inputValue);
 

  return (
    <>
      <Flex
        h={'90vh'}
        position={'fixed'}
        p={{base: 2, lg: 10}}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex
          bg={"#fff"}
          alignItems={"center"}
          flexDir={"column"}
          px={{ base: 4, md: 10, lg: 20 }}
          py={18}
          gap={{ base: 20, md: 100 }}
          borderRadius={10}
          boxShadow={"1px -1px 6px 2px rgba(0,0,0,0.75)"}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            px={{ base: 10, md: 20, lg: 40 }}
            gap={2}
          >
            <Text
              as={"h1"}
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              fontWeight={600}
            >
              Invoice Me!
            </Text>
            <Box w={{ base: "50%", lg: "full" }}>
              <Image src="/Rectangle 10213.png" />
            </Box>
            <Text
              as={"h2"}
              fontSize={{ base: "md", md: "xl", lg: "2xl" }}
              fontWeight={400}
            >
              You can now easily share your personal or business information
              with your friends or suppliers, to invoice you easily.
            </Text>
          </Flex>
          <Flex
            flexDir={"column"}
            alignItems={{ base: "center", md: "flex-end" }}
            gap={{ base: 4, md: 10 }}
          >
            <Box w={{ base: "full", md: 250, lg: 630 }}>
              <FormControl width={{base: 350, lg: '100%'}} >
                <FormLabel fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
                  Select your invitation link
                </FormLabel>
                <Input
                  type="text"
                  _placeholder={{ color: "#1c1c1c", fontSize: "lg" }}
                  bg={"#E9F3FE"}
                  size={{ base: "md", md: "lg" }}
                  fontSize={{ base: "sm", md: "lg", lg: "xl" }}
                  value={inputValue}
                  border={"1px solid black"}
                  py={6}
                  disabled
                  // onChange={(e) => setInputValue(e.target.value)}
                />
              </FormControl>
            </Box>
            <Button
              bg={"#2970FF"}
              color={"#F6F6F6"}
              size={{ base: "md", md: "lg" }}
              transition={"all 1s"}
              fontSize={{ base: "sm", md: "lg", lg: "xl" }}
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

export default InvoiceMe;
