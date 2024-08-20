import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Material, MaterialQty } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function MaterialsTable({
  materials,
  setMaterialIds,
  heightClass = 'h-64',
  materialQtys,
  setMaterialQtys
}: {
  materials: Material[];
  setMaterialIds: Dispatch<SetStateAction<number[]>>;
  heightClass?: string;
  materialQtys: MaterialQty[];
  setMaterialQtys: Dispatch<SetStateAction<MaterialQty[]>>;
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
                <TableHead>Qty</TableHead>
                <TableHead>Price $</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material, i) => (
                <TableRow key={material.id}>
                  <TableCell className="py-3">{i + 1}</TableCell>
                  <TableCell className="py-3">{`(${material.id}) ${material.material_name}`}</TableCell>
                  <TableCell className="py-3">
                    <input
                      type="number"
                      className="inline outline-none bg-transparent max-w-16 rounded-sm border"
                      value={materialQtys.find((q) => q.material_id === material.id)?.quantity || 1}
                      onChange={(e) => {
                        if (!materialQtys.find((q) => q.material_id === material.id)?.material_id) {
                          setMaterialQtys((prev) => [
                            ...prev,
                            { material_id: material.id, quantity: 1 }
                          ]);
                        } else {
                          const newMaterialQtys = materialQtys.map((mq) => {
                            if (material.id === mq.material_id) {
                              return {
                                material_id: material.id,
                                quantity: Number(e.target.value.trim())
                              };
                            }
                            return mq;
                          });
                          setMaterialQtys(newMaterialQtys);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="flex items-center justify-between py-3">
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
              Total:{' '}
              {materials.reduce(
                (total, material) =>
                  total +
                  material.price *
                    (materialQtys.find((mq) => mq.material_id === material.id)?.quantity || 1),
                0
              )}
            </span>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
