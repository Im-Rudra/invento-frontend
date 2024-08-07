'use client';

import { Button } from '@/components/ui/button';
import { Material, MaterialType, Order, Supplier } from '@/types';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import EditModal from './EditModal';

export default function EditOrderButton({
  order,
  suppliers,
  materials,
  materialTypes
}: {
  suppliers: Supplier[];
  materials: Material[];
  materialTypes: MaterialType[];
  order: Order;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => setOpen(true)}>
        <FaRegEdit className="w-4 h-4" />
      </Button>
      {open && (
        <EditModal
          order={order}
          materials={materials}
          materialTypes={materialTypes}
          suppliers={suppliers}
          openHandler={setOpen}
        />
      )}
    </>
  );
}
