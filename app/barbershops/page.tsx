import { BarbershopItem } from "../_components/BarbershopItem"
import { Header } from "../_components/Header"
import { Search } from "../_components/Search"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  })

  return (
    <div>
      <Header />
      <div className="px-5">
        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>
        {/* TÍTULO */}
        <h2 className="mb-3 mt-6 text-xs font-semibold uppercase text-zinc-400">
          Resultados para &quot;{searchParams.search}&quot;
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
