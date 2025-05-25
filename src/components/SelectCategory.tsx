import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectCategory = ({
  style,
  defaultValue,
  onSelect
}: {
  style?: string;
  defaultValue?: string;
  onSelect?: (value: string) => void;
}) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onSelect}>
      <SelectTrigger className={`${style ?? "border-none shadow-none md:w-[250px] text-black"} focus:ring-0 font-semibold overflow-hidden text-sm md:text-base `}>
        <SelectValue placeholder={"Choose a community"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"1"}>History</SelectItem>
        <SelectItem value={"2"}>Food</SelectItem>
        <SelectItem value={"3"}>Pets</SelectItem>
        <SelectItem value={"4"}>Health</SelectItem>
        <SelectItem value={"5"}>Fasion</SelectItem>
        <SelectItem value={"6"}>Exercise</SelectItem>
        <SelectItem value={"7"}>Others</SelectItem>
        <SelectItem value={"0"}>All</SelectItem>
      </SelectContent>
    </Select >
  )
}

export default SelectCategory