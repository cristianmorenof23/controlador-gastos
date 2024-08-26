export interface Gasto {
  id: string;
  cantidad: number;
  nombreGasto: string;
  categoria: string;
  date: Value;
}

// No necesitas el '=' en la declaración de la interfaz.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DraftGasto extends Omit<Gasto, 'id'> {}

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];


export interface Categoria {
  id: string
  name: string
  icon: string
}