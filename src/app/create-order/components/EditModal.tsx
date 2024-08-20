'use client';

import { createOrder, updateOrder } from '@/actions';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreateOrder,
  Material,
  MaterialQty,
  MaterialType,
  Order,
  Supplier,
  UpdateOrder
} from '@/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import MaterialsTable from './MaterialsTable';
import MultiSelect from '@/components/MultiSelect';
import SelectBox from '@/components/SelectBox';
import _ from 'lodash';

export default function EditModal({
  order,
  openHandler,
  suppliers,
  materials,
  materialTypes
}: {
  order: Order;
  suppliers: Supplier[];
  materials: Material[];
  materialTypes: MaterialType[];
  openHandler: (open: boolean) => void;
}) {
  const [orderType, setOrderType] = useState<'by_materials' | 'by_suppliers'>(order.order_type);

  // states for "by_materials"
  const [mMaterialIds, setMMaterialIds] = useState<number[]>(
    order.order_type === 'by_materials' ? order.Materials.map((m) => m.material_id) : []
  );
  const [mSupplierId, setMSupplierId] = useState<number>(
    order.order_type === 'by_materials' ? order.supplier_id : 0
  );
  const [mMaterialTypeIds, setMMaterialTypeIds] = useState<number[]>(
    order.order_type === 'by_materials' ? order.Material_Types.map((t) => t.id) : []
  );
  const [mAddress, setMAddress] = useState<string>(
    order.order_type === 'by_materials' ? order.address : ''
  );
  const [mMaterialQtys, setMMaterialQtys] = useState<MaterialQty[]>(
    order.order_type === 'by_materials'
      ? order.Materials.map((m) => ({ material_id: m.material_id, quantity: m.quantity }))
      : []
  );
  const selectedMMaterials = mMaterialIds.map((id) =>
    materials.find((m) => m.id === id)
  ) as Material[];

  // states for "by_suppliers"
  const [sMaterialIds, setSMaterialIds] = useState<number[]>(
    order.order_type === 'by_suppliers' ? order.Materials.map((m) => m.material_id) : []
  );
  const [sSupplierId, setSSupplierId] = useState<number>(
    order.order_type === 'by_suppliers' ? order.supplier_id : 0
  );
  const [sMaterialTypeIds, setSMaterialTypeIds] = useState<number[]>(
    order.order_type === 'by_suppliers' ? order.Material_Types.map((t) => t.id) : []
  );
  const [sAddress, setSAddress] = useState<string>(
    order.order_type === 'by_suppliers' ? order.address : ''
  );
  const [sMaterialQtys, setSMaterialQtys] = useState<MaterialQty[]>(
    order.order_type === 'by_suppliers'
      ? order.Materials.map((m) => ({ material_id: m.material_id, quantity: m.quantity }))
      : []
  );
  const selectedSMaterials = sMaterialIds.map((id) =>
    materials.find((m) => m.id === id)
  ) as Material[];

  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async () => {
    let data: UpdateOrder;

    if (orderType === 'by_materials') {
      if (!mSupplierId) return toast.warning('Supplier required!');
      if (!mMaterialTypeIds.length) return toast.warning('Minimum 1 material type required!');
      if (!mMaterialIds.length) return toast.warning('Minimum 1 material required!');
      if (!mAddress) return toast.warning('Address required!');
      data = {
        supplier_id: mSupplierId,
        address: mAddress,
        order_type: orderType
      };

      const materialQtys = mMaterialIds.map((i) => ({
        material_id: i,
        quantity: mMaterialQtys.find((mq) => mq.material_id === i)?.quantity || 1
      }));

      if (
        !_.isEqual(
          materialQtys,
          order.Materials.map((m) => ({ material_id: m.material_id, quantity: m.quantity }))
        )
      ) {
        data.material_id_qtys = materialQtys;
      }

      if (
        !_.isEqual(
          mMaterialTypeIds,
          order.Material_Types.map((t) => t.id)
        )
      ) {
        data.material_type_ids = mMaterialTypeIds;
      }
    }

    if (orderType === 'by_suppliers') {
      if (!sSupplierId) return toast.warning('Supplier required!');
      if (!sMaterialTypeIds.length) return toast.warning('Minimum 1 material type required!');
      if (!sMaterialIds.length) return toast.warning('Minimum 1 material required!');
      if (!sAddress) return toast.warning('Address required!');

      data = {
        supplier_id: sSupplierId,
        address: sAddress,
        order_type: orderType
      };

      const materialQtys = sMaterialIds.map((i) => ({
        material_id: i,
        quantity: sMaterialQtys.find((mq) => mq.material_id === i)?.quantity || 1
      }));

      if (
        !_.isEqual(
          materialQtys,
          order.Materials.map((m) => ({ material_id: m.material_id, quantity: m.quantity }))
        )
      ) {
        data.material_id_qtys = materialQtys;
      }

      if (
        !_.isEqual(
          sMaterialTypeIds,
          order.Material_Types.map((t) => t.id)
        )
      ) {
        data.material_type_ids = sMaterialTypeIds;
      }
    }

    // return console.log(data!);

    setLoading(true);
    const newOrder = await updateOrder(order.id, data!);
    setLoading(false);

    if (newOrder?.error) {
      toast.error(newOrder.message);
    }
    if (newOrder.id) {
      toast.success('Order placed successfully!');
      openHandler(false);
    }
  };

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
          Edit Order
        </h1>
        <div className="grid grid-cols-12 gap-4">
          <div className="flex flex-col gap-3 col-span-5">
            <div className="w-full">
              <h2 className="text-lg text-center font-semibold leading-none tracking-tight mb-2">
                Order By
              </h2>
              <Tabs
                value={orderType}
                onValueChange={setOrderType as Dispatch<SetStateAction<string>>}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="by_materials">Materials</TabsTrigger>
                  <TabsTrigger value="by_suppliers">Suppliers</TabsTrigger>
                </TabsList>
                <TabsContent value="by_materials">
                  <div className="flex flex-col gap-2">
                    <div>
                      <MultiSelect
                        itemType="Material-Type"
                        title="Select material types"
                        values={mMaterialTypeIds}
                        setValues={setMMaterialTypeIds}
                        options={materialTypes.map((t) => ({
                          id: t.id,
                          name: t.type_name,
                          value: t.type_name
                        }))}
                        disabled={false}
                        onChange={() => {
                          setMMaterialIds([]);
                          setMSupplierId(0);
                        }}
                      />
                    </div>
                    <MultiSelect
                      options={materials
                        .filter((m) => mMaterialTypeIds.includes(m.material_type_id))
                        .map((m) => ({ id: m.id, name: m.material_name, value: m.material_name }))}
                      itemType="Material"
                      title="Select Materials"
                      values={mMaterialIds}
                      setValues={setMMaterialIds}
                      disabled={!mMaterialTypeIds.length}
                      onChange={() => {
                        setMSupplierId(0);
                      }}
                    />

                    <SelectBox
                      htmlFor="supplier"
                      title="Select Supplier*"
                      disabled={!mMaterialIds.length}
                      value={mSupplierId}
                      setValue={setMSupplierId}
                      options={getCommonSuppliers(mMaterialIds, suppliers).map((s) => ({
                        id: s.id,
                        name: s.supplier_name,
                        value: s.supplier_name
                      }))}
                      changeHandler={() => {
                        setMAddress('');
                      }}
                    />

                    <SelectBox
                      htmlFor="address"
                      title="Select address*"
                      value={mAddress}
                      setValue={setMAddress}
                      disabled={!mSupplierId}
                      options={
                        suppliers
                          .find((s) => s.id === mSupplierId)
                          ?.addresses.map((address) => ({
                            id: address,
                            name: address,
                            value: address
                          })) || []
                      }
                    />
                  </div>
                </TabsContent>
                <TabsContent value="by_suppliers">
                  <div className="flex flex-col gap-2">
                    <SelectBox
                      htmlFor="supplier"
                      title="Select Supplier*"
                      value={sSupplierId}
                      setValue={setSSupplierId}
                      options={suppliers.map((s) => ({
                        id: s.id,
                        name: s.supplier_name,
                        value: s.supplier_name
                      }))}
                      changeHandler={() => {
                        setSMaterialIds([]);
                        setSMaterialTypeIds([]);
                        setSAddress('');
                      }}
                    />
                    <MultiSelect
                      itemType="Material-Type"
                      title="Select material types"
                      values={sMaterialTypeIds}
                      setValues={setSMaterialTypeIds}
                      options={materialTypes.map((t) => ({
                        id: t.id,
                        name: t.type_name,
                        value: t.type_name
                      }))}
                      disabled={!sSupplierId}
                      onChange={() => setSMaterialIds([])}
                    />
                    <MultiSelect
                      itemType="material"
                      title="Select Materials"
                      values={sMaterialIds}
                      setValues={setSMaterialIds}
                      disabled={!sSupplierId || !sMaterialTypeIds.length}
                      options={materials
                        .filter((m) => !!m.Suppliers?.find((s) => s.Supplier?.id === sSupplierId))
                        .filter((m) => sMaterialTypeIds.includes(m.material_type_id))
                        .map((m) => ({ id: m.id, name: m.material_name, value: m.material_name }))}
                    />
                    <SelectBox
                      htmlFor="address"
                      title="Select address*"
                      value={sAddress}
                      setValue={setSAddress}
                      disabled={!sSupplierId}
                      options={
                        suppliers
                          .find((s) => s.id === sSupplierId)
                          ?.addresses.map((a) => ({
                            id: a,
                            name: a,
                            value: a
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
            {orderType === 'by_materials' && (
              <MaterialsTable
                materialQtys={mMaterialQtys}
                setMaterialQtys={setMMaterialQtys}
                materials={selectedMMaterials}
                setMaterialIds={setMMaterialIds}
                heightClass="h-[328px]"
              />
            )}
            {orderType === 'by_suppliers' && (
              <MaterialsTable
                materialQtys={sMaterialQtys}
                setMaterialQtys={setSMaterialQtys}
                materials={selectedSMaterials}
                setMaterialIds={setSMaterialIds}
                heightClass="h-[328px]"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end ">
          <Button variant="secondary" size="sm" onClick={() => openHandler(false)}>
            Cancel
          </Button>
          <Button size="sm" disabled={loading} onClick={handleEdit}>
            {loading && <LuLoader2 className="mr-2 animate-spin w-4 h-4" />} Create
          </Button>
        </div>
      </div>
    </div>
  );
}
