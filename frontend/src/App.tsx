import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Link
            color="teal.500"
            href="/login.html"
            fontSize="2xl"
            target="_self"
            rel="noopener noreferrer"
          >
            Login
          </Link>
          <Link
            color="teal.500"
            href="/register.html"
            fontSize="2xl"
            target="_self"
            rel="noopener noreferrer"
          >
            Register
          </Link>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)