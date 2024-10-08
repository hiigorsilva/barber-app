import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { Footer } from "./_components/Footer"
import { AuthProvider } from "./_providers/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Barber App",
  description: "Reserva de barbearia",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-full w-full flex-1 flex-col">
            {children}
          </div>
          <Footer />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
