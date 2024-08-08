"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

export const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado com sucesso!")
  }

  return (
    <div className="flex items-center justify-between gap-3">
      {/* ESQUERDA */}
      <div className="flex items-center gap-2">
        <SmartphoneIcon size={20} className="text-primary" />
        <span className="text-sm">{phone}</span>
      </div>
      {/* DIREITA */}
      <Button
        onClick={() => handleCopyPhoneClick(phone)}
        variant="outline"
        size="sm"
      >
        Copiar
      </Button>
    </div>
  )
}
