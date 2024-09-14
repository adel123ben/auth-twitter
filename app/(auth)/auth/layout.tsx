import React from "react"


interface AuthLayoutProps {
    children: React.ReactElement
}


export default function AuthLayout({
    children
}: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-[url('/bg2.jpg')] bg-cover bg-center">
    {children}
</div>
  )
}
