export type MaterialType = {
  id: number;
  type_name: string;
  created_at: string;
};

export type Material = {
  id: number;
  material_name: string;
  price: number;
  material_type_id: number;
  created_at: string;
  Material_Type?: MaterialType;
  Suppliers?: MaterialsOnSuppliers[];
};

export type Supplier = {
  id: number;
  supplier_name: string;
  addresses: string[];
  created_at: string;
  Materials?: MaterialsOnSuppliers[];
};

export type MaterialsOnSuppliers = {
  id: number;
  material_id: number;
  supplier_id: number;
  created_at: string;
  Material?: Material;
  Supplier?: Supplier;
};

export enum Status {
  Pending,
  Approved,
  Shipping,
  Delivered,
  Completed,
  Canceled
}

type OrderMaterial = {
  id: number;
  order_id: number;
  material_id: number;
  quantity: number;
  Order: Order;
  Material: Material;
};

export type Order = {
  id: number;
  order_type: 'by_materials' | 'by_suppliers';
  supplier_id: number;
  material_type_id: number;
  status: 'Pending' | 'Approved' | 'Shipping' | 'Delivered' | 'Completed' | 'Canceled';
  Supplier: Supplier;
  address: string;
  Material_Types: MaterialType[];
  Materials: OrderMaterial[];
  created_at: string;
  updated_at: string;
};

export type SelectOption = {
  id: number | string;
  name: string;
  value: string;
};

export type CreateMaterial = {
  material_name: string;
  material_type_id: number;
  price: number;
};

export type UpdateMaterial = {
  material_name?: string;
  material_type_id?: number;
  price?: number;
};

export type CreateOrUpdateSupplier = {
  supplier_name: string;
  addresses: string[];
  material_ids?: number[];
};

export type CreateOrder = {
  supplier_id: number;
  address: string;
  order_type: 'by_materials' | 'by_suppliers';
  material_type_ids: number[];
  material_id_qtys: MaterialQty[];
};

export type UpdateOrder = {
  supplier_id?: number;
  address?: string;
  order_type?: 'by_materials' | 'by_suppliers';
  material_type_ids?: number[];
  material_id_qtys?: MaterialQty[];
};

export type MaterialQty = {
  material_id: number;
  quantity: number;
};
