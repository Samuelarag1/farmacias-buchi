export type OrderStatus = "entregado" | "en-camino" | "en-preparacion"

export type OrderItem = {
  id: string
  name: string
  brand: string
  price: number
  qty: number
  image: string
}

export type Order = {
  id: string
  number: string
  date: string
  status: OrderStatus
  total: number
  items: OrderItem[]
  address: string
  paymentMethod: string
  deliveryDate?: string
  trackingCode?: string
}

export const mockOrders: Order[] = [
  {
    id: "ord-001",
    number: "BUC-2024-00142",
    date: "2024-06-08",
    status: "entregado",
    total: 38397,
    deliveryDate: "2024-06-10",
    trackingCode: "AR123456789",
    address: "Av. Belgrano 345, San Fernando del Valle de Catamarca",
    paymentMethod: "Mercado Pago",
    items: [
      {
        id: "1",
        name: "Protector Solar FPS 50 Facial Toque Seco 50ml",
        brand: "ISDIN",
        price: 18999,
        qty: 1,
        image: "/products/protector-solar.png",
      },
      {
        id: "4",
        name: "Vitamina C 1000mg Efervescente x30",
        brand: "Redoxon",
        price: 9899,
        qty: 2,
        image: "/products/vitaminas.png",
      },
    ],
  },
  {
    id: "ord-002",
    number: "BUC-2024-00157",
    date: "2024-06-05",
    status: "en-camino",
    total: 55497,
    trackingCode: "AR987654321",
    address: "Calle Rivadavia 892, San Fernando del Valle de Catamarca",
    paymentMethod: "Mercado Pago",
    items: [
      {
        id: "7",
        name: "212 NYC Eau de Parfum Feminino 90ml",
        brand: "Carolina Herrera",
        price: 64999,
        qty: 1,
        image: "/products/perfume.png",
      },
    ],
  },
  {
    id: "ord-003",
    number: "BUC-2024-00163",
    date: "2024-06-10",
    status: "en-preparacion",
    total: 29797,
    address: "Sarmiento 1150, San Fernando del Valle de Catamarca",
    paymentMethod: "Mercado Pago",
    items: [
      {
        id: "5",
        name: "Pañales Ultra Comfort Talle G x52",
        brand: "Pampers",
        price: 23499,
        qty: 1,
        image: "/products/pañales.png",
      },
      {
        id: "19",
        name: "Talco para Bebés Clásico Johnson's 200g",
        brand: "Johnson's Baby",
        price: 4299,
        qty: 1,
        image: "/products/pañales.png",
      },
    ],
  },
]

export const mockUser = {
  name: "María García",
  email: "maria.garcia@email.com",
  phone: "383 4-123456",
  avatar: "/placeholder-user.jpg",
  addresses: [
    {
      id: "addr-1",
      label: "Casa",
      street: "Av. Belgrano 345",
      city: "San Fernando del Valle de Catamarca",
      province: "Catamarca",
      zip: "4700",
      default: true,
    },
    {
      id: "addr-2",
      label: "Trabajo",
      street: "Calle Rivadavia 892",
      city: "San Fernando del Valle de Catamarca",
      province: "Catamarca",
      zip: "4700",
      default: false,
    },
  ],
}

export const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  entregado: {
    label: "Entregado",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
  },
  "en-camino": {
    label: "En camino",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  "en-preparacion": {
    label: "En preparación",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
}
