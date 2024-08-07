import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Material } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function MaterialsTable({
  materials,
  setMaterialIds,
  heightClass = 'h-64'
}: {
  materials: Material[];
  setMaterialIds: Dispatch<SetStateAction<number[]>>;
  heightClass?: string;
}) {
  const isMaterials = !!materials.length;
  return (
    <div>
      {!isMaterials && (
        <div
          className={cn(heightClass, 'flex items-center justify-center w-full rounded border-2')}
        >
          <span>Select materials</span>
        </div>
      )}

      {isMaterials && (
        <ScrollArea className={cn(heightClass, 'w-full border-2 rounded')}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">SN</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Price $</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material, i) => (
                <TableRow key={material.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{`(${material.id}) ${material.material_name}`}</TableCell>
                  <TableCell className="flex items-center justify-between">
                    <span>{material.price}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => {
                        setMaterialIds((prev) => prev.filter((id) => id !== material.id));
                      }}
                    >
                      <FaRegTrashAlt className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="sticky bottom-0 p-1 flex justify-end items-center bg-background">
            <span className="mr-4">
              Total: {materials.reduce((total, material) => total + material.price, 0)}
            </span>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
