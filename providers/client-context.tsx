import { createContext, ReactNode, useMemo } from 'react'

import { CLIENTS_KEY } from '@/lib/constants'
import { Client } from '@/lib/dummy-data'
import { useLocalStorage } from '@/hooks/use-local-storage'

export const ClientContext = createContext<{
  clients: Client[]
  setClients: (value: Client[]) => void
}>({
  clients: [],
  setClients: () => {},
})

export function ClientProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useLocalStorage<Client[]>(CLIENTS_KEY, [])

  const value = useMemo(() => ({ clients, setClients }), [clients, setClients])

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  )
}
