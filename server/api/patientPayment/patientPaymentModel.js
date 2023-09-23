import mongoose from "mongoose";


// Defining Schema
const patientPaymentSchema = new mongoose.Schema({
    date: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, trim: true },
    patientId: {
        type: mongoose.Schema.Types.ObjectId
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: true
})

// Model
const PatientPaymentModel = mongoose.model("patient_payment", patientPaymentSchema)

export default PatientPaymentModel;