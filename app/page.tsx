import { SearchIcon } from "lucide-react"
import { Header } from "./_components/Header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

const Home = () => {
  return (
    <div>
      {/* Header */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-semibold">Olá, Higor!</h2>
        <p>Segunda-feira, 05 de agosto.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Buscar barbearias" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-40 w-full overflow-hidden rounded-xl">
          <Image
            src="/banner-01.svg"
            alt="Banner"
            className="object-cover"
            fill
          />
        </div>
      </div>
    </div>
  )
}

export default Home
