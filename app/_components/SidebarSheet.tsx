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

export const SidebarSheet = () => {
  return (
    <SheetContent className="space-y-6 overflow-y-auto py-8">
      {/* HEADER */}
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* AVATAR */}
      <div className="flex items-center justify-between gap-3 border-b border-solid pb-5">
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
            <Button variant="outline" className="gap-2 font-semibold">
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

        {/* <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Foto de perfil"
            width={48}
            height={48}
          />
        </Avatar>

        <div>
          <p className="font-semibold">Higor Silva</p>
          <p className="text-sm text-zinc-400">higorsilva@gmail.com</p>
        </div> */}
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
          <Button
            key={option.title}
            variant="ghost"
            className="justify-start gap-2"
          >
            <Image
              src={option.imageUrl}
              alt={option.title}
              height={18}
              width={18}
            />
            {option.title}
          </Button>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="flex flex-col gap-2">
        <Button variant="ghost" className="justify-start gap-2">
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}
