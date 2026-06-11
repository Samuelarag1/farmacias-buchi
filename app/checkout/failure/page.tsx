"use client"

import Link from "next/link"
import { XCircle, RefreshCw, ArrowLeft, Headphones } from "lucide-react"

export default function CheckoutFailurePage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-xl">
          {/* Red header */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 px-8 py-10 text-center text-white">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-white/20 shadow-lg">
              <XCircle className="size-12 text-white" />
            </div>
            <h1 className="mt-4 text-3xl font-black">Pago no procesado</h1>
            <p className="mt-2 text-white/85">
              No pudimos completar la transacción
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
              <p className="font-semibold">¿Por qué puede suceder esto?</p>
              <ul className="mt-2 space-y-1 text-red-600">
                <li>· Fondos insuficientes en la cuenta o tarjeta</li>
                <li>· Datos de pago incorrectos</li>
                <li>· Operación cancelada por el usuario</li>
                <li>· Límite de la tarjeta alcanzado</li>
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                href="/checkout"
                className="btn-primary-gradient flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white"
              >
                <RefreshCw className="size-4" /> Intentar de nuevo
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-border py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <ArrowLeft className="size-4" /> Volver a la tienda
              </Link>
              <button className="flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <Headphones className="size-4" /> Contactar soporte
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Si el problema persiste, contactá a nuestro equipo de atención al cliente.
        </p>
      </div>
    </div>
  )
}
