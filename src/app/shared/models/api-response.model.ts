export interface ApiResponse<T> {
  IsSuccess: boolean;
  Result: T;
  TotalPages: number;
  DisplayMessage: string;
  ErrorMessage: string | null;
  RepeatOption: boolean;
  MethodToRepeat: string | null;
}