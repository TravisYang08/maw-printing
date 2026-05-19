import { createClient } from "@supabase/supabase-js";
import { getProductById, getProductColor } from "@/data/repository";
import type { Order } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type OrderRow = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  payment_method: string;
  notes: string | null;
  category: string;
  product_id: string;
  product_name: string;
  color_id: string;
  color_name: string;
  size: string;
  print_method: string;
  print_position: string;
  print_size: string;
  quantity: number;
  design_url: string | null;
  design_file_name: string | null;
  total_price: number;
  status: string;
  created_at: string;
};

export function rowToOrder(row: OrderRow): Order {
  return {
    id: row.id,
    name: row.customer_name,
    phone: row.phone,
    address: row.address,
    payment: row.payment_method as Order["payment"],
    notes: row.notes ?? undefined,
    tab: "tshirt",
    productId: row.product_id,
    productName: row.product_name,
    colorId: row.color_id,
    colorName: row.color_name,
    category: row.category as Order["category"],
    size: row.size as Order["size"],
    printMethod: row.print_method as Order["printMethod"],
    printPosition: row.print_position as Order["printPosition"],
    printSize: row.print_size as Order["printSize"],
    quantity: row.quantity,
    designUrl: row.design_url,
    designFileName: row.design_file_name,
    totalPrice: row.total_price,
    status: row.status as Order["status"],
    createdAt: row.created_at,
  };
}

export async function createOrder(
  order: Omit<Order, "id" | "createdAt" | "status">
): Promise<{ data: Order | null; error: string | null }> {
  if (!supabase) {
    return { data: null, error: "Supabase is not configured" };
  }

  const product = getProductById(order.productId);
  const color = getProductColor(order.productId, order.colorId);

  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_name: order.name,
      phone: order.phone,
      address: order.address,
      payment_method: order.payment,
      notes: order.notes ?? null,
      category: product?.category ?? order.category,
      product_id: order.productId,
      product_name: product?.name ?? order.productName,
      color_id: order.colorId,
      color_name: color?.name ?? order.colorName,
      size: order.size,
      print_method: order.printMethod,
      print_position: order.printPosition,
      print_size: order.printSize,
      quantity: order.quantity,
      design_url: order.designUrl,
      design_file_name: order.designFileName,
      total_price: order.totalPrice,
      status: "pending",
    })
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data: rowToOrder(data as OrderRow), error: null };
}

export async function fetchOrders(): Promise<{
  data: Order[];
  error: string | null;
}> {
  if (!supabase) {
    return { data: [], error: "Supabase is not configured" };
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data: (data as OrderRow[]).map(rowToOrder), error: null };
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<{ error: string | null }> {
  if (!supabase) {
    return { error: "Supabase is not configured" };
  }

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  return { error: error?.message ?? null };
}
