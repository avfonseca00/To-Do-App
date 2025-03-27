import { Center, Flex, FlexProps, Heading, Text, VStack } from "@chakra-ui/react"


const AuthLayout = (props: FlexProps) => {

    const { children } = props

    return (
        <Flex h={"full"} m={0} p={0}>
            <Center bgColor={'gray.100'} flex={1}>
                <VStack gap={4}>
                    <Heading size={'6xl'} maxW={'65%'} fontWeight={'700'}>Keep your tasks saved anytime</Heading>
                    <Text w={'65%'} textStyle={'xl'}>Keep your day in order, save your tasks, don't miss anything and share tasks with friends</Text>
                </VStack>
            </Center>
            {children}
        </Flex>
    )
}

export default AuthLayout