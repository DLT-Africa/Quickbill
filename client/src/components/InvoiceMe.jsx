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
import userAtom from "../atoms/userAtom";
import { encodePayload } from '../utils/tokenUtils'

const InvoiceMe = () => {
  const user = useRecoilValue(userAtom)
  const payload = { name: user.name, email: user.email, address: user.address };
  const encodedToken = encodePayload(payload);
  const [inputValue, setInputValue] = useState(
    `https://quickbillpay.onrender.com/invoices/create/${encodedToken}`
    );
    const { hasCopied, onCopy } = useClipboard(inputValue);
    // console.log('Decoded Token:', decodedToken);
    // const decodedToken = decodeToken(encodedToken);
    
// console.log('Encoded Token:', encodedToken);

  return (
    <>
      <Flex
        mx={10}
        mt={30}
        borderRadius={10}
        className="bill"
      >
        <Flex
          bg={"#fff"}
          alignItems={"center"}
          flexDir={"column"}
          px={20}
          py={18}
          gap={100}
          borderRadius={10}
          boxShadow={"1px -1px 6px 2px rgba(0,0,0,0.75)"}
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
                  type="text"
                  _placeholder={{ color: "#1c1c1c" }}
                  bg={"#E9F3FE"}
                  value={inputValue}
                  border={"1px solid black"}
                  py={6}
                  onChange={(e) => setInputValue(e.target.value)}
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

export default InvoiceMe;
