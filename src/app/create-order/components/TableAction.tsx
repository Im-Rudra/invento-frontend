import { Material, MaterialType, Order, Supplier } from '@/types';
import EditOrderButton from './EditOrderButton';
import DeletionAlert from './DeletionAlert';

export default function TableAction({
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
  return (
    <div className="flex gap-1 items-center justify-center">
      <EditOrderButton
        order={order}
        materials={materials}
        suppliers={suppliers}
        materialTypes={materialTypes}
      />
      <DeletionAlert id={order.id} />
    </div>
  );
}
