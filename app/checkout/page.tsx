"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  Minus,
  Package,
  Plus,
  Shield,
  ShoppingCart,
  Trash2,
  Truck,
  User,
} from "lucide-react"
import { useCart } from "@/components/cart-context"
import { formatPrice } from "@/lib/products"

type Step = 1 | 2 | 3 | 4

const STEPS = [
  { num: 1 as Step, label: "Carrito", icon: ShoppingCart },
  { num: 2 as Step, label: "Datos", icon: User },
  { num: 3 as Step, label: "Envío", icon: MapPin },
  { num: 4 as Step, label: "Pago", icon: CreditCard },
]

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:shadow-sm"

const PROVINCES = [
  "CABA",
  "Buenos Aires",
  "Córdoba",
  "Santa Fe",
  "Mendoza",
  "Tucumán",
  "Entre Ríos",
  "Salta",
  "Misiones",
  "Chaco",
  "Corrientes",
  "Santiago del Estero",
  "San Juan",
  "Jujuy",
  "Río Negro",
  "Neuquén",
  "Formosa",
  "Chubut",
  "San Luis",
  "Catamarca",
  "La Rioja",
  "La Pampa",
  "Santa Cruz",
  "Tierra del Fuego",
]

export default function CheckoutPage() {
  const { items, count, total, setItemQty, removeItem, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    province: "CABA",
    zip: "",
  })
  const [deliveryMethod, setDeliveryMethod] = useState<"shipping" | "pickup">("shipping")
  const [isPaying, setIsPaying] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"idle" | "connecting" | "processing" | "validating">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const shippingCost = deliveryMethod === "shipping" && total < 15000 ? 1800 : 0
  const grandTotal = total + shippingCost

  function validate(currentStep: Step): boolean {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1 && items.length === 0) {
      newErrors.cart = "Agregá al menos un producto al carrito"
    }
    if (currentStep === 2) {
      if (!buyer.name.trim()) newErrors.name = "El nombre es obligatorio"
      if (!buyer.email.trim() || !buyer.email.includes("@")) newErrors.email = "Email inválido"
      if (!buyer.phone.trim()) newErrors.phone = "El teléfono es obligatorio"
    }
    if (currentStep === 3 && deliveryMethod === "shipping") {
      if (!address.street.trim()) newErrors.street = "La dirección es obligatoria"
      if (!address.city.trim()) newErrors.city = "La ciudad es obligatoria"
      if (!address.zip.trim()) newErrors.zip = "El código postal es obligatorio"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function next() {
    if (validate(step)) setStep((s) => (s < 4 ? ((s + 1) as Step) : s))
  }

  function prev() {
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s))
  }

  async function handlePay() {
    setIsPaying(true)
    setPaymentStep("connecting")

    await delay(1000)
    setPaymentStep("processing")
    await delay(1200)
    setPaymentStep("validating")
    await delay(900)

    const orderId = `BUC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`
    clearCart()
    router.push(`/checkout/success?order=${orderId}&total=${grandTotal}`)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-border bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2" aria-label="Farmacias Buchi inicio">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <svg viewBox="0 0 24 24" fill="none" className="size-5 text-white" aria-hidden="true">
                <rect x="9" y="3" width="6" height="18" fill="currentColor" rx="1.5" />
                <rect x="3" y="9" width="18" height="6" fill="currentColor" rx="1.5" />
              </svg>
            </div>
            <span className="font-bold text-primary">Farmacias Buchi</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="size-4 text-primary" />
            Compra segura
          </div>
        </div>
      </div>

      {/* Step indicators */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <ol className="flex items-center justify-center gap-0" aria-label="Pasos del checkout">
            {STEPS.map((s, i) => {
              const isActive = step === s.num
              const isCompleted = step > s.num
              const Icon = s.icon
              return (
                <li key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`flex size-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                        isCompleted
                          ? "bg-primary text-white"
                          : isActive
                          ? "bg-primary text-white shadow-md shadow-primary/30"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <Check className="size-4" /> : <Icon className="size-4" />}
                    </div>
                    <span
                      className={`hidden text-xs font-semibold sm:block ${
                        isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 w-10 rounded-full transition-all sm:w-16 ${
                        step > s.num ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Step content */}
          <div className="lg:col-span-2">
            {/* STEP 1: Carrito */}
            {step === 1 && (
              <div className="rounded-2xl border border-border bg-white p-6">
                <h2 className="mb-5 text-lg font-black text-foreground">
                  Mi carrito{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    ({count} producto{count !== 1 ? "s" : ""})
                  </span>
                </h2>

                {items.length === 0 ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <ShoppingCart className="size-16 text-muted" />
                    <p className="mt-3 font-semibold text-foreground">El carrito está vacío</p>
                    <Link
                      href="/catalogo"
                      className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white"
                    >
                      Ver catálogo
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 rounded-xl border border-border p-3"
                      >
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-secondary/50">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase text-muted-foreground">
                            {item.brand}
                          </p>
                          <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
                            {item.name}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-border">
                              <button
                                className="flex size-7 items-center justify-center rounded-l-full hover:bg-muted"
                                onClick={() =>
                                  item.qty === 1 ? removeItem(item.id) : setItemQty(item.id, item.qty - 1)
                                }
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                              <button
                                className="flex size-7 items-center justify-center rounded-r-full hover:bg-muted"
                                onClick={() => setItemQty(item.id, item.qty + 1)}
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <p className="font-bold text-foreground">
                                {formatPrice(item.price * item.qty)}
                              </p>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {errors.cart && (
                  <p className="mt-3 rounded-xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
                    {errors.cart}
                  </p>
                )}
              </div>
            )}

            {/* STEP 2: Datos personales */}
            {step === 2 && (
              <div className="rounded-2xl border border-border bg-white p-6">
                <h2 className="mb-5 text-lg font-black text-foreground">Datos personales</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-semibold text-foreground" htmlFor="name">
                      Nombre y apellido *
                    </label>
                    <input
                      id="name"
                      className={inputClass}
                      placeholder="ej. María García"
                      value={buyer.name}
                      onChange={(e) => setBuyer((b) => ({ ...b, name: e.target.value }))}
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground" htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={inputClass}
                      placeholder="tu@email.com"
                      value={buyer.email}
                      onChange={(e) => setBuyer((b) => ({ ...b, email: e.target.value }))}
                    />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground" htmlFor="phone">
                      Teléfono *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={inputClass}
                      placeholder="11 2345-6789"
                      value={buyer.phone}
                      onChange={(e) => setBuyer((b) => ({ ...b, phone: e.target.value }))}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Envío */}
            {step === 3 && (
              <div className="rounded-2xl border border-border bg-white p-6">
                <h2 className="mb-5 text-lg font-black text-foreground">Método de entrega</h2>

                <div className="mb-5 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      value: "shipping" as const,
                      label: "Envío a domicilio",
                      desc: shippingCost === 0 ? "¡Gratis!" : `+${formatPrice(shippingCost)}`,
                      icon: Truck,
                    },
                    {
                      value: "pickup" as const,
                      label: "Retiro en sucursal",
                      desc: "Sin cargo · +300 sucursales",
                      icon: Package,
                    },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setDeliveryMethod(opt.value)}
                      className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                        deliveryMethod === opt.value
                          ? "border-primary bg-secondary/50"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <opt.icon
                        className={`mt-0.5 size-5 shrink-0 ${deliveryMethod === opt.value ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div>
                        <p className="font-bold text-foreground">{opt.label}</p>
                        <p className={`text-sm ${deliveryMethod === opt.value && opt.desc.includes("Gratis") ? "font-semibold text-emerald-600" : "text-muted-foreground"}`}>
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {deliveryMethod === "shipping" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs font-semibold text-foreground">
                        Calle y número *
                      </label>
                      <input
                        className={inputClass}
                        placeholder="Av. Corrientes 1234"
                        value={address.street}
                        onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                      />
                      {errors.street && <p className="mt-1 text-xs text-destructive">{errors.street}</p>}
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-foreground">
                        Piso / Depto (opcional)
                      </label>
                      <input
                        className={inputClass}
                        placeholder="3° A"
                        value={address.apartment}
                        onChange={(e) => setAddress((a) => ({ ...a, apartment: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-foreground">
                        Ciudad *
                      </label>
                      <input
                        className={inputClass}
                        placeholder="Buenos Aires"
                        value={address.city}
                        onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                      />
                      {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-foreground">
                        Provincia
                      </label>
                      <select
                        className={inputClass}
                        value={address.province}
                        onChange={(e) => setAddress((a) => ({ ...a, province: e.target.value }))}
                      >
                        {PROVINCES.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-foreground">
                        Código postal *
                      </label>
                      <input
                        className={inputClass}
                        placeholder="1043"
                        value={address.zip}
                        onChange={(e) => setAddress((a) => ({ ...a, zip: e.target.value }))}
                      />
                      {errors.zip && <p className="mt-1 text-xs text-destructive">{errors.zip}</p>}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: Pago */}
            {step === 4 && (
              <div className="rounded-2xl border border-border bg-white p-6">
                <h2 className="mb-5 text-lg font-black text-foreground">Método de pago</h2>

                <div className="rounded-2xl border-2 border-[#009ee3] bg-[#f0f9ff] p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#009ee3] text-white font-black text-lg">
                      MP
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Mercado Pago</p>
                      <p className="text-xs text-muted-foreground">
                        Tarjetas, dinero en cuenta, QR y más
                      </p>
                    </div>
                    <div className="ml-auto flex size-6 items-center justify-center rounded-full bg-[#009ee3]">
                      <Check className="size-4 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Visa", "Mastercard", "Amex", "Naranja", "Cabal", "Débito"].map((m) => (
                      <span key={m} className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
                        {m}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs font-semibold text-[#009ee3]">
                    ✓ Hasta 6 cuotas sin interés · Pago 100% seguro
                  </p>
                </div>

                {/* Order summary for step 4 */}
                <div className="mt-4 space-y-2 rounded-xl bg-muted/40 p-4 text-sm">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-foreground">
                      <span className="line-clamp-1 max-w-50">
                        {item.name} x{item.qty}
                      </span>
                      <span className="font-semibold">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Envío</span>
                    <span className={shippingCost === 0 ? "text-emerald-600 font-semibold" : ""}>
                      {shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-black text-foreground">
                    <span>Total a pagar</span>
                    <span className="text-primary">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-4 flex gap-3">
              {step > 1 && (
                <button
                  onClick={prev}
                  className="flex items-center gap-2 rounded-full border-2 border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  disabled={isPaying}
                >
                  <ChevronLeft className="size-4" /> Volver
                </button>
              )}
              {step < 4 ? (
                <button
                  onClick={next}
                  disabled={step === 1 && items.length === 0}
                  className="btn-primary-gradient flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continuar <ChevronRight className="size-4" />
                </button>
              ) : (
                <button
                  onClick={handlePay}
                  disabled={isPaying}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#009ee3] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#009ee3]/30 transition-all hover:bg-[#0088cc] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPaying ? (
                    <>
                      <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {paymentStep === "connecting"
                        ? "Conectando con Mercado Pago..."
                        : paymentStep === "processing"
                        ? "Procesando pago..."
                        : "Validando..."}
                    </>
                  ) : (
                    <>
                      <CreditCard className="size-4" />
                      Pagar {formatPrice(grandTotal)} con Mercado Pago
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-bold text-foreground">Resumen del pedido</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-2.5">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">Cant. {item.qty}</p>
                    </div>
                    <p className="shrink-0 text-xs font-bold text-foreground">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Envío</span>
                  <span className={shippingCost === 0 ? "font-semibold text-emerald-600" : ""}>
                    {shippingCost === 0 ? "¡Gratis!" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 font-black text-foreground">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                {[
                  { icon: Shield, text: "Compra 100% protegida" },
                  { icon: Truck, text: "Envío rápido a todo el país" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="size-3.5 text-primary" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
