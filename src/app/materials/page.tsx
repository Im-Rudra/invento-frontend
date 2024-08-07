import { getAllMaterials, getAllMaterialType } from '@/actions';
import Container from '@/components/Container';
import MaterialTable from './components/MaterialTable';
import NewMaterialButton from './components/NewMaterialButton';

export default async function MaterialsPage() {
  const materials = await getAllMaterials();
  const materialTypes = await getAllMaterialType();
  return (
    <Container>
      <div className="py-4 min-h-[calc(100vh-60px)]">
        <div className="">
          <h2 className="text-2xl text-center font-semibold">Materials</h2>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-center flex-col">
            <div className="mb-4">
              <NewMaterialButton materialTypes={materialTypes} />
            </div>
            <div>
              <MaterialTable materials={materials} materialTypes={materialTypes} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
