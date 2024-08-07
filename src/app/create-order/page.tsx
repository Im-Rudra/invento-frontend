import Container from '@/components/Container';
import NewOrderButton from './components/NewOrderButton';
import { getAllMaterials, getAllMaterialType, getAllOrders, getAllSuppliers } from '@/actions';
import OrderTable from './components/OrderTable';

export default async function CreateOrderPage() {
  const orders = await getAllOrders();
  const suppliers = await getAllSuppliers();
  const materials = await getAllMaterials();
  const materialTypes = await getAllMaterialType();
  return (
    <Container>
      <div className="py-4 min-h-[calc(100vh-60px)]">
        <div className="">
          <h2 className="text-2xl text-center font-semibold">Create purchase order</h2>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-center flex-col">
            <div className="mb-4">
              <NewOrderButton
                suppliers={suppliers}
                materials={materials}
                materialTypes={materialTypes}
              />
            </div>
            <div>
              <OrderTable
                orders={orders}
                materials={materials}
                suppliers={suppliers}
                materialTypes={materialTypes}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
