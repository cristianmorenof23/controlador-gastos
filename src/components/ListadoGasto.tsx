import { useMemo } from "react";
import { usePresupuesto } from "../hooks/usePresupuesto";
import GastosDetalles from "./GastosDetalles";

export default function ListadoGasto() {
  const { state } = usePresupuesto();

  const filtrarGastos = state.categoriaActual
    ? state.gastos.filter((gasto) => gasto.categoria === state.categoriaActual)
    : state.gastos;
  const isEmpty = useMemo(() => filtrarGastos.length === 0, [state.gastos]);
  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {isEmpty ? (
        <p className="text-black-600 text-2xl font-mono">No hay Gastos</p>
      ) : (
        <>
          <p className="text-gray-900 font-mono text-3xl my-5 text-center">
            Listado de Gastos.
          </p>
          {filtrarGastos.map((gasto) => (
            <GastosDetalles key={gasto.id} gasto={gasto} />
          ))}
        </>
      )}
    </div>
  );
}
