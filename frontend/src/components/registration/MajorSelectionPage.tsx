import { useState, useEffect } from 'react';
import { IoChevronBackSharp, IoClose } from 'react-icons/io5'; //https://react-icons.github.io/react-icons/#/
import axios from 'axios';
import {
  Heading,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Box,
  IconButton,
  FormErrorMessage,
  FormHelperText,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react"

// Types
import { DOMAIN } from '../../shared/types'

export default function MajorSelectionPage({ majorSelectionData, activeViewData }: { majorSelectionData: any, activeViewData: any }) {
  const [programs, setPrograms] = useState<any[]>([]);
  const [majors, setMajors] = useState<any[]>([]);
  const [chosenMajorId, setChosenMajorId] = useState<number>();
  const [sections, setSections] = useState<any[]>([]);
  const [chosenSections, setChosenSections] = useState<any[]>([]);
  const [chosenSectionIds, setChosenSectionIds] = useState<number[]>([]);
  const [sectionLimitMet, setSectionLimitMet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerDisabled, setRegisterDisabled] = useState(true);
  const [hideMajors, setHideMajors] = useState(true);
  const [hideSections, setHideSections] = useState(true);
  const [hideGrid, setHideGrid] = useState(true);
  const [errorToast, setErrorToast] = useState<UseToastOptions>();

  // Retrieve programs from server on load
  useEffect(() => {
    (async function getPrograms() {
      await axios.get(`${DOMAIN}/api/registration/programs`)
        .then(function (response) {
          // Handle success (200 OK)
          setPrograms(response.data);
        })
        .catch(function (error) {
          // Handle failure
          setErrorToast({
            title: "API Error",
            description: "Cannot connect to backend",
            status: "error",
            position: "top",
            isClosable: false
          })
        });
    })();
  }, []);
  
  // Get correct majors from selected program
  function getMajors(chosenProgram: string) {
    // Make sure we were successful in retrieving the programs
    if (typeof programs === "undefined") {
      setErrorToast({
        title: "API Error",
        description: "Cannot connect to backend",
        status: "error",
        position: "top",
        isClosable: false
      })
    } else {
      setHideMajors(false);
      for (let x in programs) {
        if (programs[x].name === chosenProgram) {
          setMajors(programs[x].major);
        }
      }
    }
  }

  // Handle error toast notifications
  const toast = useToast();
  useEffect(() => {
    if (typeof errorToast !== 'undefined') {
      (() =>
        toast(errorToast)
      )();
    }
  }, [errorToast])

  // Retrieve sections from server
  useEffect(() => {
    if (typeof chosenMajorId !== "number") {
      return;
    }
    (async function getSections() {
      await axios.get(`${DOMAIN}/api/registration/sections?major=${chosenMajorId}`)
        .then(function (response) {
          // Handle success (200 OK)
          setSections(response.data);
          setHideSections(false);
        })
        .catch(function (error) {
          // Handle failure
          setErrorToast({
            title: "API Error",
            description: "Cannot connect to backend",
            status: "error",
            position: "top",
            isClosable: false
          })
        });
    })();
  }, [chosenMajorId]);

  // Add a chosen section
  function selectSection(chosenSection: string) {
    const sectionFound = findSectionById(Number.parseInt(chosenSection));
    setChosenSections(chosenSections => [...chosenSections, sectionFound]);
    setChosenSectionIds(chosenSectionIds => [...chosenSectionIds, sectionFound.id]);
 }

  // Finds the section associated with the section id value
  function findSectionById(sectionId: number) {
    setHideGrid(false);
    for (let x in sections) {
      if (sections[x].id === sectionId) {
        return sections[x];
      }
    }
    return {};
  }

  // Check selection validity in real-time to update button availability
  useEffect(() => {
    // Change submit button status only if neither field affects initial value
    let shouldContinue = true;

    if (typeof chosenMajorId !== 'number') {
      shouldContinue = false;
    };

    if (chosenSectionIds.length === 0 || chosenSectionIds.length > 7) {
      if (chosenSectionIds.length > 7) {
        setSectionLimitMet(true);
      }
      shouldContinue = false;
    };

    if (shouldContinue) {
      setRegisterDisabled(false);
    } else {
      setRegisterDisabled(true);
    }
  }, [chosenMajorId, chosenSectionIds])

  // Send request to register user
  async function handleRegistrationButtonClicked() {
    // TODO: All validation is missing for now
    if (typeof chosenMajorId !== 'number') {
      setErrorToast({
        title: "Validation Error",
        description: "An unexpected value was given",
        status: "error",
        position: "top",
        isClosable: false
      })
      return;
    }

    // Set loading without unsetting, it will disappear when redirection occurs
    setLoading(true);
    majorSelectionData({
      majorId: chosenMajorId,
      sections: chosenSectionIds
    })
  }

  // Send intent to return to previous registration flow
  async function handlePreviousButtonClicked() {
    activeViewData('registration');
  }

  // Remove a course from the grid
  async function handleSectionRemoveClicked(e: any) {
    const rawId = Number.parseInt((e.parentNode.id as string).split('-')[1]) | Number.parseInt((e.id as string).split('-')[1]);
    for (let sec in chosenSections) {
      if (chosenSections[sec].id === rawId) {
        setChosenSections(chosenSections.filter(item => item.id !== rawId));
        setChosenSectionIds(chosenSectionIds.filter(item => item !== rawId));
      }
    }
  }

  // Return component
  return (
    <>
      <Heading>Choose a Major</Heading>
      <Box pt={6}>
        <FormControl id="programs">
          <FormLabel>Programs</FormLabel>
          <Select onChange={({ target }) => getMajors(target.value)}>
            <option value="default" hidden>Select a program...</option>
            {/* Iterate through program elements */}
            {programs.map((data: any) => {
              return <option key={data.name}>{data.name}</option>
            })}
          </Select>
        </FormControl>
      </Box>

      <Box pt={3} hidden={hideMajors}>
        <FormControl id="majors">
          <FormLabel>Majors</FormLabel>
          <Select onChange={({ target }) => setChosenMajorId(Number.parseInt(target.value))}>
            <option value="default" hidden>Select a major...</option>
            {/* Iterate through program elements */}
            {majors.map((data: any) => {
              return <option value={data.id} key={data.id}>{data.name}</option>
            })}
          </Select>
        </FormControl>
      </Box>

      <Box pt={3} hidden={hideSections}>
        <FormControl id="sections">
          <FormLabel>Sections</FormLabel>
          <Select
            isDisabled={sectionLimitMet}
            onChange={({ target }) => selectSection(target.value)}
          >
            <option value="default" hidden>Choose sections...</option>
            {/* Iterate through section elements */}
            {sections.map((data: any) => {
              return <option value={data.id} key={data.id}>{data.availability.course.name} with {data.instructor.profile.name}</option>
            })}
          </Select>
          <FormHelperText>You may enroll in up to 7 courses.</FormHelperText>
        </FormControl>
      </Box>

      <Box pt={10} hidden={hideGrid}>
        <Table variant="simple" size="sm">
          <TableCaption>Courses Chosen</TableCaption>
          <Thead>
            <Tr>
              <Th w="20%">Course ID</Th>
              <Th w="35%">Name</Th>
              <Th w="30%">Instructor</Th>
              <Th w="10%">Hours</Th>
              <Th textAlign="center" textColor="red" w="5%">&#215;</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* Iterate through section selections */}
            {/* TODO: Gray out courses that have already been added, as we cannot subscribe to multiple identical courses */}
            {chosenSections.map((data: any) => {
              return <Tr key={data.id}>
                <Td>{data.course_tag}</Td>
                <Td>{data.availability.course.name}</Td>
                <Td>{data.instructor.profile.name}</Td>
                <Td>{data.availability.course.credit_hours}</Td>
                <Td>
                  <IconButton
                    id={`sec-${data.id}`}
                    size="xs"
                    aria-label="Remove section"
                    variant="outline"
                    colorScheme="red"
                    onClick={({ target }) => handleSectionRemoveClicked(target)}
                    icon={<IoClose />}
                  ></IconButton>
                </Td>
              </Tr>
            })}
          </Tbody>
        </Table>
      </Box>

      <Box>
        <ButtonGroup pt={7} display="flex">
          <IconButton
            aria-label="Go back"
            colorScheme="orange"
            onClick={handlePreviousButtonClicked}
            icon={<IoChevronBackSharp />}
          >
          </IconButton>
          <Button
            isDisabled={registerDisabled}
            colorScheme="green"
            onClick={handleRegistrationButtonClicked}
            type="submit"
            isLoading={loading}
            loadingText="Validating Form"
            isFullWidth={true}
          >
            Register
          </Button>
        </ButtonGroup>
      </Box>
    </>
  )
}
