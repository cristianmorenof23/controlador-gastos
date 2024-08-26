import { Bounce, toast } from "react-toastify";
import { usePresupuesto } from "../hooks/usePresupuesto";
import { useMemo, useState } from "react";

const Formulario = () => {
  // validar formulario con state
  const [presupuesto, setPresupuesto] = useState(0);
  const { dispatch } = usePresupuesto();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPresupuesto(e.target.valueAsNumber);
  };

  const isValid = useMemo(() => {
    return isNaN(presupuesto) || presupuesto <= 0;
  }, [presupuesto]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "agregar-presupuesto", payload: { presupuesto } });
    toast("🦄 Presupuesto Agregado!!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="formulario"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          id="formulario"
          type="number"
          className="bg-white w-full border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          placeholder="Define tu Presupuesto"
          name="formulario"
          value={presupuesto}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase rounded-lg disabled:opacity-40 disabled:cursor-auto"
        disabled={isValid}
      />
    </form>
  );
};

export default Formulario;
