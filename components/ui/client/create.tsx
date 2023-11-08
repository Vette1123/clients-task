'use client'

import { useContext, useState } from 'react'
import { ClientContext } from '@/providers/client-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { CLIENTS_KEY } from '@/lib/constants'
import {
  FormSchema,
  FormValues,
  initialValues,
} from '@/lib/create-client-schema'
import { Client } from '@/lib/dummy-data'
import { generateUniqueId } from '@/lib/utils'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function CreateClient() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { clients, setClients } = useContext(ClientContext)
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  })

  const onSubmit = (values: FormValues) => {
    const randomId = generateUniqueId()

    const newUserData: Client = {
      ...values,
      id: randomId,
      status: 'Inactive',
      createdAt: new Date().toISOString(),
    }

    const isUserNameAlreadyCreated = clients.find(
      (user) => user.name === newUserData.name
    )
    const isUserEmailAlreadyCreated = clients.find(
      (user) => user.contactInfo === newUserData.contactInfo
    )
    const isIdAlreadyCreated = clients.find((user) => user.id === randomId)

    if (
      isUserNameAlreadyCreated ||
      isUserEmailAlreadyCreated ||
      isIdAlreadyCreated
    ) {
      toast.error('User already exists!')
      return
    }

    setClients([...clients, newUserData])
    toast.success('Client created successfully!')
    setIsModalOpen(false)
    form.reset()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Client</DialogTitle>
          <DialogDescription>
            Make changes to create a new client. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Pedro Duarte"
                        className="col-span-3"
                      />
                    </FormControl>
                    <div />
                    <FormMessage className="col-span-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Contact Info</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="pedro.durate@gmail.com"
                        className="col-span-3"
                      />
                    </FormControl>
                    <div />
                    <FormMessage className="col-span-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Avatar URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://avatars.githubusercontent.com/u/4726921?v=4"
                        className="col-span-3"
                      />
                    </FormControl>
                    <div />
                    <FormMessage className="col-span-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Organization</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Pedro Duarte Organization"
                        className="col-span-3"
                      />
                    </FormControl>
                    <div />
                    <FormMessage className="col-span-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignedUser"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Assigned User</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.length === 0 && (
                          <SelectItem value="No users found">
                            No users found
                          </SelectItem>
                        )}
                        {clients.map((user) => (
                          <SelectItem key={user.id} value={user.name}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div />
                    <FormMessage className="col-span-3" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
