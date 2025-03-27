import { FC, forwardRef, useCallback, useMemo } from 'react';  
import 'react-datepicker/dist/react-datepicker.css';  
import ReactDatePicker from 'react-datepicker';  
import {  
    HStack,
    IconButton,  
    Input,  
    Text,  
} from '@chakra-ui/react'; 
import { ClassNames } from '@emotion/react';  
import { css as emotionCSS, SerializedStyles } from '@emotion/react';
import { InputGroup } from '../ui/input-group';
import { RiArrowLeftSLine, RiArrowRightSLine, RiCalendarLine } from 'react-icons/ri';

const CustomInput = forwardRef<HTMLInputElement>((props, ref) => {  
    return (  
        <InputGroup startElement={<RiCalendarLine/>}>  
            <Input ref={ref} {...props} />
        </InputGroup>  
    );  
});  
interface CustomHeaderProps {  
    date: Date;  
    decreaseMonth: () => void;  
    increaseMonth: () => void;  
    prevMonthButtonDisabled: boolean;  
    nextMonthButtonDisabled: boolean;  
}
const CustomHeader = ({  
    date,  
    decreaseMonth,  
    increaseMonth,  
    prevMonthButtonDisabled,  
    nextMonthButtonDisabled,  
    }: CustomHeaderProps) => {  
    return (  
        <HStack pb={1} alignItems="center">  
        <IconButton  
            borderRadius="md"  
            size="xs" 
            ml={3} 
            variant="solid"
            backgroundColor={{
                base: "transparent",
                _dark: "gray.800"
            }}
            color={{base: "gray.50", _dark: "gray.400"}}  
            aria-label="Previous Month" 
            onClick={decreaseMonth}  
            disabled={prevMonthButtonDisabled}  
        >
            <RiArrowLeftSLine/>
        </IconButton>  
        <Text color="gray.50" flex={1} fontSize="sm" fontWeight="medium">  
            {new Intl.DateTimeFormat('en-AU', {  
            year: 'numeric',  
            month: 'long',  
            }).format(date)}  
        </Text>
        <IconButton  
            borderRadius="md"  
            size="xs" 
            mr={3} 
            variant="solid"
            backgroundColor={{
                base: "transparent",
                _dark: "gray.800"
            }}  
            color={{base: "gray.50", _dark: "gray.400"}}  
            aria-label="Next Month" 
            onClick={increaseMonth}  
            disabled={nextMonthButtonDisabled}  
        >
            <RiArrowRightSLine/>
        </IconButton>
        </HStack>  
    );  
};  

function useDatePickerStyles() {  
    return useMemo(() => {  
        const defaultStyles = {  
        background: 'white',
        border: 'none', 
        boxShadow: '0px 2px 8px color-mix(in srgb, #18181b 10%, transparent),0px 0px 1px color-mix(in srgb, #18181b 30%, transparent)',
            '& .react-datepicker': {  
                '&__header': {  
                backgroundColor: '#18181b',  
                borderBottom: 'none',  
                },  
                '&__month': {  
                marginTop: 0,
                },  
                '&__day-name': {  
                color: 'white',  
                fontWeight: 'medium',  
                width: '28px',  
                },  
                '&__day': {  
                lineHeight: '28px',  
                color: '#3f3f46',  
                width: '28px',  
                height: '28px',  
                borderRadius: '100%',  
                }, 
                '&__day--outside-month':{
                    visibility: 'hidden!important'
                },
                '&__day:not(.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected):hover': {  
                backgroundColor: 'white',
                borderRadius: '100%',
                boxShadow: '0 0 1px 1px rgba(0,0,0,0.2)',  
                },    
                '&__day--today': {  
                border: 'solid 1px #3f3f46',  
                fontWeight: '600',  
                },  
                '&__day--selected': {  
                backgroundColor: '#18181b',  
                fontWeight: '600',  
                color: 'white',  
                }, 
                '&__day--selected:not([aria-disabled=true]):hover':{
                    backgroundColor: '#18181b',
                    borderRadius: "100%"  
                }
            }, 
        };     
        return emotionCSS(defaultStyles);  
    }, []);  
}  

export interface DatePickerProps {  
    value: Date;  
    onChange: (date: Date | null) => void;  
}  

export const DatePicker: FC<DatePickerProps> = ({ value, onChange }) => {  
    const styles = useDatePickerStyles();  

    const render = useCallback(  
        ({ css }: { css: (styles: SerializedStyles) => string }) => {  
        return (  
            <ReactDatePicker  
                dateFormat="dd MMMM, yyyy"  
                showPopperArrow={false} 
                popperClassName={css({ name:"marginTop", styles:'4px!important' })}  
                calendarClassName={css(styles)}  
                selected={value}  
                onChange={(date) => onChange(date === null ? null : date)}  
                customInput={<CustomInput />}  
                renderCustomHeader={CustomHeader}  
            />  
        );  
    },  
    [styles, value, onChange]  
    );  

    return <ClassNames>{render}</ClassNames>;  
};  