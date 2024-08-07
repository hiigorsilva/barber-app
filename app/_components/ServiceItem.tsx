import { BarbershopService } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { FormatCurrencyToBRL } from "../_functions/formatCurrency"

interface ServiceItemProps {
  service: BarbershopService
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* IMAGE */}
        <div className="relative h-fit min-h-28 w-fit min-w-28 overflow-hidden rounded-lg border border-zinc-50/5">
          <Image
            className="object-cover"
            src={service.imageUrl}
            alt={service.name}
            fill
          />
        </div>
        {/* DIREITA */}
        <div className="flex w-full flex-col justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="min-h-10 text-sm text-zinc-400">
              {service.description}
            </p>
          </div>

          {/* PREÇO E BOTÃO */}
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-primary">
              {FormatCurrencyToBRL(Number(service.price))}
            </p>
            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
