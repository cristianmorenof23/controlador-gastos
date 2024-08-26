import { Gasto } from "../interfaces";
import { formatDate } from "../helpers";
import CantidadDisplay from "./CantidadDisplay";
import { useMemo } from "react";
import { categories } from "../data/categoria";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { usePresupuesto } from "../hooks/usePresupuesto";

interface GastoProps {
  gasto: Gasto;
}

export default function GastosDetalles({ gasto }: GastoProps) {
  const categoriaInfo = useMemo(
    () => categories.filter((cat) => cat.id === gasto.categoria)[0],
    [gasto]
  );

  const {dispatch} = usePresupuesto()

  const leadingActiones = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => dispatch({type : 'obtener-gasto-id', payload: {id: gasto.id}})}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActiones = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({type: 'eliminar-gasto', payload: {id: gasto.id}})}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActiones()}
        trailingActions={trailingActiones()}
      >
        <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              src={`/icono_${categoriaInfo.icon}.svg`}
              alt="iconos degastos"
              className="w-20"
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-black uppercase text-slate-500">
              {categoriaInfo.name}
            </p>
            <p className="font-mono first-letter:uppercase text-lg">
              {gasto.nombreGasto}
            </p>
            <p className="text-slate-600 text-sm">
              {formatDate(gasto.date!.toString())}
            </p>
          </div>

          <CantidadDisplay cantidad={gasto.cantidad} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
