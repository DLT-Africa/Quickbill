import React from "react";

import { Flex, Text, Image, SimpleGrid, Card, CardHeader} from "@chakra-ui/react";

const AboutUsTeam = () => {
  return (
    <>
      <Flex
        py={15}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"#EBF5FE"}
      >
        <Text as={"h2"} fontWeight={800} mt={10} mb={20}>
          Meet our <span>team</span> members
        </Text>

        <SimpleGrid spacing={10} templateColumns='repeat(3, minmax(50px, 1fr))' >
  <Card width={250} height={400} px={3} boxShadow={'lg'}>
    <CardHeader>
      <Image src="/Ola.jpg" width={200} height={200} />
    </CardHeader>
   
      <Text fontWeight={600} mt={0}  textAlign={'center'} textColor={'#2970FF'}>Qadir Adesoye</Text>
      <Text textAlign={'center'} fontWeight={10}>Full-stack dev.</Text>
      <Text textAlign={'center'}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Text>

  </Card>

  <Card width={250} height={400} px={3} boxShadow={'lg'}>
    <CardHeader>
      <Image src="/Rocco.jpg" width={200} height={200} />
    </CardHeader>
   
      <Text fontWeight={600} mt={0}  textAlign={'center'} textColor={'#2970FF'}>Yusuf Roqib</Text>
      <Text textAlign={'center'} fontWeight={10}>Full-stack dev.</Text>
      <Text textAlign={'center'}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Text>

  </Card>

  <Card width={250} height={400} px={3} boxShadow={'lg'}>
    <CardHeader>
      <Image src="/kenny.jpg" width={200} height={200} />
    </CardHeader>
   
      <Text fontWeight={600} mt={0}  textAlign={'center'} textColor={'#2970FF'}>Abiodun Kehinde</Text>
      <Text textAlign={'center'} fontWeight={10}>Full-Stack dev.</Text>
      <Text textAlign={'center'}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Text>

  </Card>

  <Card width={250} height={400} px={3} boxShadow={'lg'}>
    <CardHeader>
      <Image src="/Muhammed.jpg" width={200} height={200} />
    </CardHeader>
   
      <Text fontWeight={600} mt={0}  textAlign={'center'} textColor={'#2970FF'}>Muhammad Musa</Text>
      <Text textAlign={'center'} fontWeight={10}>Front-End dev.</Text>
      <Text textAlign={'center'}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Text>

  </Card>

  <Card width={250} height={400} px={3} boxShadow={'lg'}>
    <CardHeader>
      <Image src="/Mua'z.jpg" width={200} height={200} />
    </CardHeader>
   
      <Text fontWeight={600} mt={0}  textAlign={'center'} textColor={'#2970FF'}>Mua'z Alimi</Text>
      <Text textAlign={'center'} fontWeight={10}>Front-End dev.</Text>
      <Text textAlign={'center'}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Text>

  </Card>

  <Card width={250} height={400} px={3} boxShadow={'lg'}>
    <CardHeader>
      <Image src="/Nasiudeen.jpg" width={200} height={200} />
    </CardHeader>
   
      <Text fontWeight={600} mt={0}  textAlign={'center'} textColor={'#2970FF'}>Nasiudeen Jimoh</Text>
      <Text textAlign={'center'} fontWeight={10}>Back-End dev.</Text>
      <Text textAlign={'center'}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Text>

  </Card>

</SimpleGrid>
  
<SimpleGrid spacing={10} templateColumns='repeat(2, minmax(50px, 1fr))' my={8} >

  <Card width={250} height={400} px={3} boxShadow={'lg'}>
    <CardHeader>
      <Image src="/pupsyAlia.jpg" width={200} height={200} />
    </CardHeader>
   
      <Text fontWeight={600} mt={0}  textAlign={'center'} textColor={'#2970FF'}>Jimoh Tajudeen</Text>
      <Text textAlign={'center'} fontWeight={10}>Front-End dev.</Text>
      <Text textAlign={'center'}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Text>

  </Card>
  

  <Card width={250} height={400} px={3} boxShadow={'lg'}> 
    <CardHeader>
      <Image src="/supreme.jpg" width={200} height={200} />
    </CardHeader>
   
      <Text fontWeight={600} mt={0}  textAlign={'center'} textColor={'#2970FF'}>Lamidi Olamide</Text>
      <Text textAlign={'center'} fontWeight={10}>Front-End dev.</Text>
      <Text textAlign={'center'}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Text>

  </Card>
  
</SimpleGrid>
        
      </Flex>
    </>
  );
};

export default AboutUsTeam;
