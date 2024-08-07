import Image from "next/image"
import { SearchIcon } from "lucide-react"
import { Header } from "./_components/Header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import { BarbershopItem } from "./_components/BarbershopItem"
import { Footer } from "./_components/Footer"

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
      <div className="p-5">
        {/* SAUDAÇÕES */}
        <h2 className="text-xl font-semibold">Olá, Higor!</h2>
        <p>Segunda-feira, 05 de agosto.</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Buscar barbearias" />
          <Button>
            <SearchIcon />
          </Button>
        </div>
      </div>

      <div className="pl-5">
        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex items-center gap-3 overflow-x-scroll pb-2">
          <Button className="space-x-2" variant={"secondary"}>
            <Image src="/cabelo.svg" width={16} height={16} alt="Cabelo" />
            <span>Cabelo</span>
          </Button>
          <Button className="space-x-2" variant={"secondary"}>
            <Image src="/barba.svg" width={16} height={16} alt="Barba" />
            <span>Barba</span>
          </Button>
          <Button className="space-x-2" variant={"secondary"}>
            <Image
              src="/acabamento.svg"
              width={16}
              height={16}
              alt="Acabamento"
            />
            <span>Acabamento</span>
          </Button>
          <Button className="space-x-2" variant={"secondary"}>
            <Image
              src="/hidratacao.svg"
              width={16}
              height={16}
              alt="Hidratação"
            />
            <span>Hidratação</span>
          </Button>
          <Button className="space-x-2" variant={"secondary"}>
            <Image
              src="/sobrancelha.svg"
              width={16}
              height={16}
              alt="Sobrancelha"
            />
            <span>Sobrancelha</span>
          </Button>
        </div>
      </div>

      <div className="p-5">
        {/* BANNER */}
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
        <h2 className="mb-3 mt-6 text-xs font-semibold uppercase text-zinc-400">
          Agendamentos
        </h2>

        <Card>
          <CardContent className="flex justify-between px-5 py-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l border-solid pl-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">06</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pl-5">
        {/* RECOMENDADOS */}
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
