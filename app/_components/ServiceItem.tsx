"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { formatCurrencyToBRL } from "../_functions/formatCurrency"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { TIME_LIST } from "../_constants/timeListForBookings"
import { isPast, isToday, set } from "date-fns"
import { createBookin } from "../_actions/createBooking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_actions/getBookings"
import { Dialog, DialogContent } from "./ui/dialog"
import { SigInDialog } from "./SignInDialog"
import { BookingSummary } from "./BookingSummary"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    // ["09":"00"]
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    if (hasBookingOnCurrentTime) return false
    return true
  })
}

export const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return
    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) return

      await createBookin({
        serviceId: service.id,
        date: selectedDate,
      })
      handleBookingSheetOpenChange()
      toast.success("Reserva criada com sucesso!")
    } catch (err) {
      console.error(err)
      toast.error("Erro ao criar reserva!")
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
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
              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  onClick={handleBookingClick}
                  variant="secondary"
                  size="sm"
                >
                  Reservar
                </Button>

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
                      fromDate={new Date()}
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
                        {timeList.length > 0 &&
                          timeList.map((time) => (
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
                        {timeList.length <= 0 && (
                          <p className="text-xs">
                            Não há horários disponíveis para este dia.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* RESUMO DA RESERVA */}
                  {selectedDate && (
                    <div className="p-5">
                      <BookingSummary
                        barbershop={barbershop}
                        service={service}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}
                  <SheetFooter className="mt-5 px-5">
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar reserva
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%] space-y-3 rounded-xl">
          <SigInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
