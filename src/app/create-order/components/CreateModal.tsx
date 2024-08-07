'use client';

import { createOrder } from '@/actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateOrder, Material, MaterialType, Supplier } from '@/types';
import { useEffect, useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import Combobox from './Combobox';
import MaterialsTable from './MaterialsTable';
import MultiSelect from './MultiSelect';

export default function CreateModal({
  openHandler,
  suppliers,
  materials,
  materialTypes
}: {
  suppliers: Supplier[];
  materials: Material[];
  materialTypes: MaterialType[];
  openHandler: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<string>('materials');

  const [materialIds, setMaterialIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const selectedMaterials = materialIds.map((id) =>
    materials.find((m) => m.id === id)
  ) as Material[];

  const [supplierId, setSupplierId] = useState<number>(0);
  const [materialTypeId, setMaterialTypeId] = useState<number>(0);

  const handleSave = async () => {
    if (tab === 'suppliers') {
      if (!supplierId) return toast.warning('Select a supplier!');
    }
    if (!materialTypeId) return toast.warning('Select material type!');
    if (!materialIds.length) return toast.warning('Minimum 1 material required!');
    const data: CreateOrder = {
      material_type_id: materialTypeId,
      material_ids: materialIds,
      total_cost: selectedMaterials.reduce((total, material) => total + material.price, 0)
    };
    if (tab === 'suppliers') {
      data.supplier_id = supplierId;
    }

    setLoading(true);
    const newOrder = await createOrder(data);
    setLoading(false);

    if (newOrder?.error) {
      toast.error(newOrder.message);
    }
    if (newOrder.id) {
      toast.success('Order placed successfully!');
      openHandler(false);
    }
  };

  useEffect(() => {
    setMaterialIds([]);
  }, [tab]);

  return (
    <div className="w-full h-screen fixed left-0 top-0 z-50 bg-black/80 flex justify-center items-center text-left font-normal">
      <div className="w-[700px] border-2 rounded-lg bg-background p-6 flex flex-col gap-4">
        <h1 className="text-xl text-center font-semibold leading-none tracking-tight mb-2">
          Create Order
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <div className="w-full">
              <h2 className="text-lg text-center font-semibold leading-none tracking-tight mb-2">
                Order By
              </h2>
              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
                </TabsList>
                <TabsContent value="suppliers">
                  <div className="flex flex-col gap-2">
                    <div>
                      <Label htmlFor="suppliers">Select Supplier*</Label>
                      <Combobox
                        reset={() => {
                          setMaterialIds([]);
                          setMaterialTypeId(0);
                        }}
                        setId={setSupplierId}
                        options={suppliers.map((s) => ({
                          id: s.id,
                          name: s.supplier_name,
                          value: s.supplier_name
                        }))}
                      />
                    </div>
                    <div>
                      <Label
                        className={supplierId ? '' : 'text-muted-foreground'}
                        htmlFor="materialTypes"
                      >
                        Select Material Type*
                      </Label>
                      <Combobox
                        reset={() => {
                          setMaterialIds([]);
                        }}
                        triggerer={supplierId}
                        setId={setMaterialTypeId}
                        disabled={!supplierId}
                        options={materialTypes.map((t) => ({
                          id: t.id,
                          name: t.type_name,
                          value: t.type_name
                        }))}
                      />
                    </div>
                    <MultiSelect
                      materials={materials
                        .filter((m) => !!m.Suppliers?.find((s) => s.Supplier.id === supplierId))
                        .filter((m) => m.material_type_id === materialTypeId)}
                      values={materialIds}
                      setValues={setMaterialIds}
                      disabled={!supplierId || !materialTypeId}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="materials">
                  <div className="flex flex-col gap-2">
                    <div>
                      <Label
                        className={supplierId ? '' : 'text-muted-foreground'}
                        htmlFor="materialTypes"
                      >
                        Select Material Type*
                      </Label>
                      <Combobox
                        reset={() => {
                          setMaterialIds([]);
                        }}
                        setId={setMaterialTypeId}
                        options={materialTypes.map((t) => ({
                          id: t.id,
                          name: t.type_name,
                          value: t.type_name
                        }))}
                      />
                    </div>
                    <MultiSelect
                      materials={materials.filter((m) => m.material_type_id === materialTypeId)}
                      values={materialIds}
                      setValues={setMaterialIds}
                      disabled={
                        tab === 'suppliers' ? !supplierId || !materialTypeId : !materialTypeId
                      }
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div>
            <h2 className="text-lg text-center font-semibold leading-none tracking-tight mb-2">
              Materials
            </h2>
            <MaterialsTable materials={selectedMaterials} setMaterialIds={setMaterialIds} />
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
  );
}
