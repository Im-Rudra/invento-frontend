import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Material, Supplier } from '@/types';
import moment from 'moment';
import { IoLeafOutline } from 'react-icons/io5';
import TableAction from './TableAction';

const getDate = (date: string) => {
  return moment(date).format('ll');
};

export default function SupplierTable({
  suppliers,
  materials
}: {
  suppliers: Supplier[];
  materials: Material[];
}) {
  if (suppliers.length <= 0) {
    return (
      <div className="text-xl mt-6 mb-2 flex justify-center items-center flex-col">
        <IoLeafOutline className="w-20 h-20" />
        <h3>No suppliers found</h3>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[450px] rounded border-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SN</TableHead>
            <TableHead className="w-[200px]">(id) Name</TableHead>
            <TableHead>Materials</TableHead>
            <TableHead>Addresses</TableHead>
            <TableHead className="w-[200px]">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier, i) => (
            <TableRow key={supplier.id}>
              <TableCell className="text-center">{i + 1}</TableCell>
              <TableCell>{`(${supplier.id}) ${supplier.supplier_name}`}</TableCell>
              <TableCell className="text-center">{`${supplier.Materials?.length}`}</TableCell>
              <TableCell className="text-center">{`${supplier.addresses?.length}`}</TableCell>
              <TableCell className="flex justify-between items-center">
                <span>{getDate(supplier.created_at)}</span>
                <TableAction supplier={supplier} materials={materials} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
