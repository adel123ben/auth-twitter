"use client";

import * as z from "zod";


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// import toats from chakraui (to toggle the erro or the succes)
import { useToast } from '@chakra-ui/react'

// import useSearcheParams to read the (URL)
import { useSearchParams } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import React, { useState, useTransition } from 'react'
import { LoginSckemas } from '@/schemas'
import { CardWrapper } from '@/components/auth/cardWrapper'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from "@/actions/login";
import { FormError } from "../error/form-error";
import { FormSucces } from "../error/form-succes";
import { Spiner } from "../spiner/spiner";

export const LoginForm = () => {
  // defind the params hear
  const params = useSearchParams();
  // find the error in the url
  const UrlError = params.get('error') === "OAuthAccountNotLinked" ? "Email link withe other account" : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucces] = useState<string | undefined>("");
  // defind the toast hear
  const toast = useToast()
    const [isPanding, startTransition] = useTransition();
    // defind the form hear
    const form = useForm<z.infer<typeof LoginSckemas>>({
        resolver: zodResolver(LoginSckemas),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    // defind the onsubmit function
    const onSubmit = (values: z.infer<typeof LoginSckemas>) => {
      setError("");
      setSucces("");
      startTransition(() => {
          login(values)
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
                title: 'you are successfully connected.',
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
    <CardWrapper headerLabel="Welcome back" subHeaderLabel="Good to see you" showsical={true} backButtonLabel="Dont have an account?" backButtonHref="/auth/register">
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
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

            <FormError message={error || UrlError} />
            <FormSucces message={success} />
        <Button disabled={isPanding} type="submit" className="w-full" size="lg" variant="default">
            {isPanding ? <Spiner /> : "Login"}
        </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}


