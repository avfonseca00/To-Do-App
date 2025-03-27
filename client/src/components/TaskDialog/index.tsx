"use client"

import { Button, createListCollection, Flex, Heading, HStack, Icon, Input, Separator, Text, VStack } from "@chakra-ui/react"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRef, useState } from "react"
import { Field } from "../ui/field"
import { RiAddLine, RiCalendarCheckLine } from "react-icons/ri"
import { SelectContent, 
    SelectItem, SelectLabel, 
    SelectRoot, SelectTrigger, 
    SelectValueText } from "@/components/ui/select"
import { DatePicker } from "../DatePicker"


const lists = createListCollection({
    items: [
        { label: "Home", value: "home" },
        { label: "Completed", value: "completed" },
        { label: "Today", value: "today" },
        { label: "Personal", value: "personal" },
    ],
    })

const TaskDialog = () => {
    const [open, setOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const [date, setDate] = useState<Date>(new Date(Date.now()))

    return (
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
            <Button variant="solid">
                <RiAddLine /> New Task 
            </Button>
        </DialogTrigger>

        <DialogContent ref={contentRef} borderRadius={'xl'}>
            <DialogHeader pt={4} paddingInline={4}>
            <DialogTitle>
                <HStack justify={'space-between'} align={"center"}>
                    <HStack gap={4}>
                        <Flex p={2} borderRadius={'xl'} borderWidth={'thin'} borderColor={'gray.300'}>
                        <Icon fontSize={'30px'} color={{base: 'gray.700', _dark: "gray.100"}}>
                            <RiCalendarCheckLine/>
                        </Icon>
                        </Flex>
                        <VStack align={'start'} gap={0}>
                            <Heading color={{base: 'gray.900', _dark: "gray.200"}}>Create Task</Heading>
                            <Text color={{base: 'gray.700', _dark: "gray.400"}} textStyle={'md'} fontWeight={'normal'}>Fill in the data below to create a new task</Text>
                        </VStack>
                    </HStack>
                    <DialogCloseTrigger position={'relative'} top={0} insetEnd={0}/>
                </HStack>
            </DialogTitle>
            </DialogHeader>
            <Separator />
            <DialogBody>
                <VStack gap={5} w={'100%'} pt={'2'}>
                    <SelectRoot collection={lists} size="md">
                        <SelectLabel fontSize={'16px'} mb={'4px'} color={{base: 'gray.900', _dark: "gray.200"}}>Select a task list</SelectLabel>
                        <SelectTrigger>
                        <SelectValueText placeholder="Select a list to set your task" />
                        </SelectTrigger>
                        <SelectContent portalRef={contentRef}>
                        {lists.items.map((item) => (
                            <SelectItem item={item} key={item.value}>
                            {item.label}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </SelectRoot>
                    <Field
                        label="Task title"
                        color={{base: 'gray.900', _dark: "gray.200"}}
                    >
                        <Input size={'md'} placeholder="Give a name to your task"
                            // {...register("email", { required: "Last name is required" })}
                        />
                    </Field>
                    <Field
                        label="Date"
                        color={{base: 'gray.900', _dark: "gray.200"}}
                    >
                        <DatePicker value={date} onChange={(date)=>{
                            if(date!== null){
                                setDate(date)
                            }
                        }}/>
                    </Field>
                </VStack>
            </DialogBody>
            <DialogFooter>
            <DialogActionTrigger asChild>
                <Button variant="outline" paddingInline={10} borderRadius={'lg'}>Cancel</Button>
            </DialogActionTrigger>
            <Button paddingInline={10} borderRadius={'lg'}>Save</Button>
            </DialogFooter>
        </DialogContent>
        </DialogRoot>
    )
}

export default TaskDialog