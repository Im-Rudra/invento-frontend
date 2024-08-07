'use client';

import { Label } from '@/components/ui/label';
import { Material, MaterialType, Order, Status, Supplier, UpdateOrder } from '@/types';
import { useEffect, useRef, useState } from 'react';
import Combobox from './Combobox';
import MultiSelect from './MultiSelect';
import MaterialsTable from './MaterialsTable';
import { Button } from '@/components/ui/button';
import { LuLoader2 } from 'react-icons/lu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { statuses } from '@/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Selection from './Selection';
import { toast } from 'sonner';
import { updateOrder } from '@/actions';

export default function EditModal({
  order,
  materials,
  suppliers,
  materialTypes,
  openHandler
}: {
  order: Order;
  materials: Material[];
  suppliers: Supplier[];
  materialTypes: MaterialType[];
  openHandler: (open: boolean) => void;
}) {
  const [materialIds, setMaterialIds] = useState<number[]>(order.Materials.map((m) => m.id));
  const [loading, setLoading] = useState<boolean>(false);

  const selectedMaterials = materialIds.map((id) =>
    materials.find((m) => m.id === id)
  ) as Material[];

  const [supplierId, setSupplierId] = useState<number>(order.supplier_id || 0);
  const [materialTypeId, setMaterialTypeId] = useState<number>(order.material_type_id);
  const [status, setStatus] = useState<string>(order.status);

  // const typeref = useRef(true);
  // useEffect(() => {
  //   if (typeref.current) {
  //     typeref.current = false;
  //     return;
  //   }
  //   console.log('dfsfds');
  //   setMaterialTypeId(0);
  //   setMaterialIds([]);
  //   return () => {
  //     typeref.current = true;
  //   };
  // }, [supplierId]);

  const handleUpdate = async () => {
    if (!materialTypeId) return toast.warning('Select material type!');
    if (!materialIds.length) return toast.warning('Minimum 1 material required!');
    if (!status) return toast.warning('Status cannot be empty!');
    if (order.supplier_id) {
      if (!supplierId) return toast.warning('Supplier cannot be empty!');
    }
    const data: UpdateOrder = {
      material_type_id: materialTypeId,
      material_ids: materialIds,
      total_cost: selectedMaterials.reduce((total, material) => total + material.price, 0),
      status
    };
    if (order.supplier_id) {
      data.supplier_id = supplierId;
    }
    // return console.log(data);

    setLoading(true);
    const updatedOrder = await updateOrder(order.id, data);
    setLoading(false);

    if (updatedOrder?.error) {
      toast.error(updatedOrder.message);
    }
    if (updatedOrder.id) {
      toast.success('Order updated successfully!');
      openHandler(false);
    }
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 z-50 bg-black/80 flex justify-center items-center text-left font-normal">
      <div className="w-[700px] border-2 rounded-lg bg-background p-6 flex flex-col gap-4">
        <h1 className="text-xl text-center font-semibold leading-none tracking-tight mb-2">
          Edit Order
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <div className="w-full">
              <h2 className="text-lg text-center font-semibold leading-none tracking-tight mb-2">
                Ordered By {order.supplier_id ? 'Supplier' : 'Material'}
              </h2>
              <div className="flex flex-col gap-2">
                {order.supplier_id ? (
                  <>
                    <div>
                      <Label htmlFor="suppliers">Select Supplier*</Label>
                      {/* <Combobox
                        reset={() => {
                          setMaterialTypeId(0);
                          setMaterialIds([]);
                        }}
                        selectedId={supplierId}
                        setId={setSupplierId}
                        options={suppliers.map((s) => ({
                          id: s.id,
                          name: s.supplier_name,
                          value: s.supplier_name
                        }))}
                      /> */}
                      <Selection
                        placeholder="Suppliers"
                        items={suppliers.map((s) => ({ name: s.supplier_name, value: s.id }))}
                        value={supplierId}
                        setValue={setSupplierId}
                        onChange={() => {
                          setMaterialTypeId(0);
                          setMaterialIds([]);
                        }}
                      />
                    </div>
                    <div>
                      <Label
                        className={supplierId ? '' : 'text-muted-foreground'}
                        htmlFor="materialTypes"
                      >
                        Select Material Type*
                      </Label>
                      {/* <Combobox
                        reset={() => {
                          setMaterialIds([]);
                        }}
                        triggerer={supplierId}
                        selectedId={materialTypeId}
                        setId={setMaterialTypeId}
                        disabled={!supplierId}
                        options={materialTypes.map((t) => ({
                          id: t.id,
                          name: t.type_name,
                          value: t.type_name
                        }))}
                      /> */}
                      <Selection
                        disabled={!supplierId}
                        placeholder="Material Types"
                        items={materialTypes.map((t) => ({ name: t.type_name, value: t.id }))}
                        value={materialTypeId}
                        setValue={setMaterialTypeId}
                        onChange={() => {
                          setMaterialIds([]);
                        }}
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
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="materialTypes">Select Material Type*</Label>
                      {/* <Combobox
                        reset={() => {
                          setMaterialIds([]);
                        }}
                        selectedId={materialTypeId}
                        setId={setMaterialTypeId}
                        options={materialTypes.map((t) => ({
                          id: t.id,
                          name: t.type_name,
                          value: t.type_name
                        }))}
                      /> */}
                      <Selection
                        onChange={() => {
                          setMaterialIds([]);
                        }}
                        placeholder="Material Types"
                        items={materialTypes.map((t) => ({ name: t.type_name, value: t.id }))}
                        value={materialTypeId}
                        setValue={setMaterialTypeId}
                      />
                    </div>
                    <MultiSelect
                      materials={materials.filter((m) => m.material_type_id === materialTypeId)}
                      values={materialIds}
                      setValues={setMaterialIds}
                      disabled={!materialTypeId}
                    />
                  </>
                )}
                <div>
                  <Label htmlFor="materialTypes">Status*</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status..." />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg text-center font-semibold leading-none tracking-tight mb-2">
              Materials
            </h2>
            <MaterialsTable
              heightClass={supplierId > 0 ? 'h-[264px]' : 'h-[196px]'}
              materials={selectedMaterials}
              setMaterialIds={setMaterialIds}
            />
          </div>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end ">
          <Button variant="secondary" size="sm" onClick={() => openHandler(false)}>
            Cancel
          </Button>
          <Button size="sm" disabled={loading} onClick={handleUpdate}>
            {loading && <LuLoader2 className="mr-2 animate-spin w-4 h-4" />} Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
