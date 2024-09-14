

import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
    const session = await auth();


    const handelClick =  () => {
      signOut();
    }
  return (
    <div>
        <h1>thiss is the settings page!</h1>

       "the sesion is: " {JSON.stringify(session)}


       <form action={async () => {
        "use server";
        await signOut();
       }}>
        <button type="submit">Log Out</button>
       </form>
    </div>
  )
}
