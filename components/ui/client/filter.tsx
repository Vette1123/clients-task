import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { CalendarDateRangePicker } from './date-picker'

export function FilterComponent() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleFilterStatus = useDebouncedCallback((status) => {
    console.log(`Filtering... ${status}`)

    const params = new URLSearchParams(searchParams)

    if (status && status !== 'No Filter') {
      params.set('statusFilter', status)
    } else {
      params.delete('statusFilter')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="flex items-center gap-4">
      <Select onValueChange={handleFilterStatus}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status to filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="No Filter">No Filter</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <CalendarDateRangePicker />
      <X
        className="h-6 w-6 cursor-pointer text-muted-foreground"
        onClick={() => {
          const params = new URLSearchParams(searchParams)
          params.delete('dateFilter')
          replace(`${pathname}?${params.toString()}`)
        }}
      />
    </div>
  )
}
