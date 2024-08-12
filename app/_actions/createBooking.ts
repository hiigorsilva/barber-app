"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface createBookinParams {
  serviceId: string
  date: Date
}

// Recebe o usuário que está agendando, o serviço agendado e a data agendada
export const createBookin = async (params: createBookinParams) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado!")
  }

  await db.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })
  revalidatePath("/barbershops/[id]")
}
