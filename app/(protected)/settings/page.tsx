"use client";


import { settings } from "@/actions/settings";
import { Input } from "@/components/ui/input";
import { AvatarUserImage } from "@/components/avatar/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUser } from "@/hooks/getSesion";
import { signOut } from "next-auth/react";

// import all the from components
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// import zod
import * as z from "zod";
// import the sckemas that we defind
import { userInfoSkemas } from "@/schemas";

// import useSesion because we are in useCliennt
import { useSession } from "next-auth/react";

// import useTransition from react to make the panding satete
import { useTransition } from "react";

import { useState } from "react";
import { FormError } from "@/components/error/form-error";
import { FormSucces } from "@/components/error/form-succes";

export default function SettingsPage() {
  const user = getUser();
  // const name = user?.name || undefined;
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucces] = useState<string | undefined>("");
  // defind the form
  const form = useForm<z.infer<typeof userInfoSkemas>>({
    resolver: zodResolver(userInfoSkemas),
    defaultValues: {
      name: user?.name || undefined,
      image: user?.image || undefined,
    },
  });

  const {update} = useSession();
  const [isPanding, startTransition] = useTransition();
  // const user = getUser();
  const [counter, setCounter] = useState(0);

  const addToCounter = () => {
    setCounter(counter +1)
  }

  const onClick = () => {
    // call the signout function
    signOut();
  }


  // update the settings
  const onSubmit = (values: z.infer<typeof userInfoSkemas>) => {
    setError("");
    setSucces("");
    startTransition(() => {
      settings(values)
      .then((data) => {
        if(data.error) {
          setError(data.error);
        }
        if(data.succes) {
          setSucces(data.succes);
        }
        update();
      })
    });
  }
  return (
    <div>
      <div className="flex items-center justify-center gap-2 space-x-3">
      <h1 className="text-red-500 text-4xl">{user?.name}</h1>
      <AvatarUserImage image={user?.image} />

      </div>
      
      <h1>{counter}</h1>
      <Button variant="secondary" onClick={addToCounter}>
        Add
      </Button>
      <Button onClick={onClick}>
        SignOut
      </Button>


      <Card className="w-[600px]">
        <CardHeader className="text-sm font-semibold text-center">
          Update your settings
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField control={form.control} name="name"  render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input  disabled={isPanding} {...field}  placeholder="enter your new name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
  )}/>
               <FormField control={form.control} name="image"  render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Image
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isPanding} {...field} type="text" placeholder="enter your image" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
  )}/>

  <FormError message={error} />
  <FormSucces message={success}/>

  <Button disabled={isPanding} type="submit">Update</Button>



            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
