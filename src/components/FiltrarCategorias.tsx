import { ChangeEvent } from "react";
import { categories } from "../data/categoria";
import { usePresupuesto } from "../hooks/usePresupuesto";


export default function FiltrarCategorias() {

  const { dispatch } = usePresupuesto()

  const handleChange = (e : ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'agregar-filtro-categoria', payload: {id: e.target.value}})
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="text-center">
          <label htmlFor="categoria" className="font-mono text-lg">Filtrar Gastos</label>
          <select
            id="categoria"
            className="bg-slate-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent border border-transparent rounded text-center w-full"
            onChange={handleChange}
          >
            <option value="">-- Todas las categorias --</option>
            {categories.map(categoria => (
              <option value={categoria.id} key={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
