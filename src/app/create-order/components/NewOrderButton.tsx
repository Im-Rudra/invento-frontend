'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import CreateModal from './CreateModal';
import { Material, MaterialType, Supplier } from '@/types';

export default function NewOrderButton({
  suppliers,
  materials,
  materialTypes
}: {
  suppliers: Supplier[];
  materials: Material[];
  materialTypes: MaterialType[];
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>
        New
        <FiPlusCircle className="w-5 h-5 ml-2" />
      </Button>
      {open && (
        <CreateModal
          suppliers={suppliers}
          materials={materials}
          materialTypes={materialTypes}
          openHandler={setOpen}
        />
      )}
    </div>
  );
}
