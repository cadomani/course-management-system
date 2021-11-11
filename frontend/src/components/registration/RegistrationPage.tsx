import { useState, useEffect } from 'react';
import {
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
  )
}
