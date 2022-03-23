import { Icon, Box } from '@chakra-ui/react'

const CopyIcon = ({widthIcon, heightIcon ,fill ,...style}) => (
  <Box 
    display="flex"
    alignItems="center"
    justifyItems="center"
    position="relative"
    {...style}
  >
    <Icon
      viewBox="0 0 23 30"
      width={widthIcon}
      height={heightIcon}
      fill={fill}
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.19152 0C5.63924 0 5.19152 0.447715 5.19152 1C5.19152 1.55228 5.63924 2 6.19152 2H19.0446C20.0983 2 20.9524 2.85414 20.9524 3.90777V23C20.9524 23.5523 21.4001 24 21.9524 24C22.5047 24 22.9524 23.5523 22.9524 23V3.90777C22.9524 1.74957 21.2028 0 19.0446 0H6.19152ZM3.58355 6.25977H15.893C16.3944 6.25977 16.8008 6.66619 16.8008 7.16754V26.6113C16.8008 27.1126 16.3944 27.519 15.893 27.519H3.58355C3.0822 27.519 2.67578 27.1126 2.67578 26.6113V7.16753C2.67578 6.66619 3.0822 6.25977 3.58355 6.25977ZM0.675781 7.16753C0.675781 5.56162 1.97763 4.25977 3.58355 4.25977H15.893C17.4989 4.25977 18.8008 5.56162 18.8008 7.16754V26.6113C18.8008 28.2172 17.4989 29.519 15.893 29.519H3.58355C1.97763 29.519 0.675781 28.2172 0.675781 26.6113V7.16753Z" fill="#707783"/>
    </Icon>
  </Box>
)

export default CopyIcon