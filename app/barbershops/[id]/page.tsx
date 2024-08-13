import { PhoneItem } from "@/app/_components/PhoneItem"
import { ServiceItem } from "@/app/_components/ServiceItem"
import { SidebarSheet } from "@/app/_components/SidebarSheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: { id: string }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  // chamar o banco de dados
  const barbershop = await db.barbershop.findUnique({
    where: { id: params.id },
    include: { services: true },
  })

  if (!barbershop) return notFound()

  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-64 w-full">
        <Image
          className="object-cover"
          src={`${barbershop?.imageUrl}`}
          alt={`${barbershop?.name}`}
          fill
        />

        <Button
          className="absolute left-5 top-5"
          variant="secondary"
          size="icon"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        {/* BOTÃO DE FECHAR */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="absolute right-5 top-5"
              variant="outline"
              size="icon"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      {/* TÍTULO */}
      <div className="space-y-3 border-b border-solid p-5">
        <h1 className="text-xl font-semibold">{barbershop?.name}</h1>

        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <MapPinIcon size={18} className="text-primary" />
            <p className="text-sm">{barbershop?.address}</p>
          </li>
          <li className="flex items-center gap-2">
            <Star size={18} className="fill-primary text-primary" />
            <p className="text-sm">4,8 (726 avaliações)</p>
          </li>
        </ul>
      </div>

      {/* DESCRIÇÃO */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="font-semibold uppercase text-zinc-400">Sobre nós</h2>
        <p className="text-sm text-zinc-400">{barbershop?.description}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="font-semibold uppercase text-zinc-400">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
              service={JSON.parse(JSON.stringify(service))}
            />
          ))}
        </div>
      </div>

      {/* CONTATO */}
      <div className="space-y-3 p-5 pb-0">
        <h2 className="font-semibold uppercase text-zinc-400">Contato</h2>
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
