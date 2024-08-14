import { getServerSession } from "next-auth"
import { Header } from "../_components/Header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import { BookingItem } from "../_components/BookingItem"
import { NotepadTextIcon } from "lucide-react"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    // TODO: mostrar pop-up de login
    return notFound()
  }
  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
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

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
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

  return (
    <>
      <Header />
      <div className="space-y-6 p-5">
        <h1 className="text-xl font-semibold">Agendamentos</h1>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <div className="flex w-full flex-col items-center justify-center gap-4 py-8">
            <NotepadTextIcon
              size={64}
              strokeWidth={1}
              className="text-zinc-400"
            />
            <p className="text-zinc-400">Você não possui agendamentos.</p>
          </div>
        )}

        {/* CONFIRMADOS */}
        {confirmedBookings.length > 0 && (
          <div className="space-y-2">
            <h2 className="mb-4 mt-8 text-xs font-semibold uppercase text-zinc-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </div>
        )}

        {/* FINALIZADOS */}
        {concludedBookings.length > 0 && (
          <div className="space-y-2">
            <h2 className="mb-4 mt-8 text-xs font-semibold uppercase text-zinc-400">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Bookings
