import mongoose from "mongoose";

// Defining Schema
const patientDiagnosticSchema = new mongoose.Schema(
  {
    complaint: { type: String, trim: true },
    illnessHistory: { type: String, trim: true },
    bloodPressure: { type: Number, trim: true },
    respiratoryRate: { type: Number, trim: true },
    pulseRate: { type: Number, trim: true },
    weight: { type: Number, trim: true },
    temperature: { type: String, trim: true },
    date: { type: String, required: true, trim: true },
    physicalExamination: { type: String, trim: true },
    diagnosis: { type: String, trim: true },
    treatment: { type: String, trim: true },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient_detail",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

// Model
const PatientDiagnosticModel = mongoose.model(
  "patient_diagnostic",
  patientDiagnosticSchema
);

export default PatientDiagnosticModel;
