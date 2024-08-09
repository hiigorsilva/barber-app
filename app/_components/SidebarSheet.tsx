"use client"

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Link from "next/link"
import { quicksSearchOptions } from "../_constants/search"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

export const SidebarSheet = () => {
  const { data } = useSession()

  const handleLoginWithGoogleClick = async () => {
    await signIn("google")
  }

  const handleLogoutClick = async () => {
    await signOut()
  }

  return (
    <SheetContent className="space-y-6 overflow-y-auto py-8">
      {/* HEADER */}
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* AVATAR */}
      <div className="flex items-center justify-between gap-3 border-b border-solid pb-5">
        {/* LOGADO */}
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={`${data?.user?.image}`}
                alt="Foto de perfil"
                width={48}
                height={48}
              />
            </Avatar>

            <div>
              <p className="font-semibold">{data.user.name}</p>
              <p className="text-sm text-zinc-400">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            {/* DESLOGADO */}
            <h2 className="font-semibold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>

              <DialogContent className="w-[90%] space-y-3 rounded-xl">
                <DialogHeader className="space-y-2">
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google
                  </DialogDescription>
                </DialogHeader>
                <Button
                  variant="outline"
                  className="gap-2 font-semibold"
                  onClick={handleLoginWithGoogleClick}
                >
                  <Image
                    src="/google.svg"
                    alt="Fazer login com o Google"
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {/* INICIO E AGENDAMENTO */}
      <div className="flex flex-col gap-2 border-b border-solid pb-5">
        <SheetClose asChild>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <Button variant="ghost" className="justify-start gap-2">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      {/* LINKS DE SERVIÇOS */}
      <div className="flex flex-col gap-2 border-b border-solid pb-5">
        {quicksSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          className="justify-start gap-2"
          onClick={handleLogoutClick}
        >
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}
