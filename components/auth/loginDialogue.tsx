import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

interface LoginDialogueProps {
    children: React.ReactElement;
}


export const LoginDialogue = ({
    children,
}: LoginDialogueProps) => {
    return (
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="w-[500px]  min-h-[80vh]  overflow-y-auto hide-scrollbar p-0 border-0 border-none shadow-md rounded-xl items-center justify-center flex">
    <div className=""> {/* Ajoute un padding vertical pour plus d'espace */}
        {children}
    </div>
</DialogContent>
    </Dialog>
    )
}