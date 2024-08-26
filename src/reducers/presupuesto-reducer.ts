import { Categoria, DraftGasto, Gasto } from "../interfaces"
import { v4 as uuidv4 } from 'uuid'

export type PresupuestoAcciones =
  { type: 'agregar-presupuesto', payload: { presupuesto: number } } |
  { type: 'abrir-modal' } |
  { type: 'cerrar-modal' } |
  { type: 'agregar-gasto', payload: { gasto: DraftGasto } } |
  {type: 'eliminar-gasto', payload: {id: Gasto['id']}} |
  {type: 'obtener-gasto-id', payload: {id: Gasto['id']}} |
  { type: 'actualizar-gasto', payload: {gasto : Gasto}} |
  { type: 'reiniciar-app'} |
  {type: 'agregar-filtro-categoria', payload: {id: Categoria['id']}}

export interface PresupuestoState {
  presupuesto: number
  modal: boolean
  gastos: Gasto[]
  editarId : Gasto['id']
  categoriaActual : Categoria['id']
}

const initialGasto = () : number => {
  const localStorageGasto = localStorage.getItem('presupuesto')
  return localStorageGasto ? +localStorageGasto : 0
}

const crearGasto = (drafGasto: DraftGasto): Gasto => {
  return {
    ...drafGasto,
    id: uuidv4()
  }
}

const localStorageGastos = () : Gasto[] => {
  const localStorageGastos = localStorage.getItem('gastos')
  return localStorageGastos ? JSON.parse(localStorageGastos) : []
}

export const initialState: PresupuestoState = {
  presupuesto: initialGasto(),
  modal: false,
  gastos: localStorageGastos(),
  editarId: '',
  categoriaActual: ''
}


export const presupuestoReducer = (state: PresupuestoState = initialState, action: PresupuestoAcciones) => {

  if (action.type === 'agregar-presupuesto')
    return {
      ...state,
      presupuesto: action.payload.presupuesto
    }

  if (action.type === 'abrir-modal')
    return {
      ...state,
      modal: true
    }
  if (action.type === 'cerrar-modal')
    return {
      ...state,
      modal: false,
      editarId: ''
    }

  if (action.type === 'agregar-gasto') {

    const gasto = crearGasto(action.payload.gasto)

    return {
      ...state,
      gastos: [...state.gastos, gasto],
      modal: false
    }
  }

  if(action.type === 'eliminar-gasto'){
    return {
      ...state,
      gastos: state.gastos.filter(gasto => gasto.id !== action.payload.id)
    }
  }

  if(action.type === 'obtener-gasto-id'){

    return {
      ...state,
      editarId: action.payload.id,
      modal: true
    }
  }

  if(action.type === 'actualizar-gasto'){
    return {
      ...state,
      gastos: state.gastos.map(gasto => gasto.id === action.payload.gasto.id ? action.payload.gasto : gasto),
      modal: false,
      editarId: ''
    }
  }

  if(action.type === 'reiniciar-app'){
    return {
      ...state,
      presupuesto: 0,
      gastos: [],
    }
  }

  if(action.type === 'agregar-filtro-categoria'){
    return {
      ...state,
      categoriaActual: action.payload.id
    }
  }
  

  return state
}