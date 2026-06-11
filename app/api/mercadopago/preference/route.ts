import { NextRequest, NextResponse } from "next/server"
import { products } from "@/lib/products"

type CheckoutItem = { id: string; qty: number }
type Buyer = { name?: string; email?: string; phone?: string; address?: string; city?: string }

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    items?: CheckoutItem[]
    buyer?: Buyer
    deliveryMethod?: "shipping" | "pickup"
    shippingCost?: number
  }

  const checkoutItems = Array.isArray(body.items) ? body.items : []
  const preferenceItems = checkoutItems
    .map((item) => {
      const product = products.find((p) => p.id === item.id)
      const quantity = Number.isFinite(item.qty) ? Math.max(1, Math.min(99, Math.trunc(item.qty))) : 1
      if (!product) return null
      return {
        id: product.id,
        title: product.name,
        description: `${product.brand} — ${product.category}`,
        quantity,
        currency_id: "ARS",
        unit_price: product.price,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  if (preferenceItems.length === 0) {
    return NextResponse.json({ error: "El carrito no tiene productos válidos." }, { status: 400 })
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `${request.headers.get("x-forwarded-proto") || "http"}://${request.headers.get("host")}`

  // Demo mode: simulate MercadoPago without a real token
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN
  if (!accessToken || accessToken === "demo") {
    const orderId = `BUC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`
    const total = preferenceItems.reduce((sum, i) => sum + i.unit_price * i.quantity, 0)
    const shippingCost = body.deliveryMethod === "shipping" && body.shippingCost ? body.shippingCost : 0
    return NextResponse.json({
      initPoint: `${origin}/checkout/success?order=${orderId}&total=${total + shippingCost}`,
      mode: "demo",
    })
  }

  // Real MercadoPago integration
  if (body.deliveryMethod === "shipping" && body.shippingCost && body.shippingCost > 0) {
    preferenceItems.push({
      id: "shipping",
      title: "Envío a domicilio",
      description: "Costo de envío — Farmacias Buchi",
      quantity: 1,
      currency_id: "ARS",
      unit_price: body.shippingCost,
    })
  }

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      items: preferenceItems,
      payer: {
        name: body.buyer?.name,
        email: body.buyer?.email,
        phone: { number: body.buyer?.phone },
        address: { street_name: body.buyer?.address },
      },
      back_urls: {
        success: `${origin}/checkout/success`,
        failure: `${origin}/checkout/failure`,
        pending: `${origin}/checkout/pending`,
      },
      auto_return: "approved",
      statement_descriptor: "FARMACIAS BUCHI",
      external_reference: `buchi-${Date.now()}`,
      metadata: {
        delivery_method: body.deliveryMethod || "shipping",
        buyer_city: body.buyer?.city,
      },
    }),
  })

  const preference = (await response.json()) as {
    init_point?: string
    sandbox_init_point?: string
    message?: string
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: preference.message || "Mercado Pago no pudo crear la preferencia." },
      { status: response.status },
    )
  }

  return NextResponse.json({ initPoint: preference.init_point || preference.sandbox_init_point })
}
