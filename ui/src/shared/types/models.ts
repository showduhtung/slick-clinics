export interface HttpError {
  code: number | null;
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

export interface ClinicData {
  id?: number;
  name: string | null;
  address: string | null;
}

export interface UserData {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

export interface NewBookingPayload {
  time: string;
  date: string;
  clinicId: number;
  userId: number;
}
export interface BookingData {
  id: number;
  clinicId: number | null;
  time: string | null;
  date: number;
  userId: number;
}

export interface LoadingPayload {
  loading: boolean;
  status: HttpError;
}
