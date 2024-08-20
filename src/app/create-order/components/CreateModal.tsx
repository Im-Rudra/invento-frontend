'use client';

import { createOrder } from '@/actions';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateOrder, Material, MaterialQty, MaterialType, Supplier } from '@/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import MaterialsTable from './MaterialsTable';
import SelectBox from '@/components/SelectBox';
import MultiSelect from '@/components/MultiSelect';

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
  const [tab, setTab] = useState<'by_materials' | 'by_suppliers'>('by_materials');

  const [materialIds, setMaterialIds] = useState<number[]>([]);
  const [supplierId, setSupplierId] = useState<number>(0);
  const [materialTypeIds, setMaterialTypeIds] = useState<number[]>([]);
  const [address, setAddress] = useState<string>('');

  const [materialQtys, setMaterialQtys] = useState<MaterialQty[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const selectedMaterials = materialIds.map((id) =>
    materials.find((m) => m.id === id)
  ) as Material[];

  const handleSave = async () => {
    if (!supplierId) return toast.warning('Supplier required!');
    if (!materialTypeIds.length) return toast.warning('Minimum 1 material type required!');
    if (!materialIds.length) return toast.warning('Minimum 1 material required!');
    if (!address) return toast.warning('Address required!');

    const data: CreateOrder = {
      supplier_id: supplierId,
      address,
      order_type: tab,
      material_type_ids: materialTypeIds,
      material_id_qtys: materialIds.map((i) => ({
        material_id: i,
        quantity: materialQtys.find((mq) => mq.material_id === i)?.quantity || 1
      }))
    };

    // return console.log(data);

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
    setMaterialTypeIds([]);
    setSupplierId(0);
    setAddress('');
  }, [tab]);

  function getCommonSuppliers(seletectedMaterialIds: number[], suppliers: Supplier[]) {
    const supplierMaterialCountMap = new Map();
    suppliers.forEach((supplier) => {
      supplier.Materials?.forEach((materialSupplier) => {
        if (seletectedMaterialIds.includes(materialSupplier.material_id)) {
          if (!supplierMaterialCountMap.has(supplier.id)) {
            supplierMaterialCountMap.set(supplier.id, 0);
          }
          supplierMaterialCountMap.set(supplier.id, supplierMaterialCountMap.get(supplier.id) + 1);
        }
      });
    });
    return suppliers.filter(
      (supplier) => supplierMaterialCountMap.get(supplier.id) === seletectedMaterialIds.length
    );
  }

  return (
    <div className="w-full h-screen fixed left-0 top-0 z-50 bg-black/80 flex justify-center items-center text-left font-normal">
      <div className="w-[900px] border-2 rounded-lg bg-background p-6 flex flex-col gap-4">
        <h1 className="text-xl text-center font-semibold leading-none tracking-tight mb-2">
          Create Order
        </h1>
        <div className="grid grid-cols-12 gap-4">
          <div className="flex flex-col gap-3 col-span-5">
            <div className="w-full">
              <h2 className="text-lg text-center font-semibold leading-none tracking-tight mb-2">
                Order By
              </h2>
              <Tabs
                value={tab}
                onValueChange={setTab as Dispatch<SetStateAction<string>>}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="by_materials">Materials</TabsTrigger>
                  <TabsTrigger value="by_suppliers">Suppliers</TabsTrigger>
                </TabsList>
                <TabsContent value="by_suppliers">
                  <div className="flex flex-col gap-2">
                    <SelectBox
                      htmlFor="supplier"
                      title="Select Supplier*"
                      value={supplierId}
                      setValue={setSupplierId}
                      options={suppliers.map((s) => ({
                        id: s.id,
                        name: s.supplier_name,
                        value: s.supplier_name
                      }))}
                      changeHandler={() => {
                        setMaterialIds([]);
                        setMaterialTypeIds([]);
                        setAddress('');
                      }}
                    />
                    <MultiSelect
                      itemType="Material-Type"
                      title="Select material types"
                      values={materialTypeIds}
                      setValues={setMaterialTypeIds}
                      options={materialTypes.map((t) => ({
                        id: t.id,
                        name: t.type_name,
                        value: t.type_name
                      }))}
                      disabled={!supplierId}
                      onChange={() => {
                        setMaterialIds([]);
                      }}
                    />
                    <MultiSelect
                      itemType="material"
                      title="Select Materials*"
                      values={materialIds}
                      setValues={setMaterialIds}
                      disabled={!supplierId || !materialTypeIds.length}
                      options={materials
                        .filter((m) => !!m.Suppliers?.find((s) => s.Supplier?.id === supplierId))
                        .filter((m) => materialTypeIds.includes(m.material_type_id))
                        .map((m) => ({ id: m.id, name: m.material_name, value: m.material_name }))}
                    />
                    <SelectBox
                      htmlFor="address"
                      title="Select address*"
                      value={address}
                      setValue={setAddress}
                      disabled={!supplierId}
                      options={
                        suppliers
                          .find((s) => s.id === supplierId)
                          ?.addresses.map((address) => ({
                            id: address,
                            name: address,
                            value: address
                          })) || []
                      }
                    />
                  </div>
                </TabsContent>
                <TabsContent value="by_materials">
                  <div className="flex flex-col gap-2">
                    <div>
                      <MultiSelect
                        itemType="Material-Type"
                        title="Select material types"
                        values={materialTypeIds}
                        setValues={setMaterialTypeIds}
                        options={materialTypes.map((t) => ({
                          id: t.id,
                          name: t.type_name,
                          value: t.type_name
                        }))}
                        disabled={false}
                        onChange={() => {
                          setMaterialIds([]);
                          setSupplierId(0);
                        }}
                      />
                    </div>
                    <MultiSelect
                      options={materials
                        .filter((m) => materialTypeIds.includes(m.material_type_id))
                        .map((m) => ({ id: m.id, name: m.material_name, value: m.material_name }))}
                      itemType="Material"
                      title="Select Materials"
                      values={materialIds}
                      setValues={setMaterialIds}
                      disabled={!materialTypeIds.length}
                      onChange={() => {
                        setSupplierId(0);
                      }}
                    />

                    <SelectBox
                      htmlFor="supplier"
                      title="Select Supplier*"
                      disabled={!materialIds.length}
                      value={supplierId}
                      setValue={setSupplierId}
                      options={getCommonSuppliers(materialIds, suppliers).map((s) => ({
                        id: s.id,
                        name: s.supplier_name,
                        value: s.supplier_name
                      }))}
                      changeHandler={() => {
                        setAddress('');
                      }}
                    />

                    <SelectBox
                      htmlFor="address"
                      title="Select address*"
                      value={address}
                      setValue={setAddress}
                      disabled={!supplierId}
                      options={
                        suppliers
                          .find((s) => s.id === supplierId)
                          ?.addresses.map((address) => ({
                            id: address,
                            name: address,
                            value: address
                          })) || []
                      }
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="col-span-7">
            <h2 className="text-lg text-center font-semibold leading-none tracking-tight mb-2">
              Materials
            </h2>
            <MaterialsTable
              materialQtys={materialQtys}
              setMaterialQtys={setMaterialQtys}
              materials={selectedMaterials}
              setMaterialIds={setMaterialIds}
              heightClass="h-[328px]"
            />
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
