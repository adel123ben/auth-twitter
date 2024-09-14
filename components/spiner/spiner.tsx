"use client";

// import the spiner for the disable actions (for button form)
import { Spinner } from '@chakra-ui/react'

export const Spiner = () => {
    return (
        <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='md'
/>
    )
}