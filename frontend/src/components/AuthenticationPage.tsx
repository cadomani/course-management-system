// Libraries
import { useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";

// Chakra
import {
  ChakraProvider,
  theme,
  GridItem,
  Center,
  Stack,
  Grid,
  Image,
  Box
} from "@chakra-ui/react"


// TODO: Import as a group and cycle all available images instead of importing individually
// TODO: Provide attribution and credits for photos
//Background images
// import bg1 from '../images/samford-bg.jpg';
import bg2 from '../../images/au-bg2.png';
// import bg3 from '../images/au-bg3.png';

export default function AuthenticationPage() {
  let navigate = useNavigate();

  // TODO: Verify login status and redirect to login page
  useEffect(() => {
    navigate("/login", { replace: true });
  }, [])

  // Return component
  return (
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
          <AnimatePresence exitBeforeEnter>
            <Box overflow="hidden" position="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.00 }}
              >
                <Image maxHeight="100vh" maxWidth="inherit" src={bg2}></Image>
              </motion.div>
            </Box>
          </AnimatePresence>
        </GridItem>
      </Grid>
    </ChakraProvider>
  )
}

