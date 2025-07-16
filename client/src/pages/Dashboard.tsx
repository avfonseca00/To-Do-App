import { Banner } from "@/components/Banner"
import ListItem from "@/components/ListItem"
import Logo from "@/components/Logo"
import TasksList from "@/components/TaksList"
import { ColorModeButton, useColorMode } from "@/components/ui/color-mode"
import { Flex, Heading, HStack, IconButton, Text, VStack } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { RiFunctionLine } from "react-icons/ri"
import { useParams } from "react-router-dom"
import { BASE_URI } from "@/utils/constants"

const Dashboard = () => {

  const {id: userId} = useParams()
  console.log('userId', userId)
  const [user, setUser] = useState('')
  const { colorMode } = useColorMode();

  const actualDate = new Date();
  let greeting =''

  if(actualDate.getHours() >= 12 && actualDate.getHours() <= 20){
    greeting = 'Afternoon'
  } else if(actualDate.getHours() >= 13 && actualDate.getHours() <= 23){
    greeting = 'Evening'
  }else{
    greeting = 'Morning'
  }

  const formatOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const formatDate = actualDate.toLocaleDateString('en-US', formatOptions);

  useEffect(()=>{
    (async()=>{
    const user = await axios.get(`${BASE_URI}/api/users/${userId}`)
      setUser(user.data.data.name);
      console.log(user)
  })()}, [userId])
  
  return (
    <Flex>
      {user!==''?(
        <>
      <VStack 
        w={'365px'} 
        align={'start'} 
        p={'30px'}
        bgColor={
          {
            base: 'gray.50', 
            _dark: "gray.900"
          }
        } 
        h={'dvh'} 
        gap={8}
        >
        <HStack gap={4}>
          <Logo color={colorMode=="light"?"white":"black"} bgColor={colorMode=="light"?"black":"white"}/>
          <VStack align={"start"} gap={0}>
            <Heading>Task.io</Heading>
            <Text color={{base:"gray.900", _dark: "gray.300"}}>{user}</Text>
          </VStack>
        </HStack>
        <VStack w={"full"} align={'start'} gap={4}>
          <Heading size={'xl'} color={{base:"gray.900", _dark: "gray.200"}}>Private</Heading>
          <VStack w={"full"} gap={0}>
            <ListItem title="Home" items={'10'} selected/>
            <ListItem title="Completed" items={'99+'}/>
            <ListItem title="Today" items={'3'}/>
            <ListItem title="Personal"/>
          </VStack>
        </VStack>
        <VStack w={"full"} align={'start'} gap={4}>
          <Heading size={'xl'} color={{base:"gray.900", _dark: "gray.200"}}>Workspace</Heading>
          <VStack w={"full"} gap={0}>            
            <ListItem title="Personal" workspace={true}/>
            <ListItem title="Nexus" workspace={true}/>
            <ListItem title="Evrestudio" workspace={true}/>
          </VStack>
        </VStack>
      </VStack>
      <VStack flex={1} align={'start'} paddingBlockStart={'40px'} paddingInline={'75px'} gap={6} bgColor={{base: "white", _dark: "gray.950"}}>
        <Flex justify={"space-between"} w={"full"}>
          <VStack align={'start'}>
            <Heading size={'3xl'}>{`Good ${greeting}`}, {user}</Heading>
            <Text textStyle={'lg'} color={{base:"gray.700", _dark: "gray.400"}}>{`It's ${formatDate}`}</Text>
          </VStack>
          <HStack>
            <IconButton variant={'ghost'}>
              <RiFunctionLine />
            </IconButton>
            <ColorModeButton/>
          </HStack>
        </Flex>
        <Banner>Are you tired of juggling multiple tasks and deadlines? Our To-Do List app is here to simplify your life and boost your productivity. Whether it’s work-related projects, household chores, or personal goals, we’ve go you coveres.</Banner>
        <TasksList user={userId}/>
      </VStack>
      </>
      ):(
        <>Loading...</>
      )}
    </Flex>
  )
}

export default Dashboard