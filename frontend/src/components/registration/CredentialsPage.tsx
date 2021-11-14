import { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { IoChevronForwardSharp, IoCheckmarkSharp, IoClose } from 'react-icons/io5';
import axios from 'axios';
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Heading,
  InputRightElement,
  InputGroup,
  Link,
  Spinner,
} from "@chakra-ui/react"

// Dynamically load domain to avoid hardcoding routes
const DOMAIN = import.meta.env.VITE_DOMAIN;

export default function CredentialsPage({ credentialsData, activeViewData }: { credentialsData: any, activeViewData: any }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validNameInput, setValidNameInput] = useState(false);
  const [validEmailInput, setValidEmailInput] = useState(false);
  const [validPasswordInput, setValidPasswordInput] = useState(false);
  const [validName, setValidName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [availableEmail, setAvailableEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [hideSpinner, setHideSpinner] = useState(true);
  const [hideAvailability, setHideAvailability] = useState(true);
  const [hideUnavaiability, setHideUnavailability] = useState(true);
  const [continueDisabled, setContinueDisabled] = useState(true);
  const nameRegex: RegExp = /^[a-zA-Z\s'-]+$/m;  // Regex unit-tests: https://regex101.com/r/2VUsW8/1
  const passwordRegexLetters: RegExp = /[a-zA-Z]{1,16}/;
  const passwordRegexNumbers: RegExp = /[\d]{1,16}/;
  const passwordRegexSymbols: RegExp = /[!@#$%^&*()_+{}:"<>?|=;',\.\/\[\]\\-]{1,16}/;
  // TODO: bind input values to prop data to keep information persistent through page changes

  // TODO: Refactor into generic handleChangeProp
  const handleChangeName = (e: any) => {
    setName(e.target.value);
  }

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  }

  const toggleShowPassword = () => setShowPassword(!showPassword);

  // We should highlight the element only if the focus is lost
  function warnIfInvalid(e: string) {
    if (e === 'name') {
      if (validNameInput === false) {
        setValidName(false);
      } else {
        setValidName(true);
      }
    } else if (e === 'email') {
      if (email !== '') {
        validateEmailAvailability(email);
      }
      if (validEmailInput === false) {
        setValidEmail(false);
      } else {
        setValidEmail(true);
      }
    } else if (e === 'password' || e === 'text') {
      if (validPasswordInput === false) {
        setValidPassword(false);
      } else {
        setValidPassword(true);
      }
    }
  }

  // Check field validity in real-time to update button availability
  useEffect(() => {
    // Change submit button status only if neither field affects initial value
    let shouldContinue = true;

    // Name cannot be less than three characters or more than 45 and may not contain numbers/symbols other than a hyphen/apostrophe
    if (typeof name === 'string' && name.length >= 3 && name.length < 45 && name.search(nameRegex) !== -1) {
      setValidNameInput(true);
    } else {
      setValidNameInput(false);
      shouldContinue = false;
    };

    if (typeof email === 'string' && email.length !== 0 && email.endsWith('@auburn.edu') && availableEmail) {
      setValidEmailInput(true);
    } else {
      setHideUnavailability(true);
      setHideAvailability(true);
      setValidEmailInput(false);
      shouldContinue = false;
    };

    if (typeof password === 'string' && password.length >= 8 && password.length <= 16
      && password.search(passwordRegexLetters) !== -1
      && password.search(passwordRegexNumbers) !== -1
      && password.search(passwordRegexSymbols) !== -1) {
      setValidPasswordInput(true);
    } else {
      setValidPasswordInput(false);
      shouldContinue = false;
    };

    if (shouldContinue) {
      setContinueDisabled(false);
    } else {
      setContinueDisabled(true);
    }
  }, [name, email, password])

  // Continue registration flow
  async function handleNextButtonClicked() {
    if (validName && validEmail && validPassword) {
      credentialsData({
        name: name,
        email: email,
        password: password
      })
      activeViewData('majorSelection');
    }
  }

  async function validateEmailAvailability(emailAddress: string) {
    setHideUnavailability(true);
    setHideAvailability(true);
    setHideSpinner(false);
    await axios.get(`${DOMAIN}/api/registration/validate?available=${emailAddress}`)
      .then(function (response) {
        // Parse data from successful response
        if (response.data.available === "false") {
          setAvailableEmail(false);
          setHideUnavailability(false);
          setHideAvailability(true);
        } else {
          setAvailableEmail(true);
          setHideAvailability(false);
          setHideUnavailability(true);
        }
      })
      .catch(function (error) {
        // Handle failure (500 Server Error)
        // TODO: Throw a 500 error
        console.log('API error, cannot connect to backend')
      }).finally(() => {
        setHideSpinner(true);
      });
  }

  // Return component
  return (
    <>
      <Heading>Register</Heading>
      <Box pt={6}>
        <FormControl id="name" isInvalid={!validName} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter your name..."
            type="Name"
            onKeyUp={handleChangeName}
            onBlur={({ target }) => warnIfInvalid(target.id)}
          />
          <FormHelperText>Names may only contain uppercase and lowercase letters, as well as hyphens and apostrophes.</FormHelperText>
        </FormControl>
      </Box>

      <Box pt={3}>
        <FormErrorMessage>Invalid email or password. Please try again.</FormErrorMessage>
        <FormControl id="email" isInvalid={!validEmail} isRequired>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter your email address..."
              type="email"
              onKeyUp={handleChangeEmail}
              onBlur={({ target }) => warnIfInvalid(target.id)}
            />
            <InputRightElement children={<Spinner color="blue.500" hidden={hideSpinner} />} />
            <InputRightElement children={<IoCheckmarkSharp color="green" />} hidden={hideAvailability} />
            <InputRightElement children={<IoClose color="red" />} hidden={hideUnavaiability} />
          </InputGroup>
          <FormHelperText>Use your @auburn email address!</FormHelperText>
        </FormControl>
      </Box>

      <Box pt={3} pb={7}>
        <FormControl id="password" isInvalid={!validPassword} isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Choose a strong password..."
              type={showPassword ? "text" : "password"}
              onKeyUp={handleChangePassword}
              onBlur={({ target }) => warnIfInvalid(target.id)}
            />
            <InputRightElement width="5.0rem">
              <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormHelperText>Passwords should contain a mix of letters, numbers, and symbols, and be between 8-16 characters long.</FormHelperText>
        </FormControl>
      </Box>

      <Box>
        <Button
          isFullWidth={true}
          isDisabled={continueDisabled}
          colorScheme="orange"
          onClick={handleNextButtonClicked}
          type="button"
          rightIcon={<IoChevronForwardSharp />}
        >
          Continue
        </Button>
      </Box>

    <Box justifyContent="center" display="flex">
      <Link
          mt={1}
          as={RouterLink}
          to="/login"
          color="teal.500"
        >
        Already Registered?
      </Link>
    </Box>
    </>
  )
}
