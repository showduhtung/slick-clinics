import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { postClinic, getClinics } from '../../apis/clinics';
import { ClinicData } from '../../shared/types';
import { errorDataExtractor } from '../../shared/utilities';
import {
  ClinicActionTypes,
  CLINIC_LOADING,
  CREATE_CLINIC,
  GET_CLINIC,
  LoadingPayload,
} from '../types';

export const getClinic = (data: ClinicData[]): ClinicActionTypes => ({
  type: GET_CLINIC,
  payload: data,
});

export const createClinic = (payload: ClinicData): ClinicActionTypes => ({
  type: CREATE_CLINIC,
  payload,
});

export const loadingClinic = (payload: LoadingPayload): ClinicActionTypes => ({
  type: CLINIC_LOADING,
  payload,
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

export const createNewClinic = (
  newClinicData: ClinicData,
): ThunkAction<any, any, any, Action> => async (dispatch) => {
  try {
    loadingClinic({ loading: true, status: 0 });
    const { data, status } = await postClinic(newClinicData);
    if (status === 409) loadingClinic({ loading: false, status });
    if (data) dispatch(createClinic(data));
  } catch (error) {
    const errorData = errorDataExtractor(error);
    console.error(errorData);
  }
};
