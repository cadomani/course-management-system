import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Heading,
  Container,
  Grid,
  GridItem,
  Flex,
  Center,
  Text,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import { exit } from 'process';

export default function MajorSelectionPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [majors, setMajors] = useState<any[]>([]);
  const [chosenMajorId, setChosenMajorId] = useState('');
  const [sections, setSections] = useState<any[]>([]);
  const [chosenSections, setChosenSections] = useState<any[]>([]);

  // Retrieve programs from server
  useEffect(() => {
    async function getPrograms() {
      try {
        const { data } = await axios.get('https://cms.kltpzyxm.live/api/registration/programs');
        setPrograms(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('Error');
        } else {
          console.log('Unexpected Error');
        }
      }
    };
    getPrograms();
  }, []);

  // Make sure we were successful in retrieving the programs
  if (typeof programs === "undefined") {
    console.log('Could not retrieve programs from API.')
  }

  // Get correct majors from selected program
  function getMajors(chosenProgram: string) {
    for (let x in programs) {
      if (programs[x].name === chosenProgram) {
        setMajors(programs[x].major);
      }
    }
  }

  // Retrieve sections from server
  useEffect(() => {
    if (chosenMajorId === '') {
      return;
    }
    async function getSections() {
      try {
        const { data } = await axios.get('https://cms.kltpzyxm.live/api/registration/sections?major=' + chosenMajorId);
        setSections(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('Error');
        } else {
          console.log('Unexpected Error');
        }
      }
    };
    getSections();
  }, [chosenMajorId]);

  // Add a chosen section
  function selectSection(chosenSection: string) {
    const sectionFound = findSectionById(Number.parseInt(chosenSection));
    setChosenSections(chosenSections => [...chosenSections, sectionFound]);
  }

  // Finds the section associated with the section id value
  function findSectionById(sectionId: number) {
    for (let x in sections) {
      if (sections[x].id === sectionId) {
        console.log('Found section' + sections[x]);
        return sections[x];
      }
    }
    return {};
  }

  // Return component
  return (
    // Split up as 1/3 registration and 2/3 photo container
        <Center w="40vw" h="97vh" bg="white">
          <Grid templateRows="repeat(8, 1fr)" gap={5}>
            <GridItem rowSpan={1}>
              <Heading>Choose a Major</Heading>
            </GridItem>
            <GridItem rowSpan={1}>
              <FormControl id="programs">
                <FormLabel>Programs</FormLabel>
                <Select maxWidth="80%" onChange={({ target }) => getMajors(target.value)}>
                  <option value="default" hidden>Select a program...</option>
                  {/* Iterate through program elements */}
                  {programs.map((data: any, i: any) => {
                    return <option key={data.name}>{data.name}</option>
                  })}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={1}>
              <FormControl id="majors">
                <FormLabel>Majors</FormLabel>
                <Select maxWidth="80%" onChange={({ target }) => setChosenMajorId(target.value)}>
                  <option value="default" hidden>Select a major...</option>
                  {/* Iterate through program elements */}
                  {majors.map((data: any) => {
                    return <option value={data.id} key={data.id}>{data.name}</option>
                  })}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={2}>
              <FormControl id="sections">
                <FormLabel>Sections</FormLabel>
                <Select maxWidth="80%" width="auto" onChange={({ target }) => selectSection(target.value)}>
                  <option value="default" hidden>Choose sections...</option>
                  {/* Iterate through section elements */}
                  {sections.map((data: any) => {
                    return <option value={data.id} key={data.id}>{data.availability.course.name} with {data.instructor.profile.name}</option>
                  })}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={4}>
              <Table variant="simple" size="sm">
                <TableCaption>Courses Chosen</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Course ID</Th>
                    <Th>Name</Th>
                    <Th isNumeric>Credit Hours</Th>
                  </Tr>
                </Thead>
                <Tbody>
                {/* Iterate through section selections */}
                {chosenSections.map((data: any) => {
                  return <Tr key={data.id}>
                    <Td>{data.course_tag}</Td>
                    <Td>{data.availability.course.name}</Td>
                    <Td>{data.availability.course.credit_hours}</Td>
                    </Tr>
                })}
                </Tbody>
              </Table>
            </GridItem>
          </Grid>
        </Center>
      </GridItem>
      {/* Picture Grid */}
      <GridItem colSpan={2}>
        <Center w="60vw" h="97vh" bg="green">
          <Text>Registration Welcome Image</Text>
        </Center>
      </GridItem>
    </Grid>
  )
}
