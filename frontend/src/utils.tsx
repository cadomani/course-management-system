import { useState, useEffect } from 'react';
import {
  useToast,
  UseToastOptions
} from '@chakra-ui/react';


export function PopToast({ toastOptions }: { toastOptions: UseToastOptions }): null { 
  // Run only during initial call
  const toast = useToast();
  useEffect(() => {
    console.log('popping toast');
    (() =>
      toast(toastOptions)
    )();
  }, [])

  return null
}
