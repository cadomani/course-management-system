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

export type CourseAssignment = {
  title: string
  description: string
  isComplete: boolean
  dueDate: string
}

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

/**
 * A student assignment that can be submitted to be graded by an instructor
 */
export function StudentAssignmentItem({ courseAssignment }: { courseAssignment: CourseAssignment }) {
  const [courseInfo, setCourseInfo] = useState<CourseAssignment>({
    title: "",
    description: "",
    isComplete: false,
    dueDate: ""
  })
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const toast = useToast();

  // Don't allow submission unless text has been typed in
  let handleInputChange = (e: any) => {
    let inputValue = e.target.value
    if ((inputValue as string).length !== 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
    setValue(inputValue)
  }

  // Submit content when button is pressed
  let handleSubmitButtonPressed = () => {
    setSubmitted(true);
    toast({
      title: 'Assignment submitted!',
      description: 'Instructor has been notified of your assignment submission.',
      status: 'success',
      isClosable: true,
      position: 'bottom'
    });
  }

  // Update assignment information once it rolls in
  useEffect(() => {
    if (typeof courseAssignment !== 'undefined') {
      setCourseInfo(courseAssignment)
    }
  }, [courseAssignment])

  // Return component
  return (
    <Box w="80vw">
      <Accordion allowMultiple>
        <AccordionItem isDisabled={submitted || courseInfo.isComplete}>
          <h2>
            <AccordionButton bg="orange.300">
              <Box flex="1" textAlign="left">
                {courseInfo.title}
              </Box>
              <Box flex="1" textAlign="right">
                <Checkbox colorScheme="green" isReadOnly isChecked={submitted || courseInfo.isComplete}>
                  {submitted ? 'Submitted' : `Due ${courseInfo.dueDate}`}
                </Checkbox>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text mb="8px">  {courseInfo.description} </Text>
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
                isDisabled={!canSubmit}
                onClick={handleSubmitButtonPressed}
              >
                Submit
              </Button>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}


