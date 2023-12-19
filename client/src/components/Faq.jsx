import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { FiMinus } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";

const Faq = () => {
  return (
    <>
      <Flex justifyContent={"center"} align={"center"} mt={20} py={70} px={72}>
        <Flex justifyContent={"center"} alignItems={"center"} p={"auto"}>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem
              bg={"#fff"}
              border={"1px solid #2970FF"}
              boxShadow={"0px 6px 16px 0px rgba(74, 58, 255, 0.19)"}
              borderRadius={10}
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left" fontSize={"2xl"} pr={15}>
                        <Text fontWeight={500}>
                          How can I set up automated reminders for overdue
                          payments and pending approvals?
                        </Text>
                      </Box>
                      {isExpanded ? (
                        <Box borderRadius={"full"} bg={"#2970FF"}>
                          <FiMinus color="#fff" size={20} />
                        </Box>
                      ) : (
                        <Box borderRadius={"full"} bg={"#2970FF"}>
                          <IoAdd color="#fff" size={20} />
                        </Box>
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text as={"p"} fontSize={"xl"}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem
              bg={"#fff"}
              border={"1px solid #2970FF"}
              boxShadow={"0px 6px 16px 0px rgba(74, 58, 255, 0.19)"}
              borderRadius={10}
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        fontSize={"2xl"}
                        pr={15}
                        fontWeight={500}
                      >
                        How can I address common user queries or issues
                        efficiently within the system?
                      </Box>
                      {isExpanded ? (
                        <Box borderRadius={"full"} bg={"#2970FF"}>
                          <FiMinus color="#fff" size={20} />
                        </Box>
                      ) : (
                        <Box borderRadius={"full"} bg={"#2970FF"}>
                          <IoAdd color="#fff" size={20} />
                        </Box>
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize={"xl"}>
                    You can set up automated reminders by going to the
                    "Notification Preferences" section. Here, you can customize
                    reminders for overdue payments and pending approvals. Choose
                    the frequency and preferred communication channels for
                    reminders, such as email or in-app notifications, to keep
                    your team and clients informed and on track.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </>
  );
};

export default Faq;
