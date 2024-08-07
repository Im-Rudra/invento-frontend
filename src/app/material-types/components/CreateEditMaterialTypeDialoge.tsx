'use client';

import { createMaterialType, updateMaterialType } from '@/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';

export function CreateEditMaterialTypeDialog({
  mode,
  type
}: {
  mode: 'edit' | 'create';
  type?: any;
}) {
  const [name, setName] = useState<string>(type?.type_name ? type.type_name : '');
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    if (!name) return toast.warning('Type name cannot be empty');
    setLoading(true);
    const newType = await createMaterialType({ type_name: name });
    setLoading(false);
    if (newType.error) {
      toast.error(newType.message);
    }
    if (newType.id) {
      setName('');
      toast.success('Creation successful');
      setOpen(false);
    }
  };

  const handleEdit = async () => {
    if (!name) return;
    if (name === type.type_name) {
      return toast.warning('Change the type name first!');
    }
    setLoading(true);
    const udpatedType = await updateMaterialType(type.id, name);
    setLoading(false);
    if (udpatedType.error) {
      toast.error(udpatedType.message);
    }
    if (udpatedType.type_name === name) {
      toast.success('Update successful');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'create' ? (
          <Button variant="outline">
            New
            <FiPlusCircle className="w-5 h-5 ml-2" />
          </Button>
        ) : mode === 'edit' ? (
          <Button variant="ghost" size="icon" className="w-6 h-6">
            <FaRegEdit className="w-4 h-4" />
          </Button>
        ) : (
          ''
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create' : mode === 'edit' ? 'Edit' : ''}</DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Create new material type. Input type name and click Save'
              : mode === 'edit'
              ? 'Edit material type.'
              : ''}
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="type_name">Type Name</Label>
          <Input
            type="text"
            id="type_name"
            placeholder="Material type"
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase())}
          />
        </div>
        <DialogFooter>
          {mode === 'create' ? (
            <Button size="sm" onClick={handleSave} disabled={loading}>
              {loading && <LuLoader2 className="mr-2 animate-spin w-4 h-4" />} Create
            </Button>
          ) : mode === 'edit' ? (
            <Button size="sm" onClick={handleEdit} disabled={loading}>
              {loading && <LuLoader2 className="mr-2 animate-spin w-4 h-4" />} Edit
            </Button>
          ) : (
            ''
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
