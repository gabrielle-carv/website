import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Checkbox,
  CheckboxGroup,
  VStack,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ControlledInput from "./ControlledInput";
import SectionText from "./SectionText";
import Title from "./Title";
import SearchIcon from "../../public/img/icons/searchIcon"
import BDLogoPlusImage from "../../public/img/logos/bd_logo_plus";


export function BaseFilterAccordion({
  fieldName,
  children,
  overflowX = "scroll",
  isOpen = null,
  isActive = false,
  onChange = () => { },
  bdPlus = null,
  alwaysOpen = false,
  isHovering = true
}) {
  return (
    <Accordion ex allowToggle width="100%">
      <AccordionItem border="0px">
        {({ isExpanded }) => (
          <>
            <Text>
              <AccordionButton
                onClick={onChange}
                _hover={isHovering ? { cursor: "pointer", opacity: "0.6" } : "none"}
                padding="16px 16px 0 0"
                marginBottom="8px"
                cursor="auto"
              >
                <HStack
                  spacing={2}
                  alignContent="baseline"
                  justifyContent="flex-start"
                  width="100%"
                >
                  <Box
                    width="fit-content"
                    fontWeight="500"
                    fontFamily="Ubuntu"
                    fontSize="16px"
                    color={isActive ? "#2B8C4D" : "#252A32"}
                    letterSpacing="0.2px"
                  >
                    {fieldName}
                  </Box>
                  {bdPlus ? (
                    <BDLogoPlusImage
                      widthImage="45px"
                      marginLeft="5px !important"
                    />
                  ) : (
                    <></>
                  )}
                </HStack>
                {!alwaysOpen ? <AccordionIcon color={isActive ? "#2B8C4D" : null} marginLeft="auto" fontSize="18px" /> : <></>}
              </AccordionButton>
            </Text>
            {(isOpen && isOpen === true) || (isOpen == null && isExpanded) ? (
              <VStack
                overflowY="auto"
                overflowX={overflowX + " !important"}
                maxHeight="300px"
                width="100%"
                alignItems="flex-start"
              >
                {children}
              </VStack>
            ) : (
              <></>
            )}
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}

export function CheckboxFilterAccordion({
  fieldName,
  choices,
  onChange,
  onToggle,
  values,
  alwaysOpen = false,
  valueField = "id",
  displayField = "display_name",
  isActive = false,
  isOpen = null,
  canSearch = false,
}) {
  const [search, setSearch] = useState("");

  return (
    <BaseFilterAccordion
      onChange={onToggle}
      isActive={isActive}
      fieldName={fieldName}
      isOpen={alwaysOpen ? alwaysOpen : isOpen}
      overflowX="hidden"
      alwaysOpen={alwaysOpen}
    >
      <CheckboxGroup onChange={(val) => onChange(val)} value={values} >
        {canSearch ? (
          <VStack padding="15px 0 10px" width="100%" alignItems="center">
            <ControlledInput
              color="#252A32"
              value={search}
              onChange={setSearch}
              inputBackgroundColor="#FFFFFF"
              inputStyle={{
                height: "40px",
                fontSize: "14px",
                width: "100%",
                borderRadius: "16px",
              }}
              rightIcon={
                <Box cursor="pointer">
                  <SearchIcon alt="pesquisar" fill="#D0D0D0"/>
                </Box>
              }
            />
          </VStack>
        ) : (
          <></>
        )}
        <VStack
          overflowX="hidden !important"
          alignItems="flex-start"
          overflowY="auto"
          width="100%"
          padding="8px 0"
        >
          {(canSearch
            ? choices.filter(
              (c) =>
                c[displayField].toLowerCase().indexOf(search.toLowerCase()) !=
                -1
            )
            : choices
          ).map((c) => (
            <Checkbox
              fontFamily="Lato"
              value={c[valueField]}
              color="#7D7D7D"
              colorScheme="green"
              letterSpacing="0.5px"
            >
              {c[displayField]}
            </Checkbox>
          ))}
        </VStack>
      </CheckboxGroup>
    </BaseFilterAccordion>
  );
}

export function RangeFilterAccordion({
  fieldName,
  onChange,
  onToggle,
  isOpen = null,
  alwaysOpen = false,
  isActive = false,
  maxValue = null,
  minValue = null,
}) {
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(null);

    if (min > max) return;
    if ((!min && min < 0) || (!max && max < 0)) return setError("Antigo demais!");
    if (!min && !max) return;

    onChange({ min, max });
  }, [min, max]);

  useEffect(() => {
    setMin(minValue);
    setMax(maxValue);
  }, []);

  return (
    <BaseFilterAccordion
      isOpen={alwaysOpen ? alwaysOpen : isOpen}
      alwaysOpen={alwaysOpen}
      isActive={isActive}
      onChange={onToggle}
      overflowX="hidden"
      fieldName={fieldName}
    >
      <VStack align="flex-start">
        <HStack padding="8px 0px" width="100%">
          <ControlledInput
            value={min}
            onChange={setMin}
            width="100%"
            placeholder="Min"
            inputStyle={{
              height: "40px",
              fontSize: "14px",
              width: "100%",
              borderRadius: "16px",
              type: "number"
            }}
          />
          <ControlledInput
            value={max}
            onChange={setMax}
            width="100%"
            placeholder="Max"
            inputStyle={{
              height: "40px",
              fontSize: "14px",
              width: "100%",
              borderRadius: "16px",
              type: "number"
            }}
          />
        </HStack>
        {error ? (
          <SectionText
            paddingLeft="20px"
            color="red"
            fontWeight="bold"
            fontSize="12px"
          >
            {error}
          </SectionText>
        ) : (
          <></>
        )}
      </VStack>
    </BaseFilterAccordion>
  );
}

export function FilterAccordion({
  fieldName,
  choices,
  onChange,
  onToggle,
  value,
  bdPlus = null,
  valueField = "id",
  displayField = "display_name",
  isOpen = null,
  alwaysOpen = false,
  isActive = false,
  isHovering,
}) {
  return (
    <BaseFilterAccordion
      isOpen={alwaysOpen ? alwaysOpen : isOpen}
      alwaysOpen={alwaysOpen}
      isActive={isActive}
      onChange={onToggle}
      isHovering={isHovering}
      overflowX="hidden"
      bdPlus={bdPlus}
      fieldName={fieldName}
    >
      <VStack
        width="100%"
        spacing={1}
        overflowX="hidden !important"
        alignItems="flex-start"
      >
        {choices.map((c) => (
          <Box
            borderLeft={
              c[valueField] === value ? "3px solid #2B8C4D" : "transparent"
            }
            width="100%"
          >
            <Text
              fontFamily="Ubuntu"
              fontSize="14px"
              lineHeight="16px"
              letterSpacing="0.2px"
              cursor="pointer"
              fontWeight={c[valueField] === value ? "500" : "400"}
              color={c[valueField] === value ? "#2B8C4D" : "#7D7D7D"}
              _hover={c[valueField] === value ? "none" : {  opacity: "0.6" , fontWeight: "500" }}
              padding="8px 24px"
              transform="translateX(-10px)"
              zIndex="100"
              position="relative"
              width="100%"
              onClick={() => onChange(c[valueField])}
            >
              {c[displayField]}
            </Text>
          </Box>
        ))}
      </VStack>
    </BaseFilterAccordion>
  );
}

export function SimpleFilterAccordion({
  fieldName,
  children,
  isOpen = null,
  isActive = false,
  onChange = () => { },
  isHovering = true,
  styleChildren
}) {
  return (
    <Accordion ex allowToggle width="100%">
      <AccordionItem border="0px">
        {({ isExpanded }) => (
          <>
            <Text>
              <AccordionButton
                onClick={onChange}
                _hover={isHovering ? { cursor: "pointer", opacity: "0.6" } : "none"}
                padding="16px 16px 0 0"
                marginBottom="8px"
              >
                <HStack
                  spacing={2}
                  alignContent="baseline"
                  justifyContent="flex-start"
                  width="100%"
                >
                  <Box
                    width="fit-content"
                    fontWeight="500"
                    fontFamily="Ubuntu"
                    fontSize="16px"
                    color={isActive ? "#2B8C4D" : "#252A32"}
                    letterSpacing="0.2px"
                  >
                    {fieldName}
                  </Box>
                </HStack>
                <AccordionIcon color={isActive ? "#2B8C4D" : null} marginLeft="auto" fontSize="18px" />
              </AccordionButton>
            </Text>
            {(isOpen && isOpen === true) || (isOpen == null && isExpanded) ? (
              <VStack
                overflowY="auto"
                width="100%"
                alignItems="flex-start"
                {...styleChildren}
              >
                {children}
              </VStack>
            ) : (
              <></>
            )}
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}