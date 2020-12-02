import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getClinics } from '../../apis/clinics';
import { ClinicData } from '../../shared/types';
import { errorDataExtractor } from '../../shared/utilities';
import { ClinicActionTypes, GET_CLINIC } from '../types';

export const getClinic = (data: ClinicData[]): ClinicActionTypes => ({
  type: GET_CLINIC,
  payload: data,
});

export const bootstrapClinics = (): ThunkAction<any, any, any, Action> => async (
  dispatch,
) => {
  try {
    const { data } = await getClinics();
    dispatch(getClinic(data));
  } catch (error) {
    const errorData = errorDataExtractor(error);
    console.error(errorData);
  }
};
