import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Material, SelectOption } from '@/types';
import { CommandList } from 'cmdk';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

export default function MultiSelect({
  values,
  setValues,
  disabled = true,
  itemType,
  title,
  options,
  onChange = () => {}
}: {
  title: string;
  itemType: string;
  options: SelectOption[];
  values: any[];
  setValues: Dispatch<SetStateAction<any[]>>;
  disabled?: boolean;
  onChange?: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Label htmlFor="materials" className={cn(disabled ? 'text-muted-foreground' : '')}>
        {title}* <span className="text-muted-foreground text-xs">(multiselect)</span>
      </Label>
      <div className="relative">
        <Button
          disabled={disabled}
          variant="outline"
          className="w-full justify-between"
          onClick={() => setOpen((prev) => !prev)}
        >
          {values.length > 0
            ? `${values.length} ${itemType}${values.length > 1 ? 's' : ''} selected`
            : `Please select ${itemType}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        {open && (
          <div className="absolute mt-1 w-full z-50">
            <Command className="rounded-lg border shadow-md w-full">
              <CommandInput placeholder={`Search ${itemType}...`} />
              <CommandList>
                <CommandEmpty>No {itemType} found...</CommandEmpty>
                <CommandGroup heading={itemType}>
                  <div className="max-h-24 overflow-y-auto overflow-x-hidden supplier-address-scrollbar">
                    {options.map((op) => (
                      <CommandItem
                        value={op.value}
                        key={op.id}
                        className="data-[disabled]:pointer-events-auto data-[disabled]:opacity-100"
                        onSelect={() => {
                          onChange();
                          if (values.includes(op.id)) {
                            return setValues((prev) => prev.filter((id: number) => id !== op.id));
                          }
                          setValues((prev: number[]) => [...prev, op.id]);
                        }}
                      >
                        <Check
                          className={`mr-2 w-3 h-3 ${
                            values.includes(op.id) ? '' : 'text-transparent'
                          }`}
                        />
                        {op.name}
                      </CommandItem>
                    ))}
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
}
