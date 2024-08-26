import { categories } from "../data/categoria";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { DraftGasto, Value } from "../interfaces";
import Swal from "sweetalert2";
import { usePresupuesto } from "../hooks/usePresupuesto";
import { Bounce, toast } from "react-toastify";

export default function GastosForm() {
  const [gasto, setGasto] = useState<DraftGasto>({
    cantidad: 0,
    nombreGasto: "",
    categoria: "",
    date: new Date(),
  });

  const [cantidadPrevia, setCantidadPrevia] = useState(0)

  const { dispatch, state, restantePresupuesto } = usePresupuesto();

  useEffect(() => {
    if (state.editarId) {
      const editarGasto = state.gastos.filter(
        (currentGasto) => currentGasto.id === state.editarId
      )[0];
      setGasto(editarGasto);
      setCantidadPrevia(editarGasto.cantidad)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.editarId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isCantidad = name === "cantidad";
    setGasto({
      ...gasto,
      [name]: isCantidad ? +value : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setGasto({
      ...gasto,
      date: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validar
    if (
      gasto.cantidad <= 0 ||
      gasto.nombreGasto.trim() === "" ||
      gasto.categoria.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios y la cantidad debe ser mayor a 0!",
      });
      return;
    }

    // validar que no me pase del limite
    if( (gasto.cantidad - cantidadPrevia) > restantePresupuesto ){
      Swal.fire({
        icon: 'info',
        title: 'Hubo un error!',
        text: 'Ese gasto se sale del presupuesto',
        confirmButtonText: 'Reintentar'
        
      })
    }

    // Agregar un nuevo gasto o actualizar el gasto
    if (state.editarId) {
      dispatch({
        type: "actualizar-gasto",
        payload: { gasto: { id: state.editarId, ...gasto } }
      });
      toast.success('Gasto Actualizado!')
    } else {
      dispatch({ type: "agregar-gasto", payload: { gasto } });
      toast.success("Gasto Cargado Correctamente!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    // Reiniciar el state
    setGasto({
      cantidad: 0,
      nombreGasto: "",
      categoria: "",
      date: new Date(),
    });
    setCantidadPrevia(0)
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center font-mono text-2xl border-b-4 py-2 border-blue-500">
        {state.editarId ? 'Guardar Cambios' : 'Nuevo Gasto'}
      </legend>

      <div className="flex flex-col gap-2">
        <label htmlFor="nombreGasto" className="text-xl font-mono">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="nombreGasto"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent border border-transparent rounded"
          name="nombreGasto"
          value={gasto.nombreGasto} // Enlazar con el estado
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cantidad" className="text-xl font-mono">
          Cantidad:
        </label>
        <input
          type="number"
          id="cantidad"
          placeholder="Añade la cantidad del gasto: ej. 300"
          className="bg-slate-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent border border-transparent rounded"
          name="cantidad"
          value={gasto.cantidad} // Enlazar con el estado
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="categoria" className="text-xl font-mono">
          Categoria:
        </label>
        <select
          id="categoria"
          className="bg-slate-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent border border-transparent rounded"
          name="categoria"
          value={gasto.categoria} // Enlazar con el estado
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((categoria) => (
            <option value={categoria.id} key={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="fechaGasto" className="text-xl font-mono">
          Fecha Gasto:
        </label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={gasto.date} // Enlazar con el estado
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 hover:cursor-pointer hover:bg-blue-800 transition-all w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editarId ? 'Guardar Cambios' : 'Registrar Gasto'}
      />
    </form>
  );
}
