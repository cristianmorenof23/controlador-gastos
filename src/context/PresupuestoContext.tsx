import { useReducer, createContext, ReactNode, useMemo} from "react";
import {
  presupuestoReducer,
  initialState,
  PresupuestoState,
  PresupuestoAcciones,
} from "../reducers/presupuesto-reducer";

interface PresupuestoContextProps {
  state: PresupuestoState
  dispatch: React.Dispatch<PresupuestoAcciones>
  totalGastos: number
  restantePresupuesto: number
}

interface PresupuestoProviderProps {
  children : ReactNode
}

// creando context
export const PresupuestoContext = createContext<PresupuestoContextProps>(null!)

// provider es de donde vienen los datos, del reducer en este caso
export const PresupuestoProvider = ({children} : PresupuestoProviderProps) => {
  const [state, dispatch] = useReducer(presupuestoReducer, initialState);
  const totalGastos = useMemo(
    () => state.gastos.reduce((total, gasto) => gasto.cantidad + total, 0),
    [state.gastos]
  );

  const restantePresupuesto = state.presupuesto - totalGastos;

  return (
    <PresupuestoContext.Provider
      value={{
        state,
        dispatch,
        totalGastos,
        restantePresupuesto
      }}
    >
        {children}
    </PresupuestoContext.Provider>
  )
};
