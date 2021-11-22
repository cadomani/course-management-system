// Libraries
import { useState, useEffect } from 'react';

// Chakra
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
} from "@chakra-ui/react"

// Types
import { CourseAssignment } from '../../../../shared/types'
import { AssignmentSubmissionToast } from '../../../../shared/common';

/**
 * A student assignment that can be submitted to be graded by an instructor
 */
export function StudentAssignmentItem({ courseAssignment }: { courseAssignment: CourseAssignment }) {
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
    toast(AssignmentSubmissionToast);
  }

  // Return component
  return (
    <Box w="100%">
      <Accordion allowMultiple>
        <AccordionItem isDisabled={submitted || courseAssignment.isComplete}>
          <h2>
            <AccordionButton bg="gray.200">
              <Box flex="1" textAlign="left">
                {courseAssignment.title}
              </Box>
              <Box flex="1" textAlign="right">
                <Checkbox colorScheme="green" isReadOnly isChecked={submitted || courseAssignment.isComplete}>
                  {submitted ? 'Submitted' : `Due ${courseAssignment.dueDate}`}
                </Checkbox>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text mb="8px">  {courseAssignment.description} </Text>
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
