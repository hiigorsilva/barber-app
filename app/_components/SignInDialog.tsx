import Image from "next/image"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { signIn } from "next-auth/react"

export const SigInDialog = () => {
  const handleLoginWithGoogleClick = async () => {
    await signIn("google")
  }

  return (
    <>
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
    </>
  )
}
