export function formatCurrency(cantidad: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(cantidad);
}


export function formatDate(fecha: string) : string{
  const data = new Date(fecha)
  const opciones : Intl.DateTimeFormatOptions = {
    weekday : 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Intl.DateTimeFormat('es-ES', opciones).format(data)
}