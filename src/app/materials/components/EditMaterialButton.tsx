'use client';

import { Button } from '@/components/ui/button';
import { Material, MaterialType } from '@/types';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import EditModal from './EditModal';

export default function EditMaterialButton({
  material,
  materialTypes
}: {
  material: Material;
  materialTypes: MaterialType[];
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => setOpen(true)}>
        <FaRegEdit className="w-4 h-4" />
      </Button>
      {open && (
        <EditModal material={material} materialTypes={materialTypes} openHandler={setOpen} />
      )}
    </>
  );
}
