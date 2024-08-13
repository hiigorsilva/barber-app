import Image from "next/image"
import { Header } from "./_components/Header"
import { Button } from "./_components/ui/button"
import { db } from "./_lib/prisma"
import { BarbershopItem } from "./_components/BarbershopItem"
import { quicksSearchOptions } from "./_constants/search"
import { BookingItem } from "./_components/BookingItem"
import { Search } from "./_components/Search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: { name: "desc" },
  })

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <div>
      {/* HEADER */}
      <Header />

      {/* SAUDAÇÕES */}
      <div className="p-5">
        <h2 className="text-xl font-semibold">
          Olá, {session?.user ? session.user.name?.split(" ")[0] : "bem vindo"}!
        </h2>
        <p className="mt-1 text-sm first-letter:capitalize">
          {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}.
        </p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
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
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                <span>{option.title}</span>
              </Link>
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
      </div>

      {/* AGENDAMENTO */}
      {confirmedBookings.length > 0 && (
        <div className="pl-5">
          <h2 className="mb-3 mt-6 text-xs font-semibold uppercase text-zinc-400">
            Agendamentos
          </h2>

          <div className="flex items-center gap-3 overflow-x-auto pr-5">
            {confirmedBookings.map((booking) => (
              <div
                key={booking.id}
                className={`${confirmedBookings.length > 1 ? "min-w-[90%]" : "min-w-full"} pb-2`}
              >
                <BookingItem booking={JSON.parse(JSON.stringify(booking))} />
              </div>
            ))}
          </div>
        </div>
      )}

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
    </div>
  )
}

export default Home
