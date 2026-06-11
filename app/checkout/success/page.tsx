"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { CheckCircle2, Package, Truck, Download, ArrowRight, Clock } from "lucide-react"

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState("BUC-2024-00199")
  const [total, setTotal] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const order = params.get("order")
    const tot = params.get("total")
    if (order) setOrderId(order)
    if (tot) setTotal(new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 }).format(Number(tot)))

    const today = new Date()
    today.setDate(today.getDate() + 2)
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }
    setDeliveryDate(today.toLocaleDateString("es-AR", options))
  }, [])

  const orderDate = new Date().toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Success card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-xl">
          {/* Green header */}
          <div className="bg-gradient-to-br from-emerald-500 to-primary px-8 py-10 text-center text-white">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-white/20 shadow-lg">
              <CheckCircle2 className="size-12 text-white" />
            </div>
            <h1 className="mt-4 text-3xl font-black">¡Pago aprobado!</h1>
            <p className="mt-2 text-white/85">
              Tu pedido fue registrado exitosamente
            </p>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8">
            {/* Order info grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-muted/50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Número de pedido
                </p>
                <p className="mt-1 font-black text-primary">{orderId}</p>
              </div>
              <div className="rounded-2xl bg-muted/50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Fecha
                </p>
                <p className="mt-1 font-semibold text-foreground capitalize">{orderDate}</p>
              </div>
              {total && (
                <div className="rounded-2xl bg-muted/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Total pagado
                  </p>
                  <p className="mt-1 font-black text-foreground">{total}</p>
                </div>
              )}
              <div className="rounded-2xl bg-muted/50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Método de pago
                </p>
                <p className="mt-1 font-semibold text-foreground">Mercado Pago</p>
              </div>
            </div>

            {/* Delivery info */}
            <div className="mt-4 rounded-2xl border-2 border-primary/20 bg-secondary/50 p-4">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-bold text-foreground">Entrega estimada</p>
                  {deliveryDate && (
                    <p className="mt-0.5 text-sm font-semibold text-primary capitalize">
                      {deliveryDate}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    Recibirás un email con el número de seguimiento.
                  </p>
                </div>
              </div>
            </div>

            {/* Status timeline */}
            <div className="mt-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Estado del pedido
              </p>
              {[
                { icon: CheckCircle2, label: "Pago confirmado", done: true, time: "Ahora" },
                { icon: Package, label: "En preparación", done: false, time: "Próximamente" },
                { icon: Truck, label: "En camino", done: false, time: "Mañana" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full ${
                      s.done ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <s.icon className="size-4" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${s.done ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.label}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{s.time}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                href="/"
                className="btn-primary-gradient flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white"
              >
                Seguir comprando <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/usuario"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-border py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Clock className="size-4" /> Ver mis pedidos
              </Link>
              <button className="flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <Download className="size-4" /> Descargar comprobante
              </button>
            </div>
          </div>
        </div>

        {/* Trust badge */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Recibirás la confirmación y seguimiento a tu email · Farmacias Buchi garantiza la autenticidad de todos sus productos
        </p>
      </div>
    </div>
  )
}
