import { deletePatient, updatePatient } from "../services/api/patientDetail";
import { deletePayment, updatePayment } from "../services/api/patientPayment";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import {
  deleteDiagnosis,
  updateDiagnosis,
} from "../services/api/patientDiagnostic";

export const deleteRecord = async (id, collection) => {
  let confirm_delete, response;
  confirm_delete = window.confirm("Are you sure to delete this record ?");
  if (confirm_delete == true) {
    try {
      switch (collection) {
        case "patient":
          response = await deletePatient(id);
          break;
        case "payment":
          response = await deletePayment(id);
          break;
        case "diagnosis":
          response = await deleteDiagnosis(id);
          break;
        default:
          break;
      }
      if (response.status == 201) {
        toast.success(response.data.message, { theme: "dark" });
      } else if (response.status == 440) {
        toast.warning(response.data.message);
        setTimeout(() => {
          <Navigate to={"/home"} />;
        }, 5000);
      } else {
        toast.error(
          response.data.error ? response.data.error : response.data.message
        );
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
};

export const updateRecord = async (id, data, collection, setMessage) => {
  console.log(id, data);
  let response;
  try {
    switch (collection) {
      case "patient":
        response = await updatePatient(id, data);
        break;
      case "payment":
        response = await updatePayment(id, data);
        break;
      case "diagnosis":
        response = await updateDiagnosis(id, data);
        break;
      default:
        break;
    }
    if (response.status == 201) {
      setMessage({ error: false, msg: response.data.message });
    } else if (response.status == 440) {
      setMessage({ error: true, msg: response.data.message });
      setTimeout(() => {
        <Navigate to={"/home"} />;
      }, 5000);
    } else {
      setMessage({
        error: true,
        msg: response.data.error ? response.data.error : response.data.message,
      });
    }
  } catch (err) {
    setMessage({ error: true, msg: err.message });
  }
};

export const getRecord = () => {};

export const getAllRecords = () => {};

export const addRecord = () => {};
