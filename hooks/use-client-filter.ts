import React from 'react'
import { useSearchParams } from 'next/navigation'

import { Client } from '@/lib/dummy-data'

interface ClientFilter {
  clients: Client[]
}

export const useClientFilter = ({ clients }: ClientFilter) => {
  const searchParams = useSearchParams()
  let filteredClients = [...clients]

  const clientStatus = searchParams.get('statusFilter') || ''
  const clientDateFilter = searchParams.get('dateFilter') || ''

  if (clientStatus) {
    filteredClients = clients.filter(
      (client) => client.status.toLowerCase() === clientStatus.toLowerCase()
    )
  }
  if (clientDateFilter) {
    const fromDate = new Date(clientDateFilter.split('$')[0])
    const toDate = new Date(clientDateFilter.split('$')[1])
    filteredClients = clients.filter((client) => {
      const clientDate = new Date(client.createdAt)
      return clientDate >= fromDate && clientDate <= toDate
    })
  }
  return { filteredClients }
}
