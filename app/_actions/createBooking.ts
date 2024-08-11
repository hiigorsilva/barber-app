"use server"

import { db } from "../_lib/prisma"

interface createBookinParams {
  userId: string
  serviceId: string
  date: Date
}

// Recebe o usuário que está agendando, o serviço agendado e a data agendada
export const createBookin = async (params: createBookinParams) => {
  await db.booking.create({
    data: params,
  })
}
