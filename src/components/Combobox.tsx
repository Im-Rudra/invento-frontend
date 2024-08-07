import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ComboboxOption } from '@/types';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

export function Combobox({
  id,
  setId,
  options
}: {
  id: number;
  setId: (typeId: number) => void;
  options: ComboboxOption[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(
    id > 0 ? options.find((op) => op.id === id)?.value! : ''
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || 'Select Material Type...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search material type..." />
          <CommandList>
            <CommandEmpty>No type found.</CommandEmpty>
            <CommandGroup>
              {options?.map((op) => (
                <CommandItem
                  key={op.id}
                  value={op.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setId(currentValue === value ? 0 : op.id);
                    setOpen(false);
                  }}
                  className="data-[disabled]:pointer-events-auto data-[disabled]:opacity-100"
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', value === op.value ? 'opacity-100' : 'opacity-0')}
                  />
                  {op.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
