import { Hero } from "@/components/hero"
import { Benefits } from "@/components/benefits"
import { CategoryStrip } from "@/components/category-strip"
import { ProductSection } from "@/components/product-section"
import Link from "next/link"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <CategoryStrip />

      <ProductSection
        title="Especial 2x1"
        subtitle="Llevá el doble pagando uno — por tiempo limitado"
        filterTag="2x1"
        limit={8}
      />

      {/* Promo banner */}
      <section className="mx-auto max-w-7xl px-4 py-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/catalogo?categoria=Dermocosmética"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-6 text-white transition-transform hover:scale-[1.01]"
          >
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Dermocosmética</p>
              <p className="mt-1 text-2xl font-black leading-tight">
                Brillá a tu manera
              </p>
              <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                Hasta 40% OFF →
              </span>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl opacity-20" aria-hidden="true">
              ✨
            </div>
          </Link>
          <Link
            href="/catalogo?categoria=Bebés"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-6 text-white transition-transform hover:scale-[1.01]"
          >
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Para tus bebés</p>
              <p className="mt-1 text-2xl font-black leading-tight">
                Cuidado desde el día uno
              </p>
              <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                Ver productos →
              </span>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl opacity-20" aria-hidden="true">
              👶
            </div>
          </Link>
        </div>
      </section>

      <ProductSection
        title="Las mejores ofertas"
        subtitle="Descuentos exclusivos por tiempo limitado"
        filterTag="Oferta"
        limit={8}
      />

      <ProductSection
        title="Vitaminas y Suplementos"
        subtitle="Cuidá tu salud desde adentro"
        filterCategory="Vitaminas"
        limit={4}
        viewAllHref="/catalogo?categoria=Vitaminas"
      />

      {/* MercadoPago banner */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#009ee3] to-[#007cc7] p-6 text-white sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <p className="text-xl font-black sm:text-2xl">Hasta 6 cuotas sin interés</p>
              <p className="mt-1 text-sm text-white/80">
                Con tarjeta de crédito o dinero en cuenta de Mercado Pago. Todos los días.
              </p>
            </div>
            <Link
              href="/catalogo"
              className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#009ee3] shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Comprar ahora
            </Link>
          </div>
        </div>
      </section>

      <ProductSection
        title="Recién llegados"
        subtitle="Novedades seleccionadas para vos"
        filterTag="Nuevo"
        limit={4}
      />
    </>
  )
}
