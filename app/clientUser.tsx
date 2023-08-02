'use client'

import { useSession } from 'next-auth/react'

export const ClientUser = () => {
  const { data: session } = useSession()
  console.log('Client Session', session)
  return <pre>{JSON.stringify(session)}</pre>
}
