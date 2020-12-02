import { ClinicData } from '../../shared/types';

/** Action Types */
export const GET_CLINIC = 'GET_CLINIC';
export const CREATE_CLINIC = 'CREATE_CLINIC';
export const CLINIC_LOADING = 'CLINIC_LOADING';

/** Action Creators */
interface GetClinicAction {
  type: typeof GET_CLINIC;
  payload: ClinicData[];
}

interface CreateClinicAction {
  type: typeof CREATE_CLINIC;
  payload: ClinicData;
}

export interface LoadingPayload {
  loading: boolean;
  status: number;
}
interface ClinicLoadingAction {
  type: typeof CLINIC_LOADING;
  payload: LoadingPayload;
}

export type ClinicActionTypes =
  | GetClinicAction
  | CreateClinicAction
  | ClinicLoadingAction;

/** Reducer State */
export interface ClinicState {
  data: ClinicData[];
  loading: boolean;
  status: number;
}
