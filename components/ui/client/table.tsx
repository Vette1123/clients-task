import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ClientContext } from '@/providers/client-context'

import { Client } from '@/lib/dummy-data'
import { formatDateToLocal } from '@/lib/utils'
import ClientStatus from '@/components/ui/client/status'

export function ClientTable() {
  const router = useRouter()
  const { clients, setClients } = useContext(ClientContext)
  if (!clients?.length) {
    return <p className="text-center">No clients found, Try creating one!</p>
  }

  const toggleStatus = (id: string) => {
    const updatedClients = clients.map((client) => {
      if (client.id === id) {
        return {
          ...client,
          status: client.status === 'Active' ? 'Inactive' : 'Active',
        }
      }
      return client
    }) as Client[]

    setClients(updatedClients)
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {clients?.map((client) => (
              <div
                key={client.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={client.avatar}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${client.name}'s profile picture`}
                      />
                      <p onClick={() => router.push(`/${client.id}`)}>
                        {client.name}
                      </p>
                    </div>
                    <p
                      className="text-sm text-gray-500"
                      onClick={() => router.push(`/${client.id}`)}
                    >
                      {client.contactInfo}
                    </p>
                  </div>
                  <ClientStatus
                    status={client.status}
                    onClick={() => toggleStatus(client.id)}
                  />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(client.createdAt)}</p>
                  </div>
                  <div>
                    <p>{client.organizationName}</p>
                  </div>
                  <div>
                    <p>{client.assignedUser}</p>
                  </div>
                  <div className="flex justify-end gap-2"></div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Client
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Organization
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Assigned User
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clients?.map((client) => (
                <tr
                  key={client.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={client.avatar}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${client.name}'s profile picture`}
                      />
                      <Link
                        href={{
                          pathname: `/${client.id}`,
                          query: {
                            id: client.id,
                            name: client.name,
                            avatar: client.avatar,
                            contactInfo: client.contactInfo,
                            createdAt: client.createdAt,
                            organizationName: client.organizationName,
                            assignedUser: client.assignedUser,
                            status: client.status,
                          },
                        }}
                        className="cursor-pointer underline"
                      >
                        {client.name}
                      </Link>
                    </div>
                  </td>
                  <td className="whitespace-nowrap p-3">
                    <Link
                      href={{
                        pathname: `/${client.id}`,
                        query: {
                          id: client.id,
                          name: client.name,
                          avatar: client.avatar,
                          contactInfo: client.contactInfo,
                          createdAt: client.createdAt,
                          organizationName: client.organizationName,
                          assignedUser: client.assignedUser,
                          status: client.status,
                        },
                      }}
                      className="w-fit cursor-pointer underline"
                    >
                      {client.contactInfo}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap p-3">
                    {formatDateToLocal(client.createdAt)}
                  </td>
                  <td className="whitespace-nowrap p-3">
                    {client.organizationName}
                  </td>
                  <td className="whitespace-nowrap p-3">
                    {client.assignedUser}
                  </td>
                  <td className="whitespace-nowrap p-3">
                    <ClientStatus
                      status={client.status}
                      onClick={() => toggleStatus(client.id)}
                    />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
