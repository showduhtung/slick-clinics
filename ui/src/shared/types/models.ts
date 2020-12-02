export interface HttpError {
  status: number;
  message: string;
}

export interface PasswordState extends FormState {
  visible: boolean;
}

export interface EmailState {
  value: string;
  valid: boolean;
  message: string;
}

export interface JWTDataType {
  iss: string;
  sub: string;
  exp: string;
  type: string;
  access: string;
}

export interface FormState {
  value: string;
  valid: boolean;
  message: string;
}
