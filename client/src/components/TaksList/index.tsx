import { CheckboxGroup, Flex, HStack, Input, Kbd, List, Text, VStack } from "@chakra-ui/react"
import { SkeletonCircle, SkeletonText } from "@/components/ui/skeleton"
import FilterMenu from "@/components/FilterMenu"
import SortMenu from "@/components/SortMenu"
import TaskDialog from "@/components/TaskDialog"
import { Field } from "@/components/ui/field"
import { InputGroup } from "@/components/ui/input-group"
import { LuSearch } from "react-icons/lu"
import { useEffect, useState } from "react"
import axios from "axios"
import { RiDraggable, RiMoreFill } from "react-icons/ri"
import { Checkbox } from "@/components/ui/checkbox"
import Pagination from "../Pagination"
import { useDebounce } from '@uidotdev/usehooks'; 
import { searchResponse, taskDataResponse, taskObject, taskStatus } from "@/types"

type Props = {
    user?: string
}

const TasksList = ({user}: Props) => {
    const [tasks, setTasks] = useState<taskObject[]>([])
    const [page, setPage] = useState<number>(1)
    const [searchPage, setSearchPage] = useState<number>(1)
    const [value, setValue] = useState<string>('asc')
    const [searchResult, setSearchResult] = useState<searchResponse | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>(()=>{
        const searchParams = new URLSearchParams(window.location.search)
        return searchParams.get('search') ?? ''
    });
    const [statusFilter, setStatusFilter] = useState<string[]>(()=>{
        const searchParams = new URLSearchParams(window.location.search)
        if(searchParams.get('status')!==null){
            console.log('statusParam', searchParams.get('status'))
            return [searchParams.get('status')]
        }else{
            return []
        }
    });
    const [pageData, setPageData] = useState({
        page: 1,  
        limit: 10,  
        totalPages: 0,  
        totalItems: 0
    })
    const [checkedArray, setCheckedArray] = useState<string[]>([])

    const debouncedSearchTerm = useDebounce(searchTerm, 300);
console.log('searchResult', searchResult)
    useEffect(() => {
        (async()=>{
        const newPathname = debouncedSearchTerm === '' 
        ? window.location.pathname
        : debouncedSearchTerm&&(statusFilter.length===1)
        ? `?search=${debouncedSearchTerm}&status=${statusFilter[0]}`
        : `?search=${debouncedSearchTerm}`
        window.history.replaceState({}, '', newPathname)
        const params = new URLSearchParams({
            search: debouncedSearchTerm,
            status: statusFilter[0]??'',
            page: searchPage.toString(),
            pageSize: '6'
        })
        console.log('debouncedSearchTerm', debouncedSearchTerm)
        if(debouncedSearchTerm){
            const data = await axios.get<searchResponse>(`http://127.0.0.1:5000/api/tasks/search/${user}`, {params})
            setSearchResult(data.data)
            setTasks(data.data.data)
            setSearchPage(data.data.page)
            // console.log('searchResult', searchResult)
        }else{
            setSearchResult(null)
            setSearchPage(1)
        }
        })()
    }, [user, debouncedSearchTerm, statusFilter, searchPage])

    useEffect(()=>{
        if(!debouncedSearchTerm)
            return

    }, [debouncedSearchTerm])
    
    
    const handleChange = async(value: string) => {
        setCheckedArray(prev =>   
            prev.includes(value)  
            ? prev.filter(task => task !== value)  
            : [...prev, value]  
        ) 
        
        const task = tasks.find(task => task._id === value)
        const index = tasks.findIndex(task => task?._id === value);
        tasks[index].status = tasks[index].status === taskStatus.Pending   
                                                    ? taskStatus.Completed   
                                                    : taskStatus.Pending;
        const {_id, createdAt, updatedAt, ...rest} = task || {}
        const taskObj = rest
        taskObj.status = taskObj?.status === taskStatus.Pending   
                                            ? taskStatus.Completed   
                                            : taskStatus.Pending;
        
        await axios.put(`http://127.0.0.1:5000/api/tasks/${_id}`, taskObj)
        
    }

    useEffect(() => {  
        (async () => {  
            const params = new URLSearchParams({  
                page: page.toString(),  
                limit: '6'  
            });
            if(!searchResult&&(debouncedSearchTerm==='')){
            const response = await axios.get<taskDataResponse>(`http://127.0.0.1:5000/api/tasks/user/${user}`, {
                params
            });  
            const tasksData = response.data.data;
            const pagination = response.data.pagination 
            console.log('tasksData', pagination) 
            
            // Actualiza el estado de las tareas  
            setTasks(tasksData);  
            setPageData(pagination)
            setPage(pagination.page)
            // Actualiza checkedArray con los IDs de las tareas completadas  
            const completedTaskIds = tasksData  
                .filter(task => task.status[0] === taskStatus.Completed)  
                .map(task => task._id);  
                console.log('completedTaskIds', completedTaskIds)
            setCheckedArray(completedTaskIds);  
    
            setTimeout(() => {  
                setTasks(tasksData);  
            }, 1000);  
        }
        })();  
    }, [user, page, searchResult, debouncedSearchTerm]);

    return (
        <VStack w={"full"} gap={6}>
            <Flex justify={"space-evenly"} w={"full"} gap={4}>
                <Field flex={1}
                    >
                    <InputGroup
                    flex="1"
                    startElement={<LuSearch />}
                    endElement={<Kbd>⌘ S</Kbd>}
                    w={"full"}
                    >
                    <Input 
                        placeholder="Search tasks..." 
                        w={"full"}  
                        value={searchTerm}  
                        onChange={(e) => setSearchTerm(e.target.value)}/>
                    </InputGroup>
                </Field>
                <FilterMenu status={statusFilter} setStatus={setStatusFilter}/>
                <SortMenu value={value} setValue={setValue}/>
                <TaskDialog/>
            </Flex>
            {!(tasks.length>0)? (
                <>
                    <HStack width="full">
                        <SkeletonCircle size="10" />
                        <SkeletonText noOfLines={2} w={"full"}/>
                    </HStack>
                    <HStack width="full">
                        <SkeletonCircle size="10" />
                        <SkeletonText noOfLines={2} w={"full"}/>
                    </HStack>
                    <HStack width="full">
                        <SkeletonCircle size="10" />
                        <SkeletonText noOfLines={2} w={"full"}/>
                    </HStack>
                    <HStack width="full">
                        <SkeletonCircle size="10" />
                        <SkeletonText noOfLines={2} w={"full"}/>
                    </HStack>
                </>
            ):(
                <List.Root 
                w={"full"} 
                maxH={300} 
                overflowY={"scroll"}
                _scrollbar={{
                    width: "5px"
                }}
                _scrollbarThumb={{
                    borderRadius: '4px',
                    bgColor: 'gray.300'
                }}
            >
                <CheckboxGroup value={checkedArray}>
                {tasks.map((task)=>(
                    <List.Item 
                        key={task._id} 
                        w={"full"}
                        p={'8px 16px'}
                        borderRadius={'md'}
                        display={"flex"} 
                        flexDir={'row'}
                        alignItems={"center"}
                        gap={6}
                        transitionProperty={"all"}
                        transitionDuration={"0.2s"}
                        transitionBehavior={"ease"}
                        _hover={{
                            bgColor: {
                                base: '#F8F8F8',
                                _dark: "gray.900"
                            }
                        }}
                    >
                        <List.Indicator display={"flex"} alignItems={"center"}><RiDraggable color={"gray"}/></List.Indicator>
                        <HStack align={'center'} justify={"space-between"} w={"full"}>
                            <Flex gap={4} flex={1}>
                            <Checkbox  
                                key={task._id}  
                                value={task._id}  
                                color={{base: "gray.900", _dark: "gray.300"}}
                                checked={checkedArray.includes(task._id)}  
                                onChange={() => handleChange(task._id)} 
                                w={"full"}
                                size={'md'}
                                cursor={"pointer"}
                                >
                                    <Text 
                                        textStyle={'lg'} 
                                        textDecoration={checkedArray.includes(task._id) ? "line-through" : "none"} 
                                        fontWeight={'normal'}
                                        color={{base: "gray.900", _dark: "gray.300"}}
                                    >{task.description}</Text>
                                </Checkbox>
                            </Flex>
                            <RiMoreFill/>
                        </HStack>
                    </List.Item>
                ))}
                </CheckboxGroup>
                </List.Root>
            )}

            <Pagination 
                page={searchResult!==null? searchPage : page} 
                setPage={searchResult!==null? setSearchPage : setPage} 
                limit={searchResult!==null? searchResult.pageSize : pageData.limit} 
                totalItems={searchResult!==null? searchResult.total : pageData.totalItems}
            />
        </VStack>
    )
}

export default TasksList