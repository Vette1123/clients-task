import React from 'react'

import { ClientCard } from '@/components/ui/client/card'

export interface ClientDetailsProps {
  id: string
  name: string
  avatar: string
  contactInfo: string
  createdAt: string
  organizationName: string
  assignedUser: string
  status: string
}

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<ClientDetailsProps>
}

const ClientDetails = async ({ searchParams }: Props) => {
  const clientDetails = await searchParams

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <ClientCard clientDetails={clientDetails} />
    </section>
  )
}

export default ClientDetails
