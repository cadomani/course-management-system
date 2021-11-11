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
export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
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
