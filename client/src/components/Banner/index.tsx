import { Box, Container, FlexProps, IconButton, Stack, Text } from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'
import { RiLightbulbLine } from 'react-icons/ri'

export const Banner = (props: FlexProps) => {

    const {children} = props
    return (
        <Box borderRadius={'md'} bgColor={{base: "gray.100", _dark: "gray.800"}}>
        <Container py={{ base: '4', md: '3.5' }}>
            <Stack
            direction="row"
            gap={{ base: '3', md: '4' }}
            justify="space-between"
            align={{ base: 'start', md: 'center' }}
            >
            <Stack
            direction={'row'}
            align={'center'}
            gap={6}
            >
                <RiLightbulbLine size={'2.5rem'} color='gray'/>
                <Text color="fg.muted">
                {children}
                </Text>
            </Stack>
            <IconButton variant="ghost" aria-label="Close banner">
                <LuX />
            </IconButton>
            </Stack>
        </Container>
        </Box>
    )
}