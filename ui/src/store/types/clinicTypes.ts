import { ClinicData } from '../../shared/types';

/** Action Types */
export const GET_CLINIC = 'GET_CLINIC';

/** Action Creators */
interface GetClinicAction {
  type: typeof GET_CLINIC;
  payload: ClinicData[];
}

export type ClinicActionTypes = GetClinicAction;

/** Reducer State */
export interface ClinicState {
  data: ClinicData[];
}
