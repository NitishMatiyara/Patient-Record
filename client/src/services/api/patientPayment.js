import axios from "axios";
axios.defaults.withCredentials = true;

const baseUrl = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/payment`;

export const addPayment = async (patientId, paymentDetail) => {
  try {
    const response = await axios.post(`${baseUrl}/add?patientId=${patientId}`, {
      paymentDetail,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getPayment = async (paymentId) => {
  try {
    const { data } = await axios.get(`${baseUrl}/get?paymentId=${paymentId}`);
    return data;
  } catch (error) {
    return error.response;
  }
};
export const getAllPayments = async (patientId) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/getAll?patientId=${patientId}`
    );
    return data;
  } catch (error) {
    return error.response;
  }
};
export const updatePayment = async (paymentId, paymentDetail) => {
  try {
    const response = await axios.put(
      `${baseUrl}/update?paymentId=${paymentId}`,
      { paymentDetail }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deletePayment = async (paymentId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/delete?paymentId=${paymentId}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
