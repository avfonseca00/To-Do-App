import { Button, Text, useCheckboxGroup } from "@chakra-ui/react"
import {
    MenuContent,
    MenuItemGroup,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu"
import { RiEqualizerLine } from "react-icons/ri"
import { Checkbox } from "../ui/checkbox"
import { DatePicker } from "../DatePicker"
import { useState } from "react"

type Props = {
    status: string[],
    setStatus: (status: string[]) => void
}

const FilterMenu = ({status, setStatus} : Props) => {

    const group = useCheckboxGroup({defaultValue: status})
    const [date, setDate] = useState(new Date(Date.now()))
    setStatus(group.value)
    console.log('group.value', group.value)
    return (
        <MenuRoot>
        <MenuTrigger asChild>
            <Button variant="outline" size="md">
            <RiEqualizerLine /> Filter
            </Button>
        </MenuTrigger>
        <MenuContent minW={'10rem'} paddingInline={4} paddingBlock={4}>
            <MenuItemGroup title="Task Status" labelProps={{p: "0 0 4px 0"}} display={'flex'} flexDir={'column'} gap={2}>
            {items.map(({ title, value }) => (
                <Checkbox
                size={'sm'}
                key={value}
                value={value}
                checked={group.isChecked(value)}
                onCheckedChange={() => {
                    group.toggleValue(value)
                }}
                >
                    <Text fontWeight={'normal'}>{title}</Text>
                </Checkbox>
            ))}
            </MenuItemGroup>
            <MenuItemGroup mt={4} title="Task Date" labelProps={{p: "0 0 4px 0"}} display={'flex'} flexDir={'column'} gap={2}>
                <DatePicker value={date} onChange={(date)=>{
                    if(date!==null)
                        setDate(date)
                }}/>
            </MenuItemGroup>
        </MenuContent>
        </MenuRoot>
    )
}

const items = [
    { title: "Pending", value: "pending" },
    { title: "Completed", value: "completed" }
]

export default FilterMenu