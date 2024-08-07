import { MaterialType } from '@/types';
import DeletionAlert from './DeletionAlert';
import EditMaterialTypeButton from './EditMaterialTypeButton';

export default function TableAction({ materialType }: { materialType: MaterialType }) {
  return (
    <div className="flex gap-1 items-center justify-center">
      <EditMaterialTypeButton materialType={materialType} />
      <DeletionAlert id={materialType.id} />
    </div>
  );
}
