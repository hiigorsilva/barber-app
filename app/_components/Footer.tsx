import { Card, CardContent } from "./ui/card"

export const Footer = () => {
  return (
    <footer className="mt-8">
      <Card className="px-5 py-6">
        <CardContent className="p-0">
          <span className="text-sm text-zinc-400">
            © 2023 Copyright FSW Barber
          </span>
        </CardContent>
      </Card>
    </footer>
  )
}
