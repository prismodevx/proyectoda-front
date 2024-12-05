export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  fechaLimite: string;

  objCategoria: any | null;
  objEstado: any | null;
}
