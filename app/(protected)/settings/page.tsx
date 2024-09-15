

import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
    const session = await auth();


  
  return (
    <div>
        <h1>thiss is the settings page!</h1>

       {JSON.stringify(session)}


       <form action={async () => {
        "use server"
        await signOut();
       }}>
        <Button type="submit">Log Out</Button>
       </form>
    </div>
  )
}
