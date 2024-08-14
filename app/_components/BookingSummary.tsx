import { format } from "date-fns"
import { formatCurrencyToBRL } from "../_functions/formatCurrency"
import { Card, CardContent } from "./ui/card"
import { ptBR } from "date-fns/locale"
import { Barbershop, BarbershopService } from "@prisma/client"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  barbershop: Pick<Barbershop, "name">
  selectedDate: Date
}

export const BookingSummary = ({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">{service.name}</h2>
          <p className="text-sm font-semibold">
            D{formatCurrencyToBRL(Number(service.price))}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm text-zinc-400">Data</h2>
          <p className="text-sm text-zinc-400">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm text-zinc-400">Horário</h2>
          <p className="text-sm text-zinc-400">
            {format(selectedDate, "HH:mm")}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm text-zinc-400">Barbearia</h2>
          <p className="text-sm text-zinc-400">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}
