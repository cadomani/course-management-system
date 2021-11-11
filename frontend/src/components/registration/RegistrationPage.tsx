import React from 'react';
import { useState } from 'react'
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
} from "@chakra-ui/react"

export default function RegistrationPage() {
  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(3, 1fr)"
    >
      <GridItem colSpan={1}>
        <Center w="40vw" h="97vh" bg="white">
          
        </Center>
      </GridItem>
      <GridItem colSpan={2}>
        <Center w="60vw" h="97vh" bg="white">
          <Text>Registration Welcome Image</Text>
        </Center>
      </GridItem>

    </Grid>
  )
}




