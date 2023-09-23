import axios from "axios";

axios.defaults.withCredentials = true;

const baseUrl = "http://localhost:8000/api/patient";

export const addPatient = async (patientDetail) => {
  try {
    const response = await axios.post(`${baseUrl}/add`, { patientDetail });
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getPatient = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/get?patientId=${id}`);
    return data;
  } catch (error) {
    return error.response;
  }
};
export const getAllPatients = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/getAll`);
    return data;
  } catch (error) {
    return error.response;
  }
};
export const updatePatient = async (patientId, patientDetail) => {
  try {
    const response = await axios.put(
      `${baseUrl}/update?patientId=${patientId}`,
      { patientDetail }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deletePatient = async (patientId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/delete?patientId=${patientId}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
