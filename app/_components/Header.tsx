import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { SidebarSheet } from "./SidebarSheet"

export const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <Image src={`/logo.svg`} width={120} height={18} alt="Barbearia" />

          {/* BOTÃO DE FECHAR */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}
