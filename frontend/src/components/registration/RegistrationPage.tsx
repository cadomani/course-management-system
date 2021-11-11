import React from 'react';
import { useState } from 'react';
import {
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
} from "@chakra-ui/react"

export default function RegistrationPage() {
  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(3, 1fr)"
    >
      <GridItem colSpan={1}>
        <Center w="40vw" h="97vh" bg="teal">
          
        <FormControl id="email">
          <FormLabel>Name</FormLabel>
          <Input type="email" />
          <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          
        <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
         </FormControl>

        </Center>
      </GridItem>
      <GridItem colSpan={2}>
        <Center w="60vw" h="97vh" bg="blue">
          <Text>Registration Welcome Image</Text>
        </Center>
      </GridItem>

    </Grid>
  )
}




