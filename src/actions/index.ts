'use server';

import { serverUrl } from '@/constants';
import {
  CreateMaterial,
  CreateOrder,
  CreateOrUpdateSupplier,
  UpdateMaterial,
  UpdateOrder
} from '@/types';
import { revalidatePath } from 'next/cache';

// material types
export async function getAllMaterialType() {
  try {
    const response = await fetch(`${serverUrl}/material-type`, {
      method: 'GET'
    });
    return response.json();
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export async function createMaterialType(data: { type_name: string }) {
  try {
    const response = await fetch(`${serverUrl}/material-type`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const newMaterialType = await response.json();
    if (newMaterialType.id) {
      revalidatePath('/material-types');
      revalidatePath('/materials');
      revalidatePath('/suppliers');
      revalidatePath('/create-order');
    }
    return newMaterialType;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.message
    };
  }
}

export async function deleteMaterialType(id: number) {
  try {
    const response = await fetch(`${serverUrl}/material-type?id=${id}`, {
      method: 'DELETE'
    });
    const data: any = await response.json();
    if (data.count > 0) {
      revalidatePath('/material-types');
      revalidatePath('/materials');
      revalidatePath('/suppliers');
      revalidatePath('/create-order');
    }
    return data;
  } catch (error: any) {
    console.log(error.message);
    return {
      error: true,
      message: error.message
    };
  }
}

export async function updateMaterialType(id: number, type_name: string) {
  try {
    const response = await fetch(`${serverUrl}/material-type`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, type_name })
    });
    const updatedType = await response.json();
    if (updatedType.id) {
      revalidatePath('/material-types');
      revalidatePath('/materials');
      revalidatePath('/suppliers');
      revalidatePath('/create-order');
    }
    return updatedType;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.message
    };
  }
}

// materials
export async function getAllMaterials() {
  try {
    const response = await fetch(`${serverUrl}/material`, {
      method: 'GET'
    });
    return response.json();
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export async function createMaterial(data: CreateMaterial) {
  try {
    const response = await fetch(`${serverUrl}/material`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const newMaterial = await response.json();
    if (newMaterial.id) {
      revalidatePath('/materials');
      revalidatePath('/suppliers');
      revalidatePath('/create-order');
    }
    return newMaterial;
  } catch (error: any) {
    console.log(error.message);
    return {
      error: true,
      message: error.message
    };
  }
}

export async function deleteMaterial(targetId: number) {
  try {
    const response = await fetch(`${serverUrl}/material/${targetId}`, {
      method: 'DELETE'
    });
    const deleteResponse = await response.json();
    if ('count' in deleteResponse && deleteResponse.count > 0) {
      revalidatePath('/materials');
      revalidatePath('/suppliers');
      revalidatePath('/create-order');
    }
    return deleteResponse;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.message
    };
  }
}

export async function updateMaterial(targetId: number, updateData: UpdateMaterial) {
  try {
    const response = await fetch(`${serverUrl}/material/${targetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    const data = await response.json();
    if ('count' in data && data.count > 0) {
      revalidatePath('/materials');
      revalidatePath('/suppliers');
      revalidatePath('/create-order');
    }
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.message
    };
  }
}

// suppliers
export async function getAllSuppliers() {
  try {
    const response = await fetch(`${serverUrl}/supplier`, {
      method: 'GET'
    });
    return response.json();
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export async function createSupplier(data: CreateOrUpdateSupplier) {
  try {
    const response = await fetch(`${serverUrl}/supplier`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const newSupplier = await response.json();
    if (newSupplier.id) {
      revalidatePath('/suppliers');
      revalidatePath('/create-order');
    }
    return newSupplier;
  } catch (error: any) {
    console.log(error.message);
    return {
      error: true,
      message: error.message
    };
  }
}

export async function deleteSupplier(targetId: number) {
  try {
    const response = await fetch(`${serverUrl}/supplier/${targetId}`, {
      method: 'DELETE'
    });
    const deleteResponse = await response.json();
    if ('count' in deleteResponse && deleteResponse.count > 0) {
      revalidatePath('/suppliers');
      revalidatePath('/create-order');
    }
    return deleteResponse;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.message
    };
  }
}

export async function updateSupplier(targetId: number, updateData: CreateOrUpdateSupplier) {
  try {
    const response = await fetch(`${serverUrl}/supplier/${targetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    const data = await response.json();
    if (data?.id) {
      revalidatePath('/suppliers');
      revalidatePath('/create-order');
    }
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.message
    };
  }
}

// create-order
export async function createOrder(data: CreateOrder) {
  try {
    const response = await fetch(`${serverUrl}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const newOrder = await response.json();
    if (newOrder.id) {
      revalidatePath('/create-order');
    }
    return newOrder;
  } catch (error: any) {
    console.log(error.message);
    return {
      error: true,
      message: error.message
    };
  }
}

export async function getAllOrders() {
  try {
    const response = await fetch(`${serverUrl}/order`, {
      method: 'GET'
    });
    return response.json();
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export async function updateOrder(targetId: number, updateData: UpdateOrder) {
  try {
    const response = await fetch(`${serverUrl}/order/${targetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    const data = await response.json();
    if (data?.id) {
      revalidatePath('/create-order');
    }
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.message
    };
  }
}

export async function deleteOrder(targetId: number) {
  try {
    const response = await fetch(`${serverUrl}/order/${targetId}`, {
      method: 'DELETE'
    });
    const deleteResponse = await response.json();
    if ('count' in deleteResponse && deleteResponse.count > 0) {
      revalidatePath('/create-order');
    }
    return deleteResponse;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.message
    };
  }
}
