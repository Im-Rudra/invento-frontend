import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Material } from '@/types';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

export default function MultiSelect({
  materials,
  values,
  setValues,
  disabled = true
}: {
  materials: Material[];
  values: number[];
  setValues: Dispatch<SetStateAction<number[]>>;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Label htmlFor="materials" className={cn(disabled ? 'text-muted-foreground' : '')}>
        Materials* <span className="text-muted-foreground text-xs">(multiselect)</span>
      </Label>
      <div className="relative">
        <Button
          disabled={disabled}
          variant="outline"
          className="w-full justify-between"
          onClick={() => setOpen((prev) => !prev)}
        >
          {values.length > 0
            ? `${values.length} material${values.length > 1 ? 's' : ''} selected`
            : 'Please select materials...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        {open && (
          <div className="absolute mt-1 w-full">
            <ScrollArea className="w-full h-32 border p-1 rounded-md bg-background ">
              <div>
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="w-full rounded-md px-2 py-1 hover:bg-muted flex items-center cursor-pointer"
                    onClick={() => {
                      if (values.includes(material.id)) {
                        return setValues((prev) => prev.filter((id: number) => id !== material.id));
                      }
                      setValues((prev: number[]) => [...prev, material.id]);
                    }}
                  >
                    <Check
                      className={`mr-2 w-3 h-3 ${
                        values.includes(material.id) ? '' : 'text-transparent'
                      }`}
                    />
                    {/* {values.includes(material.id) ? (
                            <Check className="mr-2 w-3 h-3" />
                          ) : (
                            <Check className="mr-2 w-3 h-3 text-transparent" />
                          )} */}
                    {material.material_name}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
