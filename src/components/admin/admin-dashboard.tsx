"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchOrders, updateOrderStatus } from "@/lib/supabase";
import type { Order } from "@/types";
import { CATEGORY_LABELS } from "@/data/products";
import { PRINT_POSITIONS, PRINT_SIZES } from "@/data/printing";
import { formatKyat } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RefreshCw, Lock } from "lucide-react";

const STATUS_OPTIONS: Order["status"][] = [
  "pending",
  "processing",
  "completed",
  "cancelled",
];

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadOrders() {
    setLoading(true);
    const { data, error: fetchError } = await fetchOrders();
    setLoading(false);
    if (fetchError) setError(fetchError);
    else {
      setError(null);
      setOrders(data);
    }
  }

  useEffect(() => {
    if (authenticated) loadOrders();
  }, [authenticated]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "maw-admin";
    if (password === expected) {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid password");
    }
  }

  async function handleStatusChange(id: string, status: Order["status"]) {
    const { error: updateError } = await updateOrderStatus(id, status);
    if (updateError) {
      alert(updateError);
      return;
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }

  if (!authenticated) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col items-center justify-center px-4">
        <Lock className="mb-4 text-muted" size={32} />
        <h1 className="mb-2 text-xl font-light">Admin Access</h1>
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border bg-surface px-4 py-3 text-sm focus:border-maw-magenta focus:outline-none"
            placeholder="Password"
          />
          {authError && <p className="text-sm text-red-400">{authError}</p>}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-maw-magenta mb-1">
            Admin
          </p>
          <h1 className="text-3xl font-light tracking-tight">Orders</h1>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={loadOrders}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      {error && (
        <p className="mb-6 border border-red-900/50 bg-red-950/20 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {orders.length === 0 && !loading && (
        <p className="text-center text-muted py-12">No orders yet.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => {
          const pos = PRINT_POSITIONS.find((p) => p.code === order.printPosition);
          const psz = PRINT_SIZES.find((s) => s.code === order.printSize);
          return (
            <article
              key={order.id}
              className="border border-border bg-surface p-4 md:p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                {order.designUrl && (
                  <div className="relative h-20 w-20 shrink-0 border border-border">
                    <Image
                      src={order.designUrl}
                      alt="Design"
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-medium">{order.name}</p>
                      <p className="text-sm text-muted">{order.phone}</p>
                    </div>
                    <p className="text-lg font-light text-maw-gradient">
                      {formatKyat(order.totalPrice)}
                    </p>
                  </div>
                  <p className="text-sm text-muted mb-2">{order.address}</p>
                  <p className="text-xs text-muted mb-3">
                    {order.productName} · {CATEGORY_LABELS[order.category]} ·{" "}
                    {order.colorName} · {order.size} ·{" "}
                    {order.printMethod?.toUpperCase()} · {pos?.label ?? order.printPosition} ·{" "}
                    {psz?.label ?? order.printSize} · Qty {order.quantity}
                  </p>
                  <p className="text-xs text-muted capitalize">
                    Payment: {order.payment?.replace("-", " ")} ·{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="shrink-0">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value as Order["status"]
                      )
                    }
                    className="border border-border bg-surface-elevated px-3 py-2 text-xs uppercase tracking-wider focus:border-maw-magenta focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
