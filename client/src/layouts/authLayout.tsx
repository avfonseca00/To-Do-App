import { useColorMode } from "@/components/ui/color-mode";
import { Center, Flex, FlexProps, Heading, Text, VStack } from "@chakra-ui/react"


const AuthLayout = (props: FlexProps) => {

    const { children } = props
    const { colorMode } = useColorMode();

    return (
        <Flex h={"full"} m={0} p={0}>
            <Center display={{ base: 'none', lg: 'flex'}} bgColor={colorMode==='light'? 'gray.100' : 'gray.900'} flex={1}>
                <VStack gap={4}>
                    <Heading size={'6xl'} maxW={'65%'} fontWeight={'700'} color={colorMode==='light'? 'gray.900' : 'gray.100'}>Keep your tasks saved anytime</Heading>
                    <Text w={'65%'} textStyle={'xl'} color={colorMode==='light'? 'gray.800' : 'gray.400'}>Keep your day in order, save your tasks, don't miss anything and share tasks with friends</Text>
                </VStack>
            </Center>
            {children}
        </Flex>
    )
}

export default AuthLayout