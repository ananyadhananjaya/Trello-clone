import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { Button } from "@/components/shadcn/button";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/shadcn/command";
import { Checkbox } from "@/components/shadcn/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FlagsSelectProps {
  value: string[];
  onChange: (val: string[]) => void;
}

const options = [
  { label: "Urgent", value: "urgent", color: "bg-red-500" },
  { label: "Blocked", value: "blocked", color: "bg-yellow-500" },
  { label: "In Progress", value: "in_progress", color: "bg-blue-500" },
  { label: "Completed", value: "completed", color: "bg-green-500" },
];

const FlagsSelect = ({ value, onChange }: FlagsSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (selected: string) => {
    if (value.includes(selected)) {
      onChange(value.filter((v) => v !== selected));
    } else {
      onChange([...value, selected]);
    }
  };

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full overflow-auto justify-start flex-wrap gap-1"
        >
          {selectedOptions.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              <div className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs">
                {selectedOptions.length} selected
              </div>
              {selectedOptions.map((opt) => (
                <div
                  key={opt.value}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs"
                >
                  <span className={cn("h-2 w-2 rounded-full", opt.color)} />
                  {opt.label}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">Select flags</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandGroup>
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                onSelect={() => handleSelect(opt.value)}
                className="flex items-center gap-2"
              >
                <Checkbox
                  checked={value.includes(opt.value)}
                  onCheckedChange={() => handleSelect(opt.value)}
                />
                <span className={cn("h-2 w-2 rounded-full", opt.color)} />
                <span>{opt.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FlagsSelect;
