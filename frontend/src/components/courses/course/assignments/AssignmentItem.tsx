import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box, 
  Checkbox,
  Text,
  Textarea,
  Button,
  useToast,
  UseToastOptions
} from "@chakra-ui/react"
const DOMAIN = import.meta.env.VITE_DOMAIN;

/**
 * A single assignment list element
 */
export default function AssignmentItem() {

  // Return component
  return (
    <>
    </>
  )
}


export function StudentAssignmentItem() {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitToast, setSubmitToast] = useState<UseToastOptions>();

  const toast = useToast();

  let handleInputChange = (e : any) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  let handleSubmitButtonPressed = () => {
    console.log('Submitting assignment: ' + {value})
    setSubmitted(true);
    toast({
      title: 'Assignment submitted!',
      description: 'Instructor has been notified of your assignment submission.',
      status: 'success',
      isClosable: true,
      position: 'bottom'
    });
  }

  // Return component
  return (
    <Box w="50vw">
    <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton bg='grey'>
        <Box flex="1" textAlign="left">
          Assignment 1
        </Box>
        <Box flex="1" textAlign="right">
           <Checkbox colorScheme="green" isReadOnly isChecked={submitted}>
           {submitted ? 'Submitted' : 'Due 11/18/21'}
            </Checkbox>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <Text mb="8px"> Assignment instructions that were created by the instructor.</Text>
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder="Type your answers here."
        size="sm"
        resize="none"
      />
      <Box flex="1" textAlign="right">
      <Button
       colorScheme="teal"
       size="xs"
       type="submit"
       onClick={handleSubmitButtonPressed}>
         Submit
      </Button>
        </Box>
    </AccordionPanel>
  </AccordionItem>
</Accordion>
</Box>
  )
}


