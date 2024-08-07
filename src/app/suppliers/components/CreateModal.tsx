'use client';

import { createMaterial, createSupplier } from '@/actions';
import { Combobox } from '@/components/Combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreateMaterial, CreateOrUpdateSupplier, Material, MaterialType } from '@/types';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { LuLoader2 } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';

export default function CreateModal({
  openHandler,
  materials
}: {
  materials: Material[];
  openHandler: (open: boolean) => void;
}) {
  const [name, setName] = useState<string>('');
  const [newAddress, setNewAddress] = useState<string>('');
  const [addresses, setAddresses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [materialDropdownOpen, setMaterialDropdownOpen] = useState<boolean>(false);
  const [materialIds, setMaterialIds] = useState<number[]>([]);

  const handleSave = async () => {
    if (!name) return toast.warning('Supplier-name cannot be empty!');
    if (!addresses.length) return toast.warning('Minimum 1 address required!');
    console.log({ supplier_name: name, addresses, materials: materialIds });

    setLoading(true);
    const data: CreateOrUpdateSupplier = {
      supplier_name: name,
      addresses,
      material_ids: materialIds
    };
    const newSupplier = await createSupplier(data);
    setLoading(false);

    if (newSupplier?.error) {
      toast.error(newSupplier.message);
    }

    if (newSupplier.id) {
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
            <h2 className="text-lg text-left font-semibold leading-none tracking-tight">Create</h2>
            <p className="text-sm font-normal text-muted-foreground text-left mt-[6px]">
              Create new Supplier. Input supplier name, addresses and materials.
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
            <Label htmlFor="materials">Materials</Label>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setMaterialDropdownOpen((prev) => !prev)}
              >
                {materialIds.length > 0
                  ? `${materialIds.length} material${materialIds.length > 1 ? 's' : ''} selected`
                  : 'Please select materials...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
              {materialDropdownOpen && (
                <div className="absolute mt-1 w-full">
                  <ScrollArea className="w-full h-32 border p-1 rounded-md bg-background ">
                    <div>
                      {materials.map((material) => (
                        <div
                          key={material.id}
                          className="w-full rounded-md px-2 py-1 hover:bg-muted flex items-center cursor-pointer"
                          onClick={() => {
                            if (materialIds.includes(material.id)) {
                              return setMaterialIds((prev) =>
                                prev.filter((id) => id !== material.id)
                              );
                            }
                            setMaterialIds((prev) => [...prev, material.id]);
                          }}
                        >
                          {materialIds.includes(material.id) ? (
                            <Check className="mr-2 w-3 h-3" />
                          ) : (
                            <Check className="mr-2 w-3 h-3 text-transparent" />
                          )}
                          {material.material_name}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end ">
            <Button variant="secondary" size="sm" onClick={() => openHandler(false)}>
              Cancel
            </Button>
            <Button size="sm" disabled={loading} onClick={handleSave}>
              {loading && <LuLoader2 className="mr-2 animate-spin w-4 h-4" />} Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
