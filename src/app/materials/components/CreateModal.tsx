'use client';

import { createMaterial } from '@/actions';
import { Combobox } from '@/components/Combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateMaterial, MaterialType } from '@/types';
import { useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';

export default function CreateModal({
  openHandler,
  materialTypes
}: {
  openHandler: (open: boolean) => void;
  materialTypes: MaterialType[];
}) {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [typeId, setTypeId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    if (!name) return toast.warning('Material-name cannot be empty!');
    if (price <= 0) return toast.warning('Please set a price!');
    if (!typeId) return toast.warning('Material-type cannot be empty!');

    setLoading(true);
    const data: CreateMaterial = {
      material_name: name,
      material_type_id: typeId,
      price
    };
    const newMaterial = await createMaterial(data);
    setLoading(false);

    if (newMaterial?.error) {
      toast.error(newMaterial.message);
    }

    if (newMaterial.id) {
      toast.success('Material created successfully!');
      openHandler(false);
    }
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 z-50 bg-black/80 flex justify-center items-center text-left font-normal">
      <div className="w-[450px]  border-2 rounded-lg bg-background p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg text-left font-semibold leading-none tracking-tight">Create</h2>
            <p className="text-sm font-normal text-muted-foreground text-left mt-[6px]">
              Create new material. Input material name and click Save
            </p>
          </div>
          <div>
            <Label htmlFor="material_name">Material Name</Label>
            <Input
              type="text"
              id="material_name"
              placeholder="Material name"
              value={name}
              onChange={(e) => setName(e.target.value.toLowerCase())}
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="material_type">Material Type</Label>
            <Combobox
              id={typeId}
              setId={setTypeId}
              options={materialTypes.map((type) => ({
                id: type.id,
                name: type.type_name,
                value: type.type_name
              }))}
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
