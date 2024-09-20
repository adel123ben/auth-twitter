import { LoginForm } from '@/components/auth/loginForm'
import React from 'react'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <Suspense>
       <LoginForm />
    </Suspense>
  )
}
