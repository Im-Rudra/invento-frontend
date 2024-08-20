import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { SelectOption } from '@/types';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export default function SelectBox({
  value,
  setValue,
  disabled = false,
  options,
  changeHandler = () => {},
  htmlFor,
  title
}: {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  disabled?: boolean;
  options: SelectOption[];
  changeHandler?: () => void;
  title: string;
  htmlFor: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Label htmlFor={htmlFor} className={cn(disabled ? 'text-muted-foreground' : '')}>
        {title}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {options.find((op) => op.id === value)?.name || 'Select...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command className="">
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {options?.map((op) => (
                  <CommandItem
                    key={op.id}
                    value={op.value}
                    onSelect={(_currentValue) => {
                      setValue(op.id === value ? '' : op.id);
                      setOpen(false);
                      changeHandler();
                    }}
                    className="data-[disabled]:pointer-events-auto data-[disabled]:opacity-100"
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4', value === op.id ? 'opacity-100' : 'opacity-0')}
                    />
                    {op.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
