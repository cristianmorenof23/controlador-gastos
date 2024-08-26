import { useMemo, useEffect} from "react";
import Formulario from "./components/Formulario";
import { usePresupuesto } from "./hooks/usePresupuesto";
import PresupuestoTracker from "./components/PresupuestoTracker";
import FormularioModal from "./components/FormularioModal";
import ListadoGasto from "./components/ListadoGasto";
import FiltrarCategorias from "./components/FiltrarCategorias";

function App() {
  const { state } = usePresupuesto();

  const isValidPresupuesto = useMemo(
    () => state.presupuesto > 0,
    [state.presupuesto]
  );

  useEffect(() => {
    localStorage.setItem('presupuesto', state.presupuesto.toString())
    localStorage.setItem('gastos', JSON.stringify(state.gastos))
  }, [state])

  return (
    <>
      <header className="w-full text-gray-900 p-5">
        <h1 className="uppercase text-center text-4xl font-black">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidPresupuesto ? <PresupuestoTracker /> : <Formulario />}
      </div>

      {isValidPresupuesto && (
        <main className="max-w-3xl mx-auto py-10">
          <FiltrarCategorias/>
          <ListadoGasto/>
          <FormularioModal />
        </main>
      )}
    </>
  );
}

export default App;
