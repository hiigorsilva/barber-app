"use client"

import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { formatCurrencyToBRL } from "../_functions/formatCurrency"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { TIME_LIST } from "../_constants/timeListForBookings"
import { format, set } from "date-fns"
import { createBookin } from "../_actions/createBooking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

export const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return

      // Selecionando a hora e os minutos: ["09":"00"]
      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])

      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })

      await createBookin({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })
      toast.success("Reserva criada com sucesso!")
    } catch (err) {
      console.error(err)
      toast.error("Erro ao criar reserva!")
    }
  }

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
              {formatCurrencyToBRL(Number(service.price))}
            </p>

            {/* BOTÃO DE RESERVAR */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto px-0">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>

                {/* CALENDAR */}
                <div className="border-b border-solid py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>

                {/* HORÁRIOS PARA RESERVA */}
                {selectedDay && (
                  <div className="border-b border-solid py-5 pl-5">
                    <div className="flex gap-2.5 overflow-x-auto pb-2 pr-5">
                      {TIME_LIST.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-full border border-solid"
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* RESUMO DA RESERVA */}
                {selectedTime && selectedDay && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <h2 className="font-semibold">{service.name}</h2>
                          <p className="text-sm font-semibold">
                            {formatCurrencyToBRL(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <h2 className="text-sm text-zinc-400">Data</h2>
                          <p className="text-sm text-zinc-400">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <h2 className="text-sm text-zinc-400">Horário</h2>
                          <p className="text-sm text-zinc-400">
                            {selectedTime}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <h2 className="text-sm text-zinc-400">Barbearia</h2>
                          <p className="text-sm text-zinc-400">
                            {barbershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <SheetFooter className="mt-5 px-5">
                  <SheetClose asChild>
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar reserva
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
