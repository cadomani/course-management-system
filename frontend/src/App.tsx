import {
  ChakraProvider,
} from "@chakra-ui/react"
import AuthenticationPage from "./components/AuthenticationPage";
import DashboardPage from "./components/DashboardPage";

export const App = () => (
  <ChakraProvider>
    <AuthenticationPage />
  </ChakraProvider>
)
