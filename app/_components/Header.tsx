import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quicksSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

export const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <Image src={`/logo.svg`} width={120} height={18} alt="Barbearia" />

          <Sheet>
            {/* BOTÃO DE FECHAR */}
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent className="space-y-6 overflow-y-auto">
              {/* HEADER */}
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              {/* AVATAR */}
              <div className="flex items-center gap-3 border-b border-solid pb-5">
                <Avatar>
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
                </div>
              </div>

              {/* INICIO E AGENDAMENTO */}
              <div className="flex flex-col gap-2 border-b border-solid pb-5">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="justify-start gap-2"
                    asChild
                  >
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
              <div className="flex flex-col gap-2 border-b border-solid pb-5">
                <Button variant="ghost" className="justify-start gap-2">
                  <LogOutIcon size={18} />
                  Sair da conta
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}
