import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getDate } from '@/lib/utils';
import { Material, MaterialType, Order, Supplier } from '@/types';
import TableAction from './TableAction';
import { IoLeafOutline } from 'react-icons/io5';

export default function OrderTable({
  orders,
  materials,
  suppliers,
  materialTypes
}: {
  orders: Order[];
  suppliers: Supplier[];
  materials: Material[];
  materialTypes: MaterialType[];
}) {
  if (orders.length <= 0) {
    return (
      <div className="text-xl mt-6 mb-2 flex justify-center items-center flex-col">
        <IoLeafOutline className="w-20 h-20" />
        <h3>No Orders</h3>
      </div>
    );
  }
  return (
    <ScrollArea className="h-[450px] rounded border-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SN</TableHead>
            <TableHead className="">(id) Supplier</TableHead>
            <TableHead className="">(id) Type</TableHead>
            <TableHead className="">Materials</TableHead>
            <TableHead className="">Total Cost $</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="w-[200px]">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, i) => (
            <TableRow key={order.id}>
              <TableCell className="text-center">{i + 1}</TableCell>
              <TableCell>
                {order.supplier_id
                  ? `(${order.supplier_id}) ${order.Supplier?.supplier_name}`
                  : 'N/A'}
              </TableCell>
              <TableCell>{`(${order.material_type_id}) ${order.Material_Type?.type_name}`}</TableCell>
              <TableCell className="text-center">{order.Materials.length}</TableCell>
              <TableCell className="text-right">
                {order.Materials.reduce((t, m) => t + m.price, 0)}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className="flex justify-between items-center">
                <span>{getDate(order.created_at)}</span>
                <TableAction
                  materials={materials}
                  materialTypes={materialTypes}
                  order={order}
                  suppliers={suppliers}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
