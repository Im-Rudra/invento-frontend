'use client';

import { updateMaterialType } from '@/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MaterialType } from '@/types';
import { useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';

export default function EditModal({
  materialType,
  openHandler
}: {
  materialType: MaterialType;
  openHandler: (open: boolean) => void;
}) {
  const [name, setName] = useState<string>(materialType.type_name);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async () => {
    if (!name) return;
    if (name === materialType.type_name) {
      return toast.warning('Change the type name first!');
    }
    setLoading(true);
    const udpatedType = await updateMaterialType(materialType.id, name);
    setLoading(false);
    if (udpatedType.error) {
      toast.error(udpatedType.message);
    }
    if (udpatedType.type_name === name) {
      toast.success('Update successful');
      openHandler(false);
    }
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 z-[60] bg-black/80 flex justify-center items-center text-left font-normal">
      <div className="w-[450px]  border-2 rounded-lg bg-background p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg text-left font-semibold leading-none tracking-tight">Edit</h2>
            <p className="text-sm font-normal text-muted-foreground text-left mt-[6px]">
              Edit material type. Change the name and click Edit button
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
            <Button size="sm" onClick={handleEdit} disabled={loading}>
              {loading && <LuLoader2 className="mr-2 animate-spin w-4 h-4" />} Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
