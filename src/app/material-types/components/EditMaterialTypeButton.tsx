'use client';

import { Button } from '@/components/ui/button';
import { MaterialType } from '@/types';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import EditModal from './EditModal';

export default function EditMaterialTypeButton({ materialType }: { materialType: MaterialType }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => setOpen(true)}>
        <FaRegEdit className="w-4 h-4" />
      </Button>
      {open && <EditModal materialType={materialType} openHandler={setOpen} />}
    </>
  );
}
