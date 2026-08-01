'use client'

import { Suspense } from 'react'
import { ClientProvider } from '@/providers/client-context'

import { CreateClient } from '@/components/ui/client/create'
import { FilterComponent } from '@/components/ui/client/filter'
import { ClientTable } from '@/components/ui/client/table'

export default function IndexPage() {
  return (
    <ClientProvider>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        {/* useSearchParams() bails out of prerendering, so the filter-driven
            subtree needs its own boundary to keep the rest of the page static. */}
        <Suspense fallback={<p className="text-center">Loading clients…</p>}>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <FilterComponent />
            <CreateClient />
          </div>
          <ClientTable />
        </Suspense>
      </section>
    </ClientProvider>
  )
}
