import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/components/ui/select';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

export default function Selection({
  value,
  setValue,
  items,
  disabled = false,
  placeholder,
  onChange = undefined
}: {
  onChange?: any;
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  items: { name: any; value: any }[];
  disabled?: boolean;
  placeholder: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="relative">
      <Button
        disabled={disabled}
        variant="outline"
        className="w-full justify-between"
        onClick={() => setOpen((prev) => !prev)}
      >
        {value ? items.find((i) => i.value === value)?.name : placeholder}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      {open && (
        <div className="absolute mt-1 w-full z-50">
          <ScrollArea className="w-full h-32 border p-1 rounded-md bg-background ">
            <div>
              {items.map((i) => (
                <div
                  key={i.value}
                  className="w-full rounded-md px-2 py-1 hover:bg-muted flex items-center cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    if (onChange !== undefined) {
                      onChange();
                    }
                    if (i.value === value) {
                      return setValue(null);
                    }
                    setValue(i.value);
                  }}
                >
                  <Check
                    className={`mr-2 w-3 h-3 ${value === i.value ? '' : 'text-transparent'}`}
                  />
                  {i.name}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
