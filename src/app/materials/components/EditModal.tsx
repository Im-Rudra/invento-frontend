'use client';

import { createMaterial, updateMaterial } from '@/actions';
import { Combobox } from '@/components/Combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateMaterial, Material, MaterialType } from '@/types';
import { useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';

export default function EditModal({
  openHandler,
  material,
  materialTypes
}: {
  openHandler: (open: boolean) => void;
  material: Material;
  materialTypes: MaterialType[];
}) {
  const [name, setName] = useState<string>(material.material_name);
  const [price, setPrice] = useState<number>(material.price);
  const [typeId, setTypeId] = useState<number>(material.material_type_id);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async () => {
    if (!material) return;
    if (!name) return toast.warning('Material-name cannot be empty!');
    if (price <= 0) return toast.warning('Please set a price!');
    if (!typeId) return toast.warning('Material-type cannot be empty!');
    if (
      name === material.material_name &&
      typeId === material.material_type_id &&
      price === material.price
    ) {
      return toast.warning('At least material name/price/type!');
    }

    setLoading(true);
    const updateResponse = await updateMaterial(material.id, {
      material_name: name,
      material_type_id: typeId,
      price: price
    });
    setLoading(false);

    if (updateResponse.error) {
      toast.error(updateResponse.message);
    }
    if (updateResponse.count > 0) {
      toast.success('Update successful');
      openHandler(false);
    }
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 z-50 bg-black/80 flex justify-center items-center text-left font-normal">
      <div className="w-[450px]  border-2 rounded-lg bg-background p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg text-left font-semibold leading-none tracking-tight">Edit</h2>
            <p className="text-sm font-normal text-muted-foreground text-left mt-[6px]">
              Edit material. Change material properties and click Edit
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
            <Button size="sm" onClick={handleEdit} disabled={loading}>
              {loading && <LuLoader2 className="mr-2 animate-spin w-4 h-4" />} Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
