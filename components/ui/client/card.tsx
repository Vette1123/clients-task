import Image from 'next/image'

import { formatDateToLocal } from '@/lib/utils'
import { ClientDetailsProps } from '@/app/(client)/[id]/page'

import ClientStatus from './status'

export function ClientCard({
  clientDetails,
}: {
  clientDetails: ClientDetailsProps
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="ml-4 flex items-center gap-2 space-y-1">
          <div>
            <Image
              src={clientDetails.avatar}
              className="rounded-full"
              width={28}
              height={28}
              alt={`${clientDetails.name}'s profile picture`}
            />
          </div>
          <div>
            <p className="text-sm font-medium leading-none">
              {clientDetails.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {clientDetails.contactInfo}
            </p>
          </div>
        </div>
        <div className="ml-auto font-medium">
          Created At: {formatDateToLocal(clientDetails.createdAt)}
        </div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <ClientStatus status={clientDetails.status} />
        </div>
        <div className="ml-auto font-medium">
          Organization:{' '}
          <span className="text-gray-500">
            {clientDetails.organizationName}
          </span>
        </div>
        <div className="ml-auto font-medium">
          Assigned User:{' '}
          <span className="text-gray-500">{clientDetails.assignedUser}</span>
        </div>
      </div>
    </div>
  )
}
