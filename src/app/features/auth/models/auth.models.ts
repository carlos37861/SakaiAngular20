export interface LoginRequest {
  Username: string;
  Password: string;
  App: string; // "3"
}

export interface ApiResponse<T> {
  IsSuccess: boolean;
  Result: T;
  TotalPages: number;
  DisplayMessage: string;
  ErrorMessage: string | null;
  RepeatOption: boolean;
  MethodToRepeat: string | null;
}

export interface LoginResult {
  User: UserDto;
  Token: string;
  RefreshToken: string;
}

export interface UserDto {
  V_LOGIN: string;
  V_IDUSER: string;
  V_FIRSTNAME: string;
  V_LASTNAME: string;
  V_FULLNAME: string;
  I_PHOTO: string | null;
  V_CEL: string;
  V_EMAIL: string;
  V_EMAILCONFIRMED: string;
  V_TPUSER: string;
  N_CODSEDE: number;
  N_IDARE: number;
  V_EST: string;
  UserRolesApp: Array<{
    N_APPID: number;
    V_NAME: string;
    V_IDROLE: string;
    V_NAMEROLE: string;
    V_EST: string;
  }>;
}
