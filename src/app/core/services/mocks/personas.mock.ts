import { ApiResponse } from "@/shared/models/api-response.model";
import { Persona } from "@/shared/models/persona.model";

export const PersonasMockResponse: ApiResponse<Persona[]> = {
  IsSuccess: true,
  Result: [
    {
      id: 1,
      dni: "12345678",
      nombres: "Carlos",
      apellidos: "Pérez",
      fechaNacimiento: "1990-05-10",
      nacionalidad: "Peruana"
    },
    {
      id: 2,
      dni: "87654321",
      nombres: "María",
      apellidos: "Gonzales",
      fechaNacimiento: "1985-11-22",
      nacionalidad: "Chilena"
    },
    {
      id: 3,
      dni: "45678912",
      nombres: "Juan",
      apellidos: "Ramírez",
      fechaNacimiento: "1993-02-14",
      nacionalidad: "Argentina"
    },
    {
      id: 4,
      dni: "98765432",
      nombres: "Lucía",
      apellidos: "Torres",
      fechaNacimiento: "2000-01-29",
      nacionalidad: "Peruana"
    }
  ],
  TotalPages: 1,
  DisplayMessage: "",
  ErrorMessage: null,
  RepeatOption: false,
  MethodToRepeat: null
};