import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PlatformInputProps {
    value: string
    setValue: (value: string) => void
  }
export function PlatformInput({value, setValue}: PlatformInputProps) {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Platform" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Platforms</SelectLabel>
          <SelectItem value="tz_main">TradeZero Main</SelectItem>
          <SelectItem value="tz_pro">TradeZero Pro</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
