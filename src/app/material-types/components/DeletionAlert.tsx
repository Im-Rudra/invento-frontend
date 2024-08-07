'use client';

import { deleteMaterialType } from '@/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';

export default function DeletionAlert({ id }: { id: number }) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    const deletion = await deleteMaterialType(id);
    if (deletion.error) {
      toast.error(deletion.message);
    }
    if (deletion.count > 0) {
      toast.success('Deletion Successful');
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className={cn(
          buttonVariants({
            variant: 'ghost',
            size: 'icon'
          }),
          'w-6 h-6'
        )}
      >
        <FaRegTrashAlt className="w-4 h-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the material type and also
            materials marked under this.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={cn(
              buttonVariants({
                size: 'sm',
                variant: 'secondary'
              })
            )}
          >
            Cancel
          </AlertDialogCancel>
          <Button disabled={loading} variant="destructive" size="sm" onClick={handleDelete}>
            {loading && <LuLoader2 className="mr-2 animate-spin w-4 h-4" />} Yes, delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
