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
  params: { id: string }
  searchParams: ClientDetailsProps
}

const ClientDetails = ({ searchParams }: Props) => {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <ClientCard clientDetails={searchParams} />
    </section>
  )
}

export default ClientDetails
