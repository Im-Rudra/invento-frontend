import Container from '@/components/Container';
import NewSupplierButton from './components/NewSupplierButton';
import { getAllMaterials, getAllSuppliers } from '@/actions';
import SupplierTable from './components/SupplierTable';

export default async function SuppliersPage() {
  const materials = await getAllMaterials();
  const suppliers = await getAllSuppliers();
  return (
    <Container>
      <div className="py-4 min-h-[calc(100vh-60px)]">
        <div className="">
          <h2 className="text-2xl text-center font-semibold">Suppliers</h2>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-center flex-col">
            <div className="mb-4">
              <NewSupplierButton materials={materials} />
            </div>
            <div>
              <SupplierTable suppliers={suppliers} materials={materials} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
