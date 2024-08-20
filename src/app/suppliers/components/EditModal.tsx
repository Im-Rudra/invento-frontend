'use client';

import { updateSupplier } from '@/actions';
import MultiSelect from '@/components/MultiSelect';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateOrUpdateSupplier, Material, Supplier } from '@/types';
import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { LuLoader2 } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';

export default function EditModal({
  supplier,
  openHandler,
  materials
}: {
  supplier: Supplier;
  materials: Material[];
  openHandler: (open: boolean) => void;
}) {
  const [name, setName] = useState<string>(supplier.supplier_name);
  const [addresses, setAddresses] = useState<string[]>(supplier.addresses);
  const [materialIds, setMaterialIds] = useState<number[]>(
    supplier.Materials?.length ? supplier.Materials?.map((m) => m.Material?.id!) : []
  );
  const [newAddress, setNewAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async () => {
    if (!name) return toast.warning('Supplier-name cannot be empty!');
    if (!addresses.length) return toast.warning('Minimum 1 address required!');
    if (!(materialIds.length > 0)) return toast.warning('Minimum 1 material required!');

    setLoading(true);
    const data: CreateOrUpdateSupplier = {
      supplier_name: name,
      addresses,
      material_ids: materialIds
    };
    const updatedSupplier = await updateSupplier(supplier.id, data);
    setLoading(false);

    if (updatedSupplier?.error) {
      toast.error(updatedSupplier.message);
    }

    if (updatedSupplier.id) {
      toast.success('Supplier created successfully!');
      openHandler(false);
    }
  };

  const handleNewAddress = () => {
    if (!newAddress || addresses.includes(newAddress)) {
      return;
    }
    setAddresses((prev) => [...prev, newAddress]);
    setNewAddress('');
  };

  const handleRemoveAddress = (targetAddress: string) => {
    const newAddresses = addresses.filter((address) => address !== targetAddress);
    setAddresses(newAddresses);
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 z-50 bg-black/80 flex justify-center items-center text-left font-normal">
      <div className="w-[450px]  border-2 rounded-lg bg-background p-6">
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="text-lg text-left font-semibold leading-none tracking-tight">Edit</h2>
            <p className="text-sm font-normal text-muted-foreground text-left mt-[6px]">
              Edit Supplier. Input supplier name, addresses and materials.
            </p>
          </div>

          <div>
            <Label htmlFor="material_name">Supplier Name*</Label>
            <Input
              type="text"
              id="material_name"
              placeholder="Material name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="address">Addresses*</Label>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                id="address"
                placeholder="Add address"
                onKeyUp={(e) => e.key === 'Enter' && handleNewAddress()}
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
              <Button variant="outline" size="icon" onClick={handleNewAddress}>
                <FiPlusCircle className="w-6 h-6" />
              </Button>
            </div>
            {addresses.length > 0 && (
              <div className="w-full max-h-28 rounded-md border-2 overflow-y-auto supplier-address-scrollbar">
                <div className=" flex flex-wrap p-1 gap-1">
                  {addresses.map((address) => (
                    <div
                      key={address}
                      className="rounded py-1 pl-2 pr-1 border flex gap-1 items-center cursor-default text-sm"
                    >
                      <span>{address}</span>
                      <Button size="icon" variant="ghost" className="w-[22px] h-[22px]">
                        <RxCross2 onClick={() => handleRemoveAddress(address)} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <MultiSelect
              itemType="material"
              title="Materials"
              values={materialIds}
              setValues={setMaterialIds}
              options={materials.map((m) => ({
                id: m.id,
                name: m.material_name,
                value: m.material_name
              }))}
              disabled={false}
            />
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end ">
            <Button variant="secondary" size="sm" onClick={() => openHandler(false)}>
              Cancel
            </Button>
            <Button size="sm" disabled={loading} onClick={handleEdit}>
              {loading && <LuLoader2 className="mr-2 animate-spin w-4 h-4" />} Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
