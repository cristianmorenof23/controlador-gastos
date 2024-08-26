import { usePresupuesto } from "../hooks/usePresupuesto";
import CantidadDisplay from "./CantidadDisplay";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
 
const PresupuestoTracker = () => {
  const { state, dispatch, totalGastos, restantePresupuesto } = usePresupuesto();

  const porcentaje = +((totalGastos / state.presupuesto) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={porcentaje}
          styles={buildStyles({
            pathColor:  porcentaje === 100 ?  '#DC2626'  : '#3b82f6',
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: porcentaje === 100 ?  '#DC2626'  : '#3b82f6'
          })}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center gap-8 items-center">
        <button className="bg-pink-500 w-full p-2 text-white uppercase font-bold rounded hover:bg-pink-700" onClick={() => dispatch({type: 'reiniciar-app'})}>
          Resetear APP
        </button>

        <CantidadDisplay label="Presupuesto" cantidad={state.presupuesto} />
        <CantidadDisplay label="Disponible" cantidad={restantePresupuesto} />
        <CantidadDisplay label="Gastado" cantidad={totalGastos} />
      </div>
    </div>
  );
};

export default PresupuestoTracker;
