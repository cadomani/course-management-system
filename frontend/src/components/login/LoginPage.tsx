import React from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Flex, Center, Text, Container, Grid, GridItem } from "@chakra-ui/react"
import styles from '../css/loginpage.css';

export default function LoginPage() {
  return (

    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(3, 1fr)"
    >
      <GridItem colSpan={1}>
        <Center w="40vw" h="97vh" bg="white">
          <Text>Box 1</Text>
        </Center>
      </GridItem>


      <GridItem colSpan={2}>
        <Center w="60vw" h="97vh" bg="orange">
          <Text>This is where we put our background image</Text>
        </Center>
      </GridItem>
    </Grid>

  )
}

