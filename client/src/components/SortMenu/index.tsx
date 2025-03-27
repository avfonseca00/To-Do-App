import { MenuContent, MenuRadioItem, MenuRadioItemGroup, MenuRoot,  MenuTrigger } from "@/components/ui/menu"
import { Button } from "@chakra-ui/react"
// import { Dispatch, SetStateAction } from "react"
import { HiSortAscending } from "react-icons/hi"


type Props = {
    value: string,
    setValue: (value: string) => void
}

const Menu = ({value, setValue}: Props) => {
    return (
        <MenuRoot>
            <MenuTrigger asChild>
            <Button variant="outline" size="md">
                <HiSortAscending /> Sort
            </Button>
            </MenuTrigger>
            <MenuContent minW="10rem">
            <MenuRadioItemGroup
                value={value}
                onValueChange={(e) => setValue(e.value)}
            >
                <MenuRadioItem value="asc">Ascending</MenuRadioItem>
                <MenuRadioItem value="desc">Descending</MenuRadioItem>
            </MenuRadioItemGroup>
            </MenuContent>
        </MenuRoot>
    )
}

export default Menu