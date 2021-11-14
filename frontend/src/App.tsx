import {
  ChakraProvider,
} from "@chakra-ui/react"
import AuthenticationPage from "./components/AuthenticationPage";

export const App = () => (
  <ChakraProvider>
    <AuthenticationPage />
  </ChakraProvider>
)
