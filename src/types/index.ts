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
  Suppliers?: {
    id: number;
    Supplier: Supplier;
  }[];
};

export type Supplier = {
  id: number;
  supplier_name: string;
  addresses: string[];
  created_at: string;
  Materials?: {
    id: number;
    Material: Material;
  }[];
};

export enum Status {
  Pending,
  Approved,
  Shipping,
  Delivered,
  Completed,
  Canceled
}

export type Order = {
  id: number;
  supplier_id: number;
  material_type_id: number;
  status: 'Pending' | 'Approved' | 'Shipping' | 'Delivered' | 'Completed' | 'Canceled';
  Supplier: Supplier;
  Material_Type: MaterialType;
  Materials: Material[];
  total_cost: number;
  created_at: string;
  updated_at: string;
};

export type ComboboxOption = {
  id: number;
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
  material_type_id: number;
  material_ids: number[];
  supplier_id?: number;
  total_cost: number;
};

export type UpdateOrder = {
  material_type_id?: number;
  material_ids?: number[];
  supplier_id?: number;
  total_cost?: number;
  status?: string;
};
