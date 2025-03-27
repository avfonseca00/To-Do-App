import { Badge, Flex, Text } from "@chakra-ui/react"
import { RiDraggable, RiMoreFill, RiSquareLine } from "react-icons/ri"

type Props = {
    title: string
    items?: string
    selected?: boolean
    workspace?: boolean
    color?: string
}

const ListItem = ({title, items, selected = false, workspace = false, color = '#' + Math.round(Math.random()*1000000)}: Props) => {
    return (
        <Flex 
            justify={"space-between"} 
            w={"full"} 
            align={"center"} 
            p={'12px'} 
            borderRadius={'md'}
            bgColor={{ base: selected ? "gray.200" : 'trasnsparent', _dark: selected? "gray.700" : "transparent" }}
            transitionProperty={"all"}
            transitionDuration={"0.2s"}
            transitionBehavior={"ease"}
            _hover={{
                bgColor:{ base: 'gray.100', _dark: "gray.800"},
                cursor: "pointer"
                }}
            >
            <Flex align={"center"} gap={3}>
                <RiDraggable color="gray"/>
                {workspace && <RiSquareLine color={color}/>}
                <Text textStyle={'md'} color={{base:"gray.900", _dark: "gray.300"}}>{title}</Text>
            </Flex>
            {workspace? (
                <RiMoreFill/>
            ):
            (
                items &&
                <Badge borderRadius={'lg'} bgColor={{base: 'gray.200', _dark: "gray.800"}}>{items}</Badge>
            )}
        </Flex>
    )
}

export default ListItem