import { getAllMaterialType } from '@/actions';
import Container from '@/components/Container';
import { IoLeafOutline } from 'react-icons/io5';
import NewMaterialTypeButton from './components/NewMaterialButton';
import { MaterialTypeTable } from './components/MaterialTypeTable';

export default async function MaterialTypePage() {
  const materialTypes = await getAllMaterialType();
  return (
    <Container>
      <div className="py-4 min-h-[calc(100vh-60px)]">
        <div className="">
          <h2 className="text-2xl text-center font-semibold">Material Types</h2>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-center flex-col">
            {!materialTypes.length && (
              <>
                <IoLeafOutline className="w-20 h-20" />
                <h3 className="text-xl mt-6 mb-2">No Material Types Found</h3>
              </>
            )}
            <NewMaterialTypeButton />
            {!!materialTypes.length && (
              <div className="flex justify-center mt-4">
                <MaterialTypeTable materialTypes={materialTypes} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
