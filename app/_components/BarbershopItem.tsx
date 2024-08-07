import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"

interface BarbershopItemProps {
  barbershop: Barbershop
}

export const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="h-full min-w-44">
      <CardContent className="p-1">
        {/* IMAGEM */}
        <div className="relative h-40 w-full overflow-hidden rounded-md">
          <Image
            className="object-cover"
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
          />

          <Badge
            variant={"secondary"}
            className="absolute left-2 top-2 z-10 space-x-1"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <span className="text-xs font-semibold">4,8</span>
          </Badge>
        </div>

        {/* TEXTO */}
        <div className="flex flex-col justify-between gap-3 px-2 py-3">
          <div className="space-y-1">
            <h3
              className="truncate text-ellipsis font-semibold"
              title={barbershop.name}
            >
              {barbershop.name}
            </h3>
            <p
              className="truncate text-ellipsis text-sm text-zinc-400"
              title={barbershop.address}
            >
              {barbershop.address}
            </p>
          </div>
          <Button variant={"secondary"} className="w-full text-sm">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
