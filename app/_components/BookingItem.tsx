import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import { formatCurrencyToBRL } from "../_functions/formatCurrency"
import { PhoneItem } from "./PhoneItem"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}
export const BookingItem = ({ booking }: BookingItemProps) => {
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)

  return (
    <>
      <Sheet>
        <SheetTrigger className="w-full">
          <Card>
            <CardContent className="flex justify-between px-5 py-0">
              {/* ESQUERDA */}
              <div className="flex flex-col gap-2 py-5">
                <Badge
                  className="w-fit"
                  variant={isConfirmed ? "default" : "secondary"}
                >
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
                <h3 className="font-semibold">{booking.service.name}</h3>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={booking.service.barbershop.imageUrl} />
                  </Avatar>
                  <p className="text-sm">{booking.service.barbershop.name}</p>
                </div>
              </div>

              {/* DIREITA */}
              <div className="flex flex-col items-center justify-center border-l border-solid pl-5">
                <p className="text-sm capitalize">
                  {format(booking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, "dd", { locale: ptBR })}
                </p>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>

        <SheetContent className="w-[85%]">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da Reserva
            </SheetTitle>
          </SheetHeader>

          <div className="relative mt-6 flex h-44 w-full items-end overflow-hidden rounded-lg">
            <Image
              className="object-cover"
              src="/map.jpg"
              alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
              fill
            />

            <Card className="z-50 mx-5 my-3 w-full">
              <CardContent className="flex w-full items-center gap-3 px-5 py-3">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-semibold">{barbershop.name}</h3>
                  <p className="truncate text-xs text-zinc-400">
                    {barbershop.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TAG DE CONFIRMADO */}
          <div className="mt-6">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>

            {/* RESUMO DA RESERVA */}
            <Card className="mb-6 mt-3">
              <CardContent className="space-y-3 p-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold">{booking.service.name}</h2>
                  <p className="text-sm font-semibold">
                    {formatCurrencyToBRL(Number(booking.service.price))}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm text-zinc-400">Data</h2>
                  <p className="text-sm text-zinc-400">
                    {format(booking.date, "d 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm text-zinc-400">Horário</h2>
                  <p className="text-sm text-zinc-400">
                    {format(booking.date, "HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm text-zinc-400">Barbearia</h2>
                  <p className="text-sm text-zinc-400">{barbershop.name}</p>
                </div>
              </CardContent>
            </Card>

            {/* PHONES */}
            <div className="space-y-3">
              {barbershop.phones.map((phone, index) => (
                <PhoneItem key={index} phone={phone} />
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
