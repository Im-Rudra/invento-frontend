import { Material, MaterialType } from '@/types';
import DeletionAlert from './DeletionAlert';
import EditMaterialButton from './EditMaterialButton';

export default function TableAction({
  material,
  materialTypes
}: {
  material: Material;
  materialTypes: MaterialType[];
}) {
  return (
    <div className="flex gap-1 items-center justify-center">
      <EditMaterialButton material={material} materialTypes={materialTypes} />
      <DeletionAlert id={material.id} />
    </div>
  );
}
