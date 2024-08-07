import { Material, Supplier } from '@/types';
import DeletionAlert from './DeletionAlert';
import EditSupplierButton from './EditSupplierButton';

export default function TableAction({
  supplier,
  materials
}: {
  materials: Material[];
  supplier: Supplier;
}) {
  return (
    <div className="flex gap-1 items-center justify-center">
      <EditSupplierButton supplier={supplier} materials={materials} />
      <DeletionAlert id={supplier.id} />
    </div>
  );
}
