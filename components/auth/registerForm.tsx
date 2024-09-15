"use client";

import * as z from "zod";


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"



// import the toast from the chakra ui liberry
import { useToast } from '@chakra-ui/react'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import React, { useState, useTransition } from 'react'
import { RegisterSckemas } from '@/schemas'
import { CardWrapper } from '@/components/auth/cardWrapper'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { register } from "@/actions/register";
import { FormError } from "../error/form-error";
import { FormSucces } from "../error/form-succes";
import { Spiner } from "../spiner/spiner";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucces] = useState<string | undefined>("");
  // defind the toast hear
  const toast = useToast()
    const [isPanding, startTransition] = useTransition();
    // defind the form hear
    const form = useForm<z.infer<typeof RegisterSckemas>>({
        resolver: zodResolver(RegisterSckemas),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });


    // defind the onsubmit function
    const onSubmit = (values: z.infer<typeof RegisterSckemas>) => {
      setError("");
      setSucces("");
      startTransition(() => {
          register(values)
          .then((data) => {
            if(data.error) {
              setError(data.error);
              toast({
                title: 'there is some error',
                status: 'error',
                duration: 9000,
                position: "top-right",
                isClosable: true,
              })
            }
            if (data.success) {
              setSucces(data.success)
              toast({
                title: 'Account created.',
                status: 'success',
                position: "top-right",
                duration: 9000,
                isClosable: true,
              })
            }
          })
        })
      }
    
  return (
    <CardWrapper headerLabel="Create an account" subHeaderLabel="Welcome to application" showsical={true} backButtonLabel="Already have an account?" backButtonHref="/auth/login">
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isPanding} placeholder="Jhon doe" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
              <Input  disabled={isPanding} placeholder="Jhon@gmail.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className="placeholder:text-xl"  disabled={isPanding} placeholder="*******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



            </div>

            <FormError message={error} />
            <FormSucces message={success} />
        <Button disabled={isPanding} type="submit" className="w-full" size="lg" variant="default">
            {isPanding ? <Spiner /> : "Create an account"}
        </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}


