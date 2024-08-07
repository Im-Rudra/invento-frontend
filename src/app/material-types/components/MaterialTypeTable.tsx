import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { MaterialType } from '@/types';
import moment from 'moment';
import TableAction from './TableAction';

const getDate = (date: string) => {
  return moment(date).format('ll');
};

export function MaterialTypeTable({ materialTypes }: { materialTypes: MaterialType[] }) {
  return (
    <ScrollArea className="h-[450px] rounded border-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SN</TableHead>
            <TableHead className="w-[200px]">Type Name</TableHead>
            <TableHead className="w-[200px]">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materialTypes.map((type, i) => (
            <TableRow key={type.id}>
              <TableCell className="text-center">{i + 1}</TableCell>
              <TableCell>{type.type_name}</TableCell>
              <TableCell className="flex justify-between items-center">
                <span>{getDate(type.created_at)}</span>
                <TableAction materialType={type} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
