import BackgroundSlider from 'react-background-slider' //https://www.npmjs.com/package/react-background-slider
import { Outlet } from "react-router-dom";
import {
  ChakraProvider,
  theme,
  GridItem,
  Center,
  Stack,
  Grid
} from "@chakra-ui/react"

// TODO: Import as a group and cycle all available images instead of importing individually
// TODO: Provide attribution and credits for photos
// Background images
import bg1 from '../images/samford-bg.jpg';
import bg2 from '../images/au-bg2.png';
import bg3 from '../images/au-bg3.png';

export const App = () => (
  <ChakraProvider theme={theme}>
    {/* Split up as 1/3 registration and 2/3 photo container */}
    <Grid templateColumns="repeat(3, 1fr)">
      <GridItem colSpan={1}>
        <Center w="inherit" h="100vh" bg="white">
          <Stack w="70%" align="stretch">
            <Outlet />
          </Stack>
        </Center>
      </GridItem>
      <GridItem colSpan={2}>
        <BackgroundSlider
          images={[bg1, bg2, bg3]}
          duration={8} transition={2} />
      </GridItem>
    </Grid>
  </ChakraProvider>
)
