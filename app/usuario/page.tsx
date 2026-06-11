"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  User,
  Package,
  MapPin,
  ChevronRight,
  Edit2,
  Plus,
  Star,
  Truck,
  CheckCircle2,
  Clock3,
  Home,
  Briefcase,
} from "lucide-react"
import { mockOrders, mockUser, statusConfig } from "@/lib/orders"
import { formatPrice } from "@/lib/products"

type Section = "perfil" | "pedidos" | "direcciones"

const navItems = [
  { id: "perfil" as Section, label: "Mi Perfil", icon: User },
  { id: "pedidos" as Section, label: "Mis Pedidos", icon: Package },
  { id: "direcciones" as Section, label: "Mis Direcciones", icon: MapPin },
]

const statusIcons = {
  entregado: CheckCircle2,
  "en-camino": Truck,
  "en-preparacion": Clock3,
}

export default function UsuarioPage() {
  const [section, setSection] = useState<Section>("perfil")

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <ChevronRight className="size-3.5" />
            <span className="font-medium text-foreground">Mi cuenta</span>
          </nav>
          <h1 className="mt-1 text-2xl font-black text-foreground">Mi cuenta</h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden w-56 shrink-0 md:block">
            {/* User card */}
            <div className="mb-4 rounded-2xl border border-border bg-white p-4 text-center shadow-sm">
              <div className="relative mx-auto size-16 overflow-hidden rounded-full border-2 border-primary/20">
                <Image
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-2 font-bold text-foreground">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground">{mockUser.email}</p>
            </div>

            {/* Nav */}
            <nav className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id)}
                    className={`flex w-full items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors ${
                      section === item.id
                        ? "bg-secondary text-primary font-semibold border-r-2 border-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                    aria-current={section === item.id ? "page" : undefined}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                    {item.id === "pedidos" && (
                      <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {mockOrders.length}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Mobile tab strip */}
          <div className="mb-4 flex gap-1 md:hidden w-full overflow-x-auto pb-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    section === item.id
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-foreground"
                  }`}
                >
                  <Icon className="size-4" /> {item.label}
                </button>
              )
            })}
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* PERFIL */}
            {section === "perfil" && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-black text-foreground">Información personal</h2>
                    <button className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted">
                      <Edit2 className="size-3.5" /> Editar
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                    <div className="relative size-20 overflow-hidden rounded-2xl border-2 border-primary/20">
                      <Image
                        src={mockUser.avatar}
                        alt={mockUser.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-xl font-black text-foreground">{mockUser.name}</p>
                      <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Nombre completo", value: mockUser.name },
                      { label: "Email", value: mockUser.email },
                      { label: "Teléfono", value: mockUser.phone },
                      { label: "Contraseña", value: "••••••••" },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-xl bg-muted/50 px-4 py-3">
                        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
                        <p className="mt-0.5 font-medium text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Pedidos", value: mockOrders.length, icon: Package },
                    { label: "Entregados", value: mockOrders.filter(o => o.status === "entregado").length, icon: CheckCircle2 },
                    { label: "Favoritos", value: 7, icon: Star },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-2xl border border-border bg-white p-4 text-center shadow-sm">
                      <Icon className="mx-auto size-6 text-primary" />
                      <p className="mt-2 text-2xl font-black text-foreground">{value}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PEDIDOS */}
            {section === "pedidos" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-foreground">Mis pedidos</h2>
                  <span className="text-sm text-muted-foreground">{mockOrders.length} pedidos</span>
                </div>

                {mockOrders.map((order) => {
                  const { label, color, bg } = statusConfig[order.status]
                  const StatusIcon = statusIcons[order.status]

                  return (
                    <div
                      key={order.id}
                      className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
                    >
                      {/* Order header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Número de pedido</p>
                          <p className="font-black text-primary">{order.number}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Fecha</p>
                          <p className="font-semibold text-foreground">
                            {new Date(order.date).toLocaleDateString("es-AR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="font-black text-foreground">{formatPrice(order.total)}</p>
                        </div>
                        <span
                          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${bg} ${color}`}
                        >
                          <StatusIcon className="size-3.5" />
                          {label}
                        </span>
                      </div>

                      {/* Order items */}
                      <div className="px-5 py-4">
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                              <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-muted">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold uppercase text-muted-foreground">
                                  {item.brand}
                                </p>
                                <p className="line-clamp-1 text-sm font-medium text-foreground">
                                  {item.name}
                                </p>
                                <p className="text-xs text-muted-foreground">Cant. {item.qty}</p>
                              </div>
                              <p className="shrink-0 font-bold text-foreground">
                                {formatPrice(item.price * item.qty)}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Tracking */}
                        {order.trackingCode && (
                          <div className="mt-4 rounded-xl bg-muted/50 px-4 py-2.5">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-muted-foreground">Código de seguimiento</p>
                                <p className="font-mono font-bold text-foreground">{order.trackingCode}</p>
                              </div>
                              <button className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white">
                                Rastrear
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* DIRECCIONES */}
            {section === "direcciones" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-foreground">Mis direcciones</h2>
                  <button className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary/90">
                    <Plus className="size-4" /> Agregar
                  </button>
                </div>

                {mockUser.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`relative overflow-hidden rounded-2xl border-2 bg-white p-5 shadow-sm transition-all ${
                      addr.default ? "border-primary" : "border-border"
                    }`}
                  >
                    {addr.default && (
                      <span className="absolute right-3 top-3 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        Principal
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      <div className={`flex size-10 items-center justify-center rounded-xl ${addr.default ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {addr.label === "Casa" ? (
                          <Home className="size-5" />
                        ) : (
                          <Briefcase className="size-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-foreground">{addr.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {addr.street}, {addr.city}, {addr.province} ({addr.zip})
                        </p>
                      </div>
                      <div className="flex gap-1.5">
                        <button className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                          <Edit2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-white py-4 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Plus className="size-5" /> Agregar nueva dirección
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
