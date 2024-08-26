import { useContext } from "react"
import { PresupuestoContext } from "../context/PresupuestoContext"

export const usePresupuesto = () => {
  const context = useContext(PresupuestoContext)
  if (!context) {
    throw new Error('usePresupuesto must be used withing a PresupuestoProvider')
  }

  return context
}