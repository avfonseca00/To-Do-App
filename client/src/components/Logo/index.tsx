type Props = {
    color?: string,
    bgColor?: string
}

const Logo = ({color="white", bgColor="black"}: Props) => {
    return (
        <svg width="52" height="49" viewBox="0 0 52 49" fill={color} xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_6004_260" fill="white">
            <rect y="4.20004" width="51.2" height="44.8" rx="4"/>
            </mask>
            <rect y="4.20004" width="51.2" height="44.8" rx="4" stroke={bgColor} strokeWidth="10" mask="url(#path-1-inside-1_6004_260)"/>
            <path d="M35 11L35 3" stroke={bgColor} strokeWidth="5" strokeLinecap="round"/>
            <path d="M15 11L15 3" stroke={bgColor} strokeWidth="5" strokeLinecap="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M48 18.8286H2.74286V46.2572H48V18.8286ZM25.4142 38.7571L37.0713 27.0999L34.2429 24.2715L24 34.5144L19.2428 29.7572L16.4143 32.5856L22.5858 38.7571L24 40.1713L25.4142 38.7571Z" fill={bgColor}/>
        </svg>
    )
}

export default Logo