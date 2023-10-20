import axios from "axios";

axios.defaults.withCredentials = true;

const baseUrl = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/diagnostic`;

export const addDiagnosis = async (diagnosticData) => {
  try {
    const response = await axios.post(`${baseUrl}/add`, { diagnosticData });
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getDiagnosis = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/get?id=${id}`);
    return data;
  } catch (error) {
    return error.response;
  }
};
export const getAllDiagnosis = async (patientId) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/getAll?patientId=${patientId}`
    );
    return data;
  } catch (error) {
    return error.response;
  }
};
export const updateDiagnosis = async (id, diagnosticData) => {
  try {
    const response = await axios.put(`${baseUrl}/update?id=${id}`, {
      diagnosticData,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteDiagnosis = async (patientId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/delete?patientId=${patientId}`
    );
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};
