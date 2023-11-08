'use client'

import { ClientProvider } from '@/providers/client-context'

import { CreateClient } from '@/components/ui/client/create'
import { ClientTable } from '@/components/ui/client/table'

export default function IndexPage() {
  return (
    <ClientProvider>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <div />
          <CreateClient />
        </div>
        <ClientTable />
      </section>
    </ClientProvider>
  )
}
