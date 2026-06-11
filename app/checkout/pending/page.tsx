"use client"

import Link from "next/link"
import { Clock3, ArrowLeft, Bell } from "lucide-react"
import { useEffect, useState } from "react"

export default function CheckoutPendingPage() {
  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const order = params.get("order")
    if (order) setOrderId(order)
  }, [])

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-xl">
          {/* Amber header */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 px-8 py-10 text-center text-white">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-white/20 shadow-lg">
              <Clock3 className="size-12 text-white" />
            </div>
            <h1 className="mt-4 text-3xl font-black">Pago pendiente</h1>
            <p className="mt-2 text-white/85">
              Tu pago está siendo procesado
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {orderId && (
              <div className="mb-4 rounded-2xl bg-muted/50 p-4 text-center">
                <p className="text-xs text-muted-foreground">Número de pedido</p>
                <p className="font-black text-primary">{orderId}</p>
              </div>
            )}

            <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-700">
              <p className="font-semibold">¿Qué significa esto?</p>
              <p className="mt-2 leading-relaxed text-amber-600">
                Tu operación fue recibida y está en proceso de validación. Esto puede
                demorar entre 1 y 2 días hábiles. Te notificaremos por email cuando
                se confirme el pago.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                href="/usuario"
                className="btn-primary-gradient flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white"
              >
                <Bell className="size-4" /> Ver estado del pedido
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-border py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <ArrowLeft className="size-4" /> Volver a la tienda
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Recibirás una notificación en tu email cuando el pago sea confirmado.
        </p>
      </div>
    </div>
  )
}
