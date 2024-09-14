"use client";

// import all the alerte componets (chakraUI)
// import {
//     Alert,
//     AlertIcon,
//     AlertTitle,
//     AlertDescription,
//   } from '@chakra-ui/react'


import { MdOutlineGppGood } from "react-icons/md";


interface FormErrorProps {
    message?: string;
}


export const FormSucces = ({
    message
}: FormErrorProps) => {
    if(!message) {
        return null;
    }
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
        <MdOutlineGppGood className="h-4 w-4" />
        <p>{message}</p>
    </div>
    )
}