import Image from "next/image"
import { SearchIcon } from "lucide-react"
import { Header } from "./_components/Header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import { db } from "./_lib/prisma"
import { BarbershopItem } from "./_components/BarbershopItem"
import { Footer } from "./_components/Footer"
import { quicksSearchOptions } from "./_constants/search"
import { BookingItem } from "./_components/BookingItem"

const Home = async () => {
  // chamar banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: { name: "desc" },
  })

  return (
    <div>
      {/* HEADER */}
      <Header />

      {/* SAUDAÇÕES */}
      <div className="p-5">
        <h2 className="text-xl font-semibold">Olá, Higor!</h2>
        <p className="mt-1 text-sm">Segunda-feira, 05 de agosto.</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Buscar barbearias" />
          <Button>
            <SearchIcon />
          </Button>
        </div>
      </div>

      {/* BUSCA RÁPIDA */}
      <div className="pl-5">
        <div className="mt-6 flex items-center gap-3 overflow-x-scroll pb-2 pr-5">
          {quicksSearchOptions.map((option) => (
            <Button
              key={option.title}
              className="space-x-2"
              variant={"secondary"}
            >
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              <span>{option.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* BANNER */}
      <div className="p-5">
        <div className="relative mt-6 h-40 w-full overflow-hidden rounded-xl">
          <Image
            src="/banner-01.svg"
            alt="Banner"
            className="object-cover"
            fill
            priority
          />
        </div>

        {/* AGENDAMENTO */}
        <BookingItem />
      </div>

      {/* RECOMENDADOS */}
      <div className="pl-5">
        <h2 className="mb-3 mt-6 text-xs font-semibold uppercase text-zinc-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 pr-5">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* POPULARES */}
        <h2 className="mb-3 mt-6 text-xs font-semibold uppercase text-zinc-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 pr-5">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
