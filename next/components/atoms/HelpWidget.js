import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Tooltip
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState, useEffect } from 'react';
import { useCheckMobile } from "../../hooks/useCheckMobile.hook";
import HelpIcon from "../../public/img/icons/helpIcon"

export default function HelpWidget({options, tooltip}) {
  const isMobile = useCheckMobile();
  const [isMobileMode, setIsMobileMode] = useState(false)

  useEffect(() => {
    setIsMobileMode(isMobile)
  },[isMobile])

  const { isOpen } = useDisclosure()

  const optionsRender = (options) => {
    return options.map((option) => {
      if(option.name){ return (
        <MenuItem
          letterSpacing="0.3px"
          lineHeight="16px"
          fontWeight="400"
          fontSize="12px"
          fontFamily="ubuntu"
          backgroundColor="#FFF"
          color="#252A32"
          padding="0 16px 10px"
          _focus={{backgroundColor: "transparent"}}
          _hover={{backgroundColor: "transparent", opacity: "0.6"}}
          onClick={() => window.open(option.url, "_blank")}
        >
          {option.name}
        </MenuItem>)
      } else { return <MenuDivider margin="0 0 14px"/> }
    })
  }

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <Tooltip 
            backgroundColor="#FFF"
            borderRadius="8px"
            color="#252A32"
            fontSize="12px"
            fontWeight="400"
            fontFamily="ubuntu"
            lineHeight="16px"
            letterSpacing="0.3px"
            padding="8px 12px"
            boxShadow="0 2px 16px rgba(0, 0, 0, 0.16)"
            placement="top-start"
            label={tooltip}
            isDisabled={isOpen && true}
          >
            <MenuButton
              aria-label="Menu de ajuda"
              width="50px"
              height="50px"
              background="#2B8C4D"
              borderRadius="50%"
              zIndex="11"
              position="fixed"
              bottom={isMobileMode ? "20px" : "40px"}
              right={isMobileMode ? "20px" : "40px"}
              isActive={isOpen}
            >
              <HelpIcon alt="menu de ajuda" justifyContent="center" width="25px" height="25px" fill="white"/>
            </MenuButton>
          </Tooltip>
          <MenuList
            boxShadow="0px 1.5px 16px rgba(0, 0, 0, 0.16)"
            _focus={{boxShadow: "0px 1.5px 16px rgba(0, 0, 0, 0.16) !important"}}
            padding="16px 0 6px"
            borderRadius="8px"
            zIndex="11"
            color="#252A32"
          >
            {optionsRender(options)}
          </MenuList>
        </>
      )}
    </Menu>
  )
}