export interface Persona {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;   // o Date si prefieres convertirlo
  nacionalidad: string;
}