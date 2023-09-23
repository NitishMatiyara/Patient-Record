import mongoose from "mongoose";


// Defining Schema
const patientDetailSchema = new mongoose.Schema({
    case_no: { type: Number, required: true, },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    middlename: { type: String, trim: true },
    age: { type: Number, trim: true },
    city: { type: String, trim: true },
    birthdate: { type: String, trim: true },
    address: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    gender: { type: String, enum: ['Male', 'Female'], default: 'Female' },
    civilstatus: { type: String, enum: ['Married', 'Single'], default: 'Single' },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    }
}, {
    timestamps: true
})

// Model
const PatientDetailModel = mongoose.model("patient_detail", patientDetailSchema)

export default PatientDetailModel;