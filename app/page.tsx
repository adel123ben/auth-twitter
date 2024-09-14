import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Button variant="default" asChild>
      <Link href="/auth/register">
      Login now
      </Link>
      </Button>
    </div>
  )
}
