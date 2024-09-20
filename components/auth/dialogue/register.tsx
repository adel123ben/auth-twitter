"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from '@chakra-ui/react';
import { useState, useTransition } from 'react';
import { RegisterSckemas } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { register } from "@/actions/register";
import { FormError } from "@/components/error/form-error";
import { FormSucces } from "@/components/error/form-succes";
import { Spiner } from "@/components/spiner/spiner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogTrigger } from "@/components/ui/dialog";
import { FaGoogle, FaGithub } from "react-icons/fa";

export function RegisterFormModal() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucces] = useState<string | undefined>("");
  const toast = useToast();
  const [isPanding, startTransition] = useTransition();

  // Defining the form
  const form = useForm<z.infer<typeof RegisterSckemas>>({
    resolver: zodResolver(RegisterSckemas),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // OnSubmit function
  const onSubmit = (values: z.infer<typeof RegisterSckemas>) => {
    setError("");
    setSucces("");
    startTransition(() => {
      register(values).then((data) => {
        if (data.error) {
          setError(data.error);
          toast({
            title: 'There is some error',
            status: 'error',
            duration: 9000,
            position: "top-right",
            isClosable: true,
          });
        }
        if (data.success) {
          setSucces(data.success);
          toast({
            title: 'Account created.',
            status: 'success',
            position: "top-right",
            duration: 9000,
            isClosable: true,
          });
        }
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        {/* <button className="text-blue-500 hover:underline">register</button> */}
        test
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] border-0 border-none w-full p-0 rounded-lg  shadow-md overflow-hidden overflow-y-scroll hide-scrollbar  bg-gray-900 text-white">
        <DialogHeader className="p-4 bg-gray-800">
          <DialogTitle className="text-center text-lg font-semibold">
            Create an account
          </DialogTitle>
          <p className="text-center text-sm text-gray-400">
            Welcome to application
          </p>
        </DialogHeader>

        <div className="p-4 overflow-y-scroll  max-h-[70vh] bg-gray-900 ">
          <Form {...form}>
            <form className="space-y-6 pt-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPanding}
                          placeholder="John Doe"
                          type="text"
                          {...field}
                          className="border border-gray-600 text-gray-900 placeholder-gray-500"
                        />
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
                        <Input
                          disabled={isPanding}
                          placeholder="john@gmail.com"
                          type="email"
                          {...field}
                          className="border border-gray-600 text-gray-900 placeholder-gray-500"
                        />
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
                        <Input
                          className="placeholder:text-xl border border-gray-600 text-gray-900 placeholder-gray-500"
                          disabled={isPanding}
                          placeholder="*******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormError message={error} />
              <FormSucces message={success} />

              <Button
                disabled={isPanding}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                size="lg"
                variant="default"
              >
                {isPanding ? <Spiner /> : "Create an account"}
              </Button>
            </form>
          </Form>

          {/* Separator with "or" */}
          <div className="flex items-center justify-center my-4">
            <hr className="w-1/3 border-gray-400" />
            <span className="mx-4 text-gray-400">or</span>
            <hr className="w-1/3 border-gray-400" />
          </div>

          {/* Google and GitHub buttons */}
          <div className="space-y-4">
            <Button
              className="w-full bg-white text-gray-900 hover:bg-gray-100 border border-gray-300 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg"
            >
              <FaGoogle className="text-red-500" />
              <span>Continue with Google</span>
            </Button>

            <Button
              className="w-full bg-gray-800 text-white hover:bg-gray-900 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg"
            >
              <FaGithub className="text-white" />
              <span>Continue with GitHub</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
