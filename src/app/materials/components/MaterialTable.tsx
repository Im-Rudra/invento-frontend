'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Material, MaterialType } from '@/types';
import moment from 'moment';
import { IoLeafOutline } from 'react-icons/io5';
import TableAction from './TableAction';

const getDate = (date: string) => {
  return moment(date).format('ll');
};

export default function MaterialTable({
  materials,
  materialTypes
}: {
  materials: Material[];
  materialTypes: MaterialType[];
}) {
  if (materials.length <= 0) {
    return (
      <div className="text-xl mt-6 mb-2 flex justify-center items-center flex-col">
        <IoLeafOutline className="w-20 h-20" />
        <h3>No Materials Found</h3>
      </div>
    );
  }

  return (
    <ScrollArea className="h-96">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SN</TableHead>
            <TableHead className="w-[200px]">(id) Name</TableHead>
            <TableHead className="w-[200px]">(id) Type</TableHead>
            <TableHead className="w-[100px]">Price ($)</TableHead>
            <TableHead className="w-[200px]">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((material, i) => (
            <TableRow key={material.id}>
              <TableCell className="text-center">{i + 1}</TableCell>
              <TableCell>{`(${material.id}) ${material.material_name}`}</TableCell>
              <TableCell>{`(${material.material_type_id}) ${material.Material_Type?.type_name}`}</TableCell>
              <TableCell>{material.price}</TableCell>
              <TableCell className="flex justify-between items-center">
                <span>{getDate(material.created_at)}</span>
                <TableAction material={material} materialTypes={materialTypes} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
