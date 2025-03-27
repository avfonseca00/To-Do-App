import { Center, HStack } from "@chakra-ui/react"
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "@/components/ui/pagination"

type Props = {
    page: number,
    setPage: (page: number) => void,
    totalItems?: number,
    limit?: number
}
const Pagination = ({page = 1, setPage, totalItems = 20, limit = 10} : Props) => {
    return (
        <Center w={"full"}>
            <PaginationRoot page={page} onPageChange={(e)=>setPage(e.page)} count={totalItems} pageSize={limit} defaultPage={1} variant="solid">
            <HStack>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
            </HStack>
            </PaginationRoot>
        </Center>
    )
}
export default Pagination