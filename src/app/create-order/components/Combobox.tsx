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
import { useEffect, useRef, useState } from 'react';

export default function Combobox({
  triggerer = undefined,
  disabled = false,
  setId,
  options,
  selectedId = 0,
  reset
}: {
  triggerer?: number | undefined;
  disabled?: boolean;
  selectedId?: number;
  setId: (typeId: any) => void;
  options: ComboboxOption[];
  reset: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(
    options.find((o) => o.id === selectedId)?.value! || ''
  );

  const firstRender = useRef(true);

  useEffect(() => {
    // if (firstRender.current) return;
    if (triggerer === undefined) {
      return;
    }
    setValue('');
    // return () => {
    //   firstRender.current = false;
    // };
  }, [triggerer]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || 'Select...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options?.map((op) => (
                <CommandItem
                  key={op.id}
                  value={op.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setId(currentValue === value ? 0 : op.id);
                    setOpen(false);
                    reset();
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
