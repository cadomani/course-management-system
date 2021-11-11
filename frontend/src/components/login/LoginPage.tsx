import React from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import BackgroundSlider from 'react-background-slider' //https://www.npmjs.com/package/react-background-slider
import { IoLogoClosedCaptioning, IoSchoolOutline } from 'react-icons/io5'; //https://react-icons.github.io/react-icons/#/
import axios from 'axios';

import {
  Flex,
  Center,
  Text,
  Container,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  Button,
  Heading,
  Image,
  InputGroup,
  InputRightElement,
  FormErrorMessage
} from "@chakra-ui/react"
import styles from '../css/loginpage.css';

// Background images
import bg1 from '../../../images/samford-bg.jpg';
import bg2 from '../../../images/au-bg2.png';
import bg3 from '../../../images/au-bg3.png';
const server_url = 'https://cms.kltpzyxm.live';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [validCredentials, setValidCredentials] = useState(true);


  const handleChangeEmail = (e : any) => {
    setValidEmail(true); //remove error indicators when typing new email
    setEmail(e.target.value);
  }
  const handleChangePassword = (e : any) => {
    setValidPassword(true); //remove error indictators when typing new password
    setPassword(e.target.value);
  }
  const toggleShowPassword = () => setShowPassword(!showPassword);

  async function handleLogInButtonClicked()  {
    //Validate password and email before sending POST req
    //TODO: Use regex to check email ends with @auburn.edu
    //      Do our passwords have length requirements? special characters etc
          if(!password || password.length === 0) {
            setValidPassword(false);
          }
          if(!email || email.length === 0) {
            setValidEmail(false);
          }

          if(validEmail && validPassword) {
            setLoading(true);
            await axios.post(server_url + '/api/auth', {
              email: email,
              password: password
            })
            .then(function (response) {
              console.log(response);
              //Handle success (200)
              if(!validCredentials) setValidCredentials(true);
              alert('successful login'); // placeholder. should redirect to new page instead of alert
            })
            .catch(function (error) {
              console.log(error);
              //Handle failure
              setValidCredentials(false);
            })
            .finally(() => {
              setLoading(false);
          });  
  }
}


  return (

    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(3, 1fr)"
    >
      <GridItem colSpan={1}>
        <Center w="40vw" h="97vh" bg="white">
          <Stack spacing={8}> 
          <Heading>Log In</Heading>
            <FormControl id = "credentials" isInvalid={!validCredentials}>
            <FormErrorMessage>Invalid email or password. Please try again.</FormErrorMessage>
            <FormControl id="email" isInvalid={!validEmail}>
              <FormLabel>Your Email</FormLabel>
              <Input  
                placeholder="xxx0000@auburn.edu"
                type="email"
                onChange={handleChangeEmail}
                 />
            </FormControl>
            <FormControl id="password" isInvalid={!validPassword}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
              <Input 
                type={showPassword ? "text" : "password"}
                onChange={handleChangePassword}
              />
              <InputRightElement width="4.0rem">
                <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
              </InputGroup>
            </FormControl>
            </FormControl>

            <Button
            mt={4}
            colorScheme="orange"
            onClick={handleLogInButtonClicked}
            type="submit"
            rightIcon={<IoSchoolOutline/>}
            isLoading={loading}
            loadingText="Validating Credentials"
          >
            Log In
          </Button>
        </Stack>
        </Center>
      </GridItem>

      <GridItem colSpan={2}>
        <BackgroundSlider
            images={[bg1, bg2, bg3]}
            duration={8} transition={2} />
      </GridItem>
    </Grid>


  )
}

