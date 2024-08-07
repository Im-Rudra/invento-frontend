'use client';

import { createMaterialType } from '@/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';

export default function CreateModal({ openHandler }: { openHandler: (open: boolean) => void }) {
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    if (!name) return toast.warning('Type name cannot be empty');
    setLoading(true);
    const newType = await createMaterialType({ type_name: name });
    setLoading(false);
    if (newType.error) {
      toast.error(newType.message);
    }
    if (newType.id) {
      toast.success('Creation successful');
      openHandler(false);
    }
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 z-[60] bg-black/80 flex justify-center items-center text-left font-normal">
      <div className="w-[450px]  border-2 rounded-lg bg-background p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg text-left font-semibold leading-none tracking-tight">Create</h2>
            <p className="text-sm font-normal text-muted-foreground text-left mt-[6px]">
              Create new material type. Input type name and click Save
            </p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="type_name">Type Name</Label>
            <Input
              type="text"
              id="type_name"
              placeholder="Material type"
              value={name}
              onChange={(e) => setName(e.target.value.toLowerCase())}
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="secondary" size="sm" onClick={() => openHandler(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={loading}>
              {loading && <LuLoader2 className="mr-2 animate-spin w-4 h-4" />} Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
