import { formatCurrency } from "../helpers";

interface CantidadDisplayProps {
  label?: string;
  cantidad: number;
}

const CantidadDisplay = ({ label, cantidad }: CantidadDisplayProps) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label && `${label}:`}
      <span className="font-black text-black">{formatCurrency(cantidad)}</span>
    </p>
  );
};

export default CantidadDisplay;
