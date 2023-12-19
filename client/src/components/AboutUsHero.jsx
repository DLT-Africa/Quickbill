import {Text, Flex} from '@chakra-ui/react'

const AboutUsHero = () => {
  return (
    <>
   <Flex bg={'#EEEEEE'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
    <Flex mt={20}>
    <Text as={'h1'} fontSize={'4xl'} mb={30} fontWeight={500}>About us</Text>
    </Flex>
    <Flex mb={5}>

    <Text as={'h2'} fontSize={'2xl'}  fontWeight={500}> WE EXIST TO AMPLIFY</Text>
    </Flex>
    <Text fontWeight={300} px={35}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, nostrum 
    vitae! Culpa, officiis voluptatibus facilis id excepturi deleniti dignissimos vero quod est voluptatem. 
    Quis voluptatum cumque illo aut, repellendus laudantium iusto illum numquam. Ad quod perspiciatis laboriosam 
    illo. Ad natus amet voluptatem ex, quas autem! Provident consequatur cumque, architecto corrupti iste quod? 
    Soluta quam placeat architecto repudiandae odio, iste vitae, quibusdam nam omnis quaerat, necessitatibus maiores. 
    Exercitationem, autem sapiente accusamus facilis repellendus cumque temporibus consectetur consequuntur doloribus 
    ratione enim incidunt voluptatem illum perspiciatis. Facilis qui laborum aliquam maiores nemo perferendis, harum 
    dolorem omnis provident odio magni explicabo, libero ipsa impedit!</Text>

   </Flex>
    </>
  )
}

export default AboutUsHero