import { z } from 'zod'

export const FormSchema = z.object({
  name: z.string().min(4, {
    message: 'Name must be at least 4 characters long.',
  }),
  contactInfo: z.string().email({
    message: 'Invalid email address.',
  }),
  avatar: z.string().url({
    message: 'Invalid URL',
  }),
  organizationName: z.string().min(4, {
    message: 'Organization must be at least 4 characters long.',
  }),
  assignedUser: z.string().min(4, {
    message: 'Assigned user must be at least 4 characters long.',
  }),
})

export const initialValues = {
  name: '',
  contactInfo: '',
  avatar: 'https://avatars.githubusercontent.com/u/4726921?v=4',
  organizationName: '',
  assignedUser: '',
}

export type FormValues = z.infer<typeof FormSchema>
