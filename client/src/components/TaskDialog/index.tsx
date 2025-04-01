"use client"

import { Button, createListCollection, Flex, Heading, HStack, Icon, Input, Separator, Text, Textarea, VStack } from "@chakra-ui/react"
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
import { useForm } from "react-hook-form"
import axios from "axios"
import { BASE_URI } from "@/utils/constants"


const lists = createListCollection({
    items: [
        { label: "Home", value: "home" },
        { label: "Completed", value: "completed" },
        { label: "Today", value: "today" },
        { label: "Personal", value: "personal" },
    ],
    })

    type dialogProps = {
        userId: string,
        taskCreated: boolean,
        setTaskCreated: (newTask: boolean) => void,
    }

    type TaskFormValues = {  
        title: string;
        description: string;  
        list: string;  
        dueDate: Date;  
    }; 

const TaskDialog = ({userId, taskCreated, setTaskCreated}:dialogProps) => {
    const [open, setOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const [date, setDate] = useState<Date>(new Date(Date.now()))
    const { register, handleSubmit, reset } = useForm<TaskFormValues>(); // Usar useForm  

    const onSubmit = async (data: TaskFormValues) => {  
        try {  
            const response = await axios.post(`${BASE_URI}/api/tasks`, {  
                title: data.title,  
                description: data.description,
                // list: data.list,  
                // dueDate: data.dueDate,  
                status: "pending",
                userId: userId
            });  
            console.log("Tarea creada:", response.data);  
            setTaskCreated(!taskCreated)
            reset(); // Limpiar el formulario después del envío  
            setOpen(false); // Cierra el diálogo después de guardar  
        } catch (error) {  
            console.error("Error al crear la tarea:", error);  
            // Manejo de error, podría mostrar un mensaje al usuario  
        }  
    };

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
                    <form 
                        onSubmit={handleSubmit(onSubmit)} 
                        id="taskForm" 
                        style={
                            {
                                width:"100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: '18px'
                            }
                        }
                    >
                        <SelectRoot collection={lists} size="md" {...register("list", { required: true })}>
                            <SelectLabel fontSize={'16px'} mb={'4px'} color={{base: 'gray.900', _dark: "gray.200"}}>Select a task list</SelectLabel>
                            <SelectTrigger>
                            <SelectValueText placeholder="Select a list to set your task" />
                            </SelectTrigger>
                            <SelectContent portalRef={contentRef as React.RefObject<HTMLElement>}>
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
                            <Input size={'md'} placeholder="Choose a title to your task"
                                {...register("title", { required: "Task title is required" })}
                            />
                        </Field>
                        <Field
                            label="Task description"
                            color={{base: 'gray.900', _dark: "gray.200"}}
                        >
                            <Textarea 
                                size={'md'} 
                                placeholder="A brief of your task"
                                height={'74px'}
                                maxH={'74px'}
                                {...register("description", { required: "Task description is required" })}
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
                    </form>
                </VStack>
            </DialogBody>
            <DialogFooter>
            <DialogActionTrigger asChild>
                <Button variant="outline" paddingInline={10} borderRadius={'lg'}>Cancel</Button>
            </DialogActionTrigger>
            <Button type="submit" form={"taskForm"} paddingInline={10} borderRadius={'lg'}>Save</Button>
            </DialogFooter>
        </DialogContent>
        </DialogRoot>
    )
}

export default TaskDialog